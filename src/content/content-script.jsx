import React from 'react';
import { createRoot } from 'react-dom/client';
import NoteInput from './NoteInput';
import { HighlightManager } from './HighlightManager';
import { MessageTypes } from '../utils/messaging';
import { createDomLocator } from '../utils/domLocator';
import { getNotesByUrl, onStorageChange } from '../utils/storage';

const highlightManager = new HighlightManager();
let shadowRoot = null;
let root = null;

const shadowStyles = `
  @import url('https://cdn.jsdelivr.net/npm/tailwindcss@3.3.6/dist/tailwind.min.css');
  
  * {
    box-sizing: border-box;
  }
  
  @keyframes slideUp {
    from {
      transform: translateY(10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  .animate-slide-up {
    animation: slideUp 0.3s ease-out;
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .active\\:scale-95:active {
    transform: scale(0.95);
  }
  
  .w-80 { width: 20rem; }
  .bg-white\\/95 { background-color: rgba(255, 255, 255, 0.95); }
  .backdrop-blur-md { backdrop-filter: blur(12px); }
  .rounded-2xl { border-radius: 1rem; }
  .shadow-2xl { box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
  .border { border-width: 1px; }
  .border-gray-200\\/50 { border-color: rgba(229, 231, 235, 0.5); }
  .overflow-hidden { overflow: hidden; }
  .font-sans { font-family: ui-sans-serif, system-ui, sans-serif; }
  .text-gray-800 { color: rgb(31, 41, 55); }
  
  .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
  .from-green-500 { --tw-gradient-from: rgb(34, 197, 94); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(34, 197, 94, 0)); }
  .to-emerald-600 { --tw-gradient-to: rgb(5, 150, 105); }
  
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
  .p-4 { padding: 1rem; }
  .p-3 { padding: 0.75rem; }
  .p-1 { padding: 0.25rem; }
  
  .flex { display: flex; }
  .items-center { align-items: center; }
  .justify-between { justify-content: space-between; }
  .justify-end { justify-content: flex-end; }
  .gap-2 { gap: 0.5rem; }
  
  .h-5 { height: 1.25rem; }
  .w-5 { width: 1.25rem; }
  .h-4 { height: 1rem; }
  .w-4 { width: 1rem; }
  
  .text-white { color: rgb(255, 255, 255); }
  .text-white\\/80 { color: rgba(255, 255, 255, 0.8); }
  .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
  .text-xs { font-size: 0.75rem; line-height: 1rem; }
  .font-bold { font-weight: 700; }
  .font-medium { font-weight: 500; }
  .tracking-wide { letter-spacing: 0.025em; }
  
  .mb-3 { margin-bottom: 0.75rem; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mt-3 { margin-top: 0.75rem; }
  
  .bg-yellow-50 { background-color: rgb(254, 252, 232); }
  .border-l-4 { border-left-width: 4px; }
  .border-yellow-400 { border-color: rgb(250, 204, 21); }
  .rounded-r-lg { border-top-right-radius: 0.5rem; border-bottom-right-radius: 0.5rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .rounded-xl { border-radius: 0.75rem; }
  .rounded-full { border-radius: 9999px; }
  
  .text-yellow-800 { color: rgb(133, 77, 14); }
  .text-gray-700 { color: rgb(55, 65, 81); }
  .text-gray-400 { color: rgb(156, 163, 175); }
  
  .italic { font-style: italic; }
  
  .w-full { width: 100%; }
  .h-32 { height: 8rem; }
  
  .border-2 { border-width: 2px; }
  .border-gray-200 { border-color: rgb(229, 231, 235); }
  
  .outline-none { outline: 2px solid transparent; outline-offset: 2px; }
  .resize-none { resize: none; }
  
  .transition-colors { transition-property: color, background-color, border-color; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
  
  .bg-gray-100 { background-color: rgb(243, 244, 246); }
  .px-4 { padding-left: 1rem; padding-right: 1rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  
  .hover\\:text-white:hover { color: rgb(255, 255, 255); }
  .hover\\:bg-white\\/20:hover { background-color: rgba(255, 255, 255, 0.2); }
  .hover\\:bg-gray-200:hover { background-color: rgb(229, 231, 235); }
  .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
  .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
  .hover\\:from-green-600:hover { --tw-gradient-from: rgb(22, 163, 74); }
  .hover\\:to-emerald-700:hover { --tw-gradient-to: rgb(4, 120, 87); }
  
  .focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.5); }
  .focus\\:ring-green-500:focus { --tw-ring-color: rgb(34, 197, 94); }
  .focus\\:border-green-500:focus { border-color: rgb(34, 197, 94); }
  
  .disabled\\:opacity-50:disabled { opacity: 0.5; }
  .disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }
  .disabled\\:hover\\:shadow-none:disabled:hover { box-shadow: none; }
  
  .placeholder-gray-400::placeholder { color: rgb(156, 163, 175); }
  
  .opacity-25 { opacity: 0.25; }
  .opacity-75 { opacity: 0.75; }
`;

function getOrCreateShadowContainer() {
  let container = document.getElementById('savenotes-root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'savenotes-root';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483647;
    `;
    document.body.appendChild(container);

    shadowRoot = container.attachShadow({ mode: 'open' });

    const styleElement = document.createElement('style');
    styleElement.textContent = shadowStyles;
    shadowRoot.appendChild(styleElement);
  }
  return container;
}

function showNoteInput(position, selectedText, domLocator) {
  getOrCreateShadowContainer();

  if (!root) {
    const rootContainer = document.createElement('div');
    rootContainer.style.cssText = 'pointer-events: auto;';
    shadowRoot.appendChild(rootContainer);
    root = createRoot(rootContainer);
  }

  root.render(
    <NoteInput
      position={position}
      selectedText={selectedText}
      domLocator={domLocator}
      onClose={() => {
        root.render(null);
      }}
      onSave={(note) => {
        highlightManager.createHighlight(note);
        root.render(null);
      }}
    />
  );
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === MessageTypes.ADD_NOTE) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const domLocator = createDomLocator(range);

      const position = {
        x: rect.left,
        y: rect.bottom
      };

      showNoteInput(position, message.payload.selectionText, domLocator);
    }
  } else if (message.type === 'NOTE_DELETED') {
    highlightManager.removeHighlight(message.payload.id);
  }
});

async function loadNotes() {
  const notes = await getNotesByUrl(window.location.href);
  notes.forEach(note => {
    highlightManager.createHighlight(note);
  });
}

onStorageChange((newNotes) => {
  highlightManager.clearAll();

  const currentUrl = window.location.href;
  const pageNotes = newNotes.filter(n => n.url === currentUrl || n.url === currentUrl.split('#')[0]);

  pageNotes.forEach(note => {
    highlightManager.createHighlight(note);
  });
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    highlightManager.injectStyles();
    loadNotes();
  });
} else {
  highlightManager.injectStyles();
  loadNotes();
}

const observer = new MutationObserver((mutations) => {
  if (!document.getElementById('contextmemo-styles')) {
    highlightManager.injectStyles();
  }
});

if (document.head) {
  observer.observe(document.head, { childList: true });
}
