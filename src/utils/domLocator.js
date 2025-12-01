export function createDomLocator(range) {
    const startContainer = range.startContainer;
    const endContainer = range.endContainer;

    return {
        xpath: getXPath(startContainer),
        cssSelector: getCssSelector(startContainer),
        textContent: range.toString(),
        textOffset: {
            start: range.startOffset,
            end: range.endOffset,
            containerText: startContainer.textContent
        },
        context: {
            before: getContextText(startContainer, 'before', 50),
            after: getContextText(endContainer, 'after', 50)
        },
        timestamp: Date.now()
    };
}

export function findByDomLocator(locator) {
    let range = findByXPath(locator);
    if (range) return range;

    range = findByCssSelector(locator);
    if (range) return range;

    range = findByFuzzyText(locator);
    if (range) return range;

    range = findByTextSearch(locator);
    if (range) return range;

    return null;
}

function getXPath(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode;
    }

    if (node.id) {
        return `//*[@id="${node.id}"]`;
    }

    const parts = [];
    while (node && node.nodeType === Node.ELEMENT_NODE) {
        let index = 0;
        let sibling = node.previousSibling;

        while (sibling) {
            if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === node.nodeName) {
                index++;
            }
            sibling = sibling.previousSibling;
        }

        const tagName = node.nodeName.toLowerCase();
        const pathIndex = index > 0 ? `[${index + 1}]` : '';
        parts.unshift(`${tagName}${pathIndex}`);

        node = node.parentNode;
    }

    return parts.length ? '/' + parts.join('/') : '';
}

function getCssSelector(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        node = node.parentNode;
    }

    if (node.id) {
        return `#${node.id}`;
    }

    const parts = [];
    while (node && node.nodeType === Node.ELEMENT_NODE) {
        let selector = node.nodeName.toLowerCase();

        if (node.className && typeof node.className === 'string') {
            const classes = node.className.trim().split(/\s+/).filter(c => c && !c.startsWith('contextmemo'));
            if (classes.length > 0) {
                selector += '.' + classes.slice(0, 2).join('.');
            }
        }

        parts.unshift(selector);

        if (node.id || parts.length > 5) break;
        node = node.parentNode;
    }

    return parts.join(' > ');
}

function getContextText(node, direction, length) {
    let text = '';
    let currentNode = node;

    if (direction === 'before') {
        while (currentNode && text.length < length) {
            if (currentNode.previousSibling) {
                currentNode = currentNode.previousSibling;
                text = (currentNode.textContent || '').slice(-length) + text;
            } else {
                currentNode = currentNode.parentNode;
            }
        }
    } else {
        while (currentNode && text.length < length) {
            if (currentNode.nextSibling) {
                currentNode = currentNode.nextSibling;
                text += (currentNode.textContent || '').slice(0, length);
            } else {
                currentNode = currentNode.parentNode;
            }
        }
    }

    return text.slice(0, length);
}

function findByXPath(locator) {
    try {
        const result = document.evaluate(
            locator.xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );

        const node = result.singleNodeValue;
        if (!node) return null;

        return findTextInNode(node, locator.textContent);
    } catch (error) {
        return null;
    }
}

function findByCssSelector(locator) {
    try {
        const element = document.querySelector(locator.cssSelector);
        if (!element) return null;

        return findTextInNode(element, locator.textContent);
    } catch (error) {
        return null;
    }
}

function findByFuzzyText(locator) {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    while (node = walker.nextNode()) {
        const text = node.textContent;

        if (locator.context.before && text.includes(locator.context.before)) {
            const range = findTextInNode(node.parentNode, locator.textContent);
            if (range) return range;
        }
    }

    return null;
}

function findByTextSearch(locator) {
    const searchText = locator.textContent;
    if (!searchText) return null;

    const normalizedSearchText = searchText.replace(/\s+/g, ' ').trim();

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode: function (node) {
                if (node.parentNode.nodeName === 'SCRIPT' ||
                    node.parentNode.nodeName === 'STYLE' ||
                    node.parentNode.nodeName === 'NOSCRIPT') {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        },
        false
    );

    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        textNodes.push(node);
    }

    let fullText = '';
    const nodeMap = [];

    for (const textNode of textNodes) {
        const content = textNode.textContent;
        for (let i = 0; i < content.length; i++) {
            nodeMap.push({ node: textNode, offset: i });
        }
        fullText += content;
    }

    let matchIndex = fullText.indexOf(searchText);

    if (matchIndex === -1) {
        if (searchText.length > 100) {
            const startSnippet = searchText.substring(0, 50);
            const endSnippet = searchText.substring(searchText.length - 50);

            const startIndex = fullText.indexOf(startSnippet);
            if (startIndex !== -1) {
                const remainingText = fullText.substring(startIndex);
                const endIndexRel = remainingText.indexOf(endSnippet);
                if (endIndexRel !== -1) {
                    matchIndex = startIndex;
                    const endIndex = startIndex + endIndexRel + endSnippet.length;

                    try {
                        const startPos = nodeMap[matchIndex];
                        const endPos = nodeMap[endIndex - 1];

                        if (startPos && endPos) {
                            const range = document.createRange();
                            range.setStart(startPos.node, startPos.offset);
                            range.setEnd(endPos.node, endPos.offset + 1);
                            return range;
                        }
                    } catch (e) {
                        // Ignore
                    }
                }
            }
        }
    }

    if (matchIndex !== -1) {
        try {
            const startPos = nodeMap[matchIndex];
            const endPos = nodeMap[matchIndex + searchText.length - 1];

            if (startPos && endPos) {
                const range = document.createRange();
                range.setStart(startPos.node, startPos.offset);
                range.setEnd(endPos.node, endPos.offset + 1);
                return range;
            }
        } catch (e) {
            // Ignore
        }
    }

    return null;
}

function findTextInNode(node, text) {
    const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let textNode;
    while (textNode = walker.nextNode()) {
        const content = textNode.textContent;
        const index = content.indexOf(text);

        if (index !== -1) {
            const range = document.createRange();
            range.setStart(textNode, index);
            range.setEnd(textNode, index + text.length);
            return range;
        }
    }

    return null;
}

export function calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
        for (let j = 1; j <= str1.length; j++) {
            if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[str2.length][str1.length];
}
