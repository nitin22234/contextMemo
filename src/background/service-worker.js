import { MessageTypes } from '../utils/messaging';

// Create context menu on installation
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'add-context-memo',
        title: 'Add ContextMemo',
        contexts: ['selection']
    });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'add-context-memo' && tab.id) {
        chrome.tabs.sendMessage(tab.id, {
            type: MessageTypes.ADD_NOTE,
            payload: {
                selectionText: info.selectionText
            }
        }).catch(err => {
            console.error('Could not send message to content script:', err);
        });
    }
});

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Handle any background tasks if needed
    return true;
});
