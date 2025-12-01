# ContextMemo - Persistent Web Annotator 📝

ContextMemo is a powerful Chrome Extension that lets you highlight text on any webpage, attach persistent notes, and manage them via an elegant dashboard. It's built with React, Vite, and TailwindCSS, focusing on performance, privacy, and a seamless user experience.

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38bdf8?logo=tailwindcss)

## ✨ Key Features

- **🎯 Context Menu Integration**: Simply right-click any selected text to add a note.
- **🎨 Visual Highlights**: Text is highlighted with a persistent yellow background and a green indicator.
- **💾 Auto-Save & Restore**: Notes are saved locally and automatically reappear when you revisit a page.
- **📖 View Full Note**: A beautiful modal lets you view long notes without truncation.
- **📊 Dashboard**: A central hub to manage, search, and delete your notes.
- **🔍 Smart Search**: Instantly find notes by content or URL.
- **🔄 Real-Time Sync**: Changes sync instantly across all open tabs.

---

## 🚀 Installation Guide

Follow these steps to install ContextMemo in Chrome Developer Mode:

1.  **Clone or Download**:
    Clone this repository or download the ZIP file and extract it.

2.  **Install Dependencies**:
    Open your terminal in the project folder and run:
    ```bash
    npm install
    ```

3.  **Build the Extension**:
    Run the build command to generate the `dist` folder:
    ```bash
    npm run build
    ```

4.  **Load in Chrome**:
    -   Open Google Chrome and go to `chrome://extensions/`.
    -   Toggle **"Developer mode"** in the top right corner.
    -   Click the **"Load unpacked"** button.
    -   Select the `dist` folder from your project directory.

5.  **Enable File URL Access (Optional)**:
    -   If you want to test on local HTML files (like the included `demo.html`), you must enable this permission.
    -   On the extension card, click **"Details"**.
    -   Toggle **"Allow access to file URLs"**.

---

## 🏗️ Technical Architecture

### 1. DOM Selection & Anchoring Strategy

One of the biggest challenges in web annotation is ensuring highlights persist even when the webpage changes slightly. ContextMemo uses a robust **Hybrid Anchoring Strategy** to solve this.

When you create a note, we generate a "DOM Locator" that captures multiple ways to find that text again:

*   **XPath**: We store the exact path to the element (e.g., `/html/body/div[1]/p[2]`). This is fast and precise for static pages.
*   **CSS Selector**: We generate a unique CSS selector (e.g., `#content > .article > p:nth-child(2)`). This is more resilient to minor DOM structure changes.
*   **Text Context**: We store the selected text along with the text immediately *before* and *after* it.
*   **Global Text Search**: As a fail-safe, if the exact position is lost (e.g., due to dynamic content injection), we search the entire document for the unique text sequence to re-anchor the highlight.

**How it works at runtime:**
1.  The extension tries to find the text using the **XPath**.
2.  If that fails, it tries the **CSS Selector**.
3.  If that fails, it uses **Fuzzy Matching** with the surrounding context.
4.  Finally, it falls back to a **Global Text Search** to locate the text anywhere on the page.

This ensures your notes stick to the right text, even on dynamic websites.

### 2. Data Structure & Storage

ContextMemo prioritizes privacy by storing all data locally in your browser using `chrome.storage.local`. No data is ever sent to external servers.

**Data Schema:**

We store notes in a single JSON array under the key `contextmemo_notes`. Each note object is structured as follows:

```javascript
{
  "contextmemo_notes": [
    {
      "id": "1701234567890-abc123xyz",      // Unique ID (Timestamp + Random)
      "url": "https://example.com/article", // Page URL where note was created
      "content": "This is my important note", // The user's note text
      "selectedText": "The text I highlighted", // The text from the webpage
      "domLocator": {                       // The anchoring data
        "xpath": "/html/body/div[1]/p",
        "cssSelector": "#content > p",
        "textContent": "The text I highlighted",
        "context": {
          "before": "Text appearing before...",
          "after": "...text appearing after"
        }
      },
      "createdAt": 1701234567890,           // Creation timestamp
      "updatedAt": 1701234567890            // Last update timestamp
    }
  ]
}
```


## 🛠️ Tech Stack

-   **Frontend**: React 18
-   **Build Tool**: Vite 5
-   **Styling**: TailwindCSS 3
-   **Extension Framework**: Manifest V3

---

**ContextMemo** - Your personal annotation layer for the web. 🌐
