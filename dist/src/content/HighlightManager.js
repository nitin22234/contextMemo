import { findByDomLocator } from '../utils/domLocator';

export class HighlightManager {
    constructor() {
        this.highlights = new Map();
        this.injectStyles();
    }

    injectStyles() {
        const existingStyle = document.getElementById('contextmemo-styles');
        if (existingStyle) {
            existingStyle.remove();
        }

        const styleElement = document.createElement('style');
        styleElement.id = 'contextmemo-styles';
        styleElement.textContent = `
            .contextmemo-highlight {
                background-color: #fef08a !important;
                border-bottom: 2px solid #facc15 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                position: relative !important;
                display: inline !important;
                z-index: 10 !important;
            }
            
            .contextmemo-highlight:hover {
                background-color: #fde047 !important;
                border-bottom-color: #eab308 !important;
            }
            
            .contextmemo-highlight::after {
                content: attr(data-note-content);
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(-8px);
                background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
                color: white;
                padding: 12px 16px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 500;
                white-space: pre-wrap;
                max-width: 300px;
                min-width: 200px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 2147483647 !important;
                pointer-events: none;
                line-height: 1.5;
                text-align: left;
            }
            
            .contextmemo-highlight:hover::after {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(-4px);
            }
            
            .contextmemo-highlight::before {
                content: '';
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%) translateY(0px);
                border: 8px solid transparent;
                border-top-color: #16a34a;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 2147483647 !important;
                pointer-events: none;
            }
            
            .contextmemo-highlight:hover::before {
                opacity: 1;
                visibility: visible;
                transform: translateX(-50%) translateY(4px);
            }
            
            .contextmemo-indicator {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                width: 20px !important;
                height: 20px !important;
                margin-left: 4px !important;
                font-size: 12px !important;
                background-color: #22c55e !important;
                border-radius: 50% !important;
                cursor: pointer !important;
                transition: background-color 0.2s ease !important;
                vertical-align: middle !important;
                z-index: 11 !important;
            }
            
            .contextmemo-indicator:hover {
                background-color: #16a34a !important;
            }
        `;

        const target = document.head || document.body || document.documentElement;
        if (target) {
            target.appendChild(styleElement);
        }
    }

    createHighlight(note) {
        if (this.highlights.has(note.id)) {
            return true;
        }

        const range = findByDomLocator(note.domLocator);
        if (!range) {
            return false;
        }

        try {
            const highlightSpan = document.createElement('span');
            highlightSpan.className = 'contextmemo-highlight';
            highlightSpan.dataset.noteId = note.id;
            highlightSpan.dataset.noteContent = note.content;
            highlightSpan.title = note.content;

            range.surroundContents(highlightSpan);

            const indicator = document.createElement('span');
            indicator.className = 'contextmemo-indicator';
            indicator.textContent = '📝';
            indicator.title = 'Click to view note';
            highlightSpan.appendChild(indicator);

            this.highlights.set(note.id, [highlightSpan]);
            return true;
        } catch (error) {
            try {
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'contextmemo-highlight';
                highlightSpan.dataset.noteId = note.id;
                highlightSpan.dataset.noteContent = note.content;
                highlightSpan.title = note.content;

                const contents = range.extractContents();
                highlightSpan.appendChild(contents);
                range.insertNode(highlightSpan);

                const indicator = document.createElement('span');
                indicator.className = 'contextmemo-indicator';
                indicator.textContent = '📝';
                indicator.title = 'Click to view note';
                highlightSpan.appendChild(indicator);

                this.highlights.set(note.id, [highlightSpan]);
                return true;
            } catch (fallbackError) {
                console.error('Highlight creation failed:', fallbackError);
                return false;
            }
        }
    }

    removeHighlight(noteId) {
        const elements = this.highlights.get(noteId);
        if (!elements) return;

        elements.forEach(el => {
            const parent = el.parentNode;
            if (parent) {
                while (el.firstChild) {
                    parent.insertBefore(el.firstChild, el);
                }
                parent.removeChild(el);
            }
        });

        this.highlights.delete(noteId);
    }

    clearAll() {
        for (const noteId of this.highlights.keys()) {
            this.removeHighlight(noteId);
        }
    }
}
