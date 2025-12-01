export const MessageTypes = {
    ADD_NOTE: 'ADD_NOTE',
    NOTE_SAVED: 'NOTE_SAVED',
    NOTE_DELETED: 'NOTE_DELETED',
    HIGHLIGHT_TEXT: 'HIGHLIGHT_TEXT',
    REMOVE_HIGHLIGHT: 'REMOVE_HIGHLIGHT'
};

export async function sendToActiveTab(type, payload = {}) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) return null;

        return await chrome.tabs.sendMessage(tab.id, { type, payload });
    } catch (error) {
        console.error('Error sending message to active tab:', error);
        return null;
    }
}

export async function sendToBackground(type, payload = {}) {
    try {
        return await chrome.runtime.sendMessage({ type, payload });
    } catch (error) {
        console.error('Error sending message to background:', error);
        return null;
    }
}
