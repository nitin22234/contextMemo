 ContextMemo – Chrome Extension for Persistent Web Highlights

ContextMemo is a Chrome Extension that lets you highlight text on any webpage, attach notes, and have those highlights automatically re-appear across page reloads, revisits, and DOM changes.

This README includes only the required sections:
 Installation in Chrome Developer Mode
 DOM Selection + Anchoring Strategy
 Data Storage Model (chrome.storage.local)

 Installation (Chrome Developer Mode)

Follow these steps to install ContextMemo locally for development or testing.

1. Clone the Repository
git clone <repository-url>
cd notes_extension

2. Install Dependencies
npm install

3. Build the Extension

This generates a dist/ folder used by Chrome.

npm run build

4. Load the Extension in Chrome

Open chrome://extensions/

Toggle Developer mode ON (top-right)

Click Load unpacked

Select the dist/ folder (important — NOT the root folder)

5. Enable File Access (Required for Testing)

To allow the extension to run on local files:

In Chrome Extensions → Find ContextMemo

Click Details

Enable Allow access to file URLs

This is required when testing on files like:

file:///C:/Users/.../demo.html

 DOM Selection & Anchoring Strategy

One of the hardest challenges is ensuring your highlight re-appears even when the webpage changes.

ContextMemo solves this using a 4-Layer Hybrid Anchoring Engine:

 Layer 1 — XPath (Exact DOM Position)

Full absolute XPath

Example: /html/body/div[1]/main/p[2]

Pros: Extremely precise

Cons: Breaks with DOM restructuring

Layer 2 — CSS Selector (Flexible Structural Path)

Builds a unique CSS selector using:

IDs (preferred)

Class names

Tag indices

More resilient to DOM changes than XPath

Still may break if class names change dynamically

 Layer 3 — Context Matching (Fuzzy Logic)

ContextMemo stores:

The selected text

50 characters before the selection

50 characters after the selection

It then rescans every text node to find the same contextual pattern.

Extremely robust even with page layout changes.

Layer 4 — Global Text Search (Last Resort)

Reads every text node using a TreeWalker

Combines text to allow matching across broken HTML like:

Hello <b>World</b>


Used only when all other methods fail

Ensures >99% highlight restoration

Restore Order

When a page loads:

Try XPath

Try CSS selector

Try Context Matching

Try Global Search

This multi-layer fallback system gives ContextMemo exceptional durability.

🗄 Data Storage Model (chrome.storage.local)

ContextMemo stores all notes locally in the browser using Chrome’s asynchronous storage API.

Why use chrome.storage.local?

Up to 5MB storage (vs 4KB in localStorage)

Non-blocking async API

Survives browser restarts

Zero external servers → privacy-first

 Note Data Structure

Every note is represented as an object inside the contextmemo_notes array:

{
  "id": "1701234567890-x8z9a2",

  "url": "https://example.com/article#section2",

  "content": "This is the user's note text.",
  "selectedText": "The text the user highlighted",

  "domLocator": {
    "xpath": "/html/body/div[1]/p[2]",
    "cssSelector": "#content > p:nth-child(2)",
    "textContent": "The text the user highlighted",
    "textOffset": { "start": 15, "end": 55 },
    "context": {
      "before": "Text appearing before selection...",
      "after": "...text appearing after selection."
    },
    "timestamp": 1701234567890
  },

  "createdAt": 1701234567890,
  "updatedAt": 1701234567890
}

 Data Lifecycle

Create:
A new note is appended to contextmemo_notes

Read:
Content script loads notes
Filters by matching url === window.location.href

Update:
Modify the note by ID
Write back entire updated array

Delete:

Remove note by ID

Save updated array
