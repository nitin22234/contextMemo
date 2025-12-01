import{r as x,j as i,s as S,o as T,c as j,g as k}from"./storage-DUrBQEha.js";import{M as R}from"./messaging-axfToGIK.js";const z=({position:t,selectedText:e,domLocator:r,onClose:n,onSave:o})=>{const[a,s]=x.useState(""),[m,l]=x.useState(!1),c=x.useRef(null);x.useEffect(()=>{c.current&&c.current.focus()},[]);const d=async()=>{if(a.trim()){l(!0);try{const h={url:window.location.href,content:a,selectedText:e,domLocator:r},p=await S(h);o(p),n()}catch(h){console.error("Failed to save note:",h)}finally{l(!1)}}},N=h=>{h.key==="Enter"&&!h.shiftKey?(h.preventDefault(),d()):h.key==="Escape"&&n()},f={position:"fixed",left:`${Math.min(t.x,window.innerWidth-340)}px`,top:`${Math.min(t.y+10,window.innerHeight-350)}px`,zIndex:2147483647};return i.jsxs("div",{style:f,className:"w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden font-sans text-gray-800 animate-slide-up",children:[i.jsxs("div",{className:"bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 flex justify-between items-center",children:[i.jsxs("div",{className:"flex items-center gap-2",children:[i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-white",viewBox:"0 0 20 20",fill:"currentColor",children:i.jsx("path",{d:"M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"})}),i.jsx("span",{className:"text-sm font-bold text-white tracking-wide",children:"Add Note"})]}),i.jsx("button",{onClick:n,className:"text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full",children:i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:i.jsx("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})})]}),i.jsxs("div",{className:"p-4",children:[i.jsxs("div",{className:"mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg",children:[i.jsx("p",{className:"text-xs font-medium text-yellow-800 mb-1",children:"Selected Text:"}),i.jsxs("p",{className:"text-xs text-gray-700 italic line-clamp-3",children:['"',e,'"']})]}),i.jsx("textarea",{ref:c,value:a,onChange:h=>s(h.target.value),onKeyDown:N,placeholder:"Type your note here... (Press Enter to save, Esc to cancel)",className:"w-full h-32 p-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none transition-all placeholder-gray-400"}),i.jsxs("div",{className:"flex justify-end gap-2 mt-3",children:[i.jsx("button",{onClick:n,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all hover:shadow-md active:scale-95",children:"Cancel"}),i.jsx("button",{onClick:d,disabled:!a.trim()||m,className:"px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-95 flex items-center gap-2",children:m?i.jsxs(i.Fragment,{children:[i.jsxs("svg",{className:"animate-spin h-4 w-4",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[i.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),i.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Saving..."]}):i.jsxs(i.Fragment,{children:[i.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4",viewBox:"0 0 20 20",fill:"currentColor",children:i.jsx("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"})}),"Save Note"]})})]})]})]})};function L(t){const e=t.startContainer,r=t.endContainer;return{xpath:I(e),cssSelector:D(e),textContent:t.toString(),textOffset:{start:t.startOffset,end:t.endOffset,containerText:e.textContent},context:{before:C(e,"before",50),after:C(r,"after",50)},timestamp:Date.now()}}function O(t){let e=M(t);return e||(e=B(t),e)||(e=_(t),e)||(e=H(t),e)?e:null}function I(t){if(t.nodeType===Node.TEXT_NODE&&(t=t.parentNode),t.id)return`//*[@id="${t.id}"]`;const e=[];for(;t&&t.nodeType===Node.ELEMENT_NODE;){let r=0,n=t.previousSibling;for(;n;)n.nodeType===Node.ELEMENT_NODE&&n.nodeName===t.nodeName&&r++,n=n.previousSibling;const o=t.nodeName.toLowerCase(),a=r>0?`[${r+1}]`:"";e.unshift(`${o}${a}`),t=t.parentNode}return e.length?"/"+e.join("/"):""}function D(t){if(t.nodeType===Node.TEXT_NODE&&(t=t.parentNode),t.id)return`#${t.id}`;const e=[];for(;t&&t.nodeType===Node.ELEMENT_NODE;){let r=t.nodeName.toLowerCase();if(t.className&&typeof t.className=="string"){const n=t.className.trim().split(/\s+/).filter(o=>o&&!o.startsWith("contextmemo"));n.length>0&&(r+="."+n.slice(0,2).join("."))}if(e.unshift(r),t.id||e.length>5)break;t=t.parentNode}return e.join(" > ")}function C(t,e,r){let n="",o=t;if(e==="before")for(;o&&n.length<r;)o.previousSibling?(o=o.previousSibling,n=(o.textContent||"").slice(-r)+n):o=o.parentNode;else for(;o&&n.length<r;)o.nextSibling?(o=o.nextSibling,n+=(o.textContent||"").slice(0,r)):o=o.parentNode;return n.slice(0,r)}function M(t){try{const r=document.evaluate(t.xpath,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;return r?v(r,t.textContent):null}catch{return null}}function B(t){try{const e=document.querySelector(t.cssSelector);return e?v(e,t.textContent):null}catch{return null}}function _(t){const e=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,!1);let r;for(;r=e.nextNode();){const n=r.textContent;if(t.context.before&&n.includes(t.context.before)){const o=v(r.parentNode,t.textContent);if(o)return o}}return null}function H(t){const e=t.textContent;if(!e)return null;e.replace(/\s+/g," ").trim();const r=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode:function(l){return l.parentNode.nodeName==="SCRIPT"||l.parentNode.nodeName==="STYLE"||l.parentNode.nodeName==="NOSCRIPT"?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}},!1),n=[];let o;for(;o=r.nextNode();)n.push(o);let a="";const s=[];for(const l of n){const c=l.textContent;for(let d=0;d<c.length;d++)s.push({node:l,offset:d});a+=c}let m=a.indexOf(e);if(m===-1&&e.length>100){const l=e.substring(0,50),c=e.substring(e.length-50),d=a.indexOf(l);if(d!==-1){const f=a.substring(d).indexOf(c);if(f!==-1){m=d;const h=d+f+c.length;try{const p=s[m],b=s[h-1];if(p&&b){const w=document.createRange();return w.setStart(p.node,p.offset),w.setEnd(b.node,b.offset+1),w}}catch{}}}}if(m!==-1)try{const l=s[m],c=s[m+e.length-1];if(l&&c){const d=document.createRange();return d.setStart(l.node,l.offset),d.setEnd(c.node,c.offset+1),d}}catch{}return null}function v(t,e){const r=document.createTreeWalker(t,NodeFilter.SHOW_TEXT,null,!1);let n;for(;n=r.nextNode();){const a=n.textContent.indexOf(e);if(a!==-1){const s=document.createRange();return s.setStart(n,a),s.setEnd(n,a+e.length),s}}return null}class F{constructor(){this.highlights=new Map,this.injectStyles()}injectStyles(){const e=document.getElementById("contextmemo-styles");e&&e.remove();const r=document.createElement("style");r.id="contextmemo-styles",r.textContent=`
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
        `;const n=document.head||document.body||document.documentElement;n&&n.appendChild(r)}createHighlight(e){if(this.highlights.has(e.id))return!0;const r=O(e.domLocator);if(!r)return!1;try{const n=document.createElement("span");n.className="contextmemo-highlight",n.dataset.noteId=e.id,n.dataset.noteContent=e.content,n.title=e.content,r.surroundContents(n);const o=document.createElement("span");return o.className="contextmemo-indicator",o.textContent="📝",o.title="Click to view note",n.appendChild(o),this.highlights.set(e.id,[n]),!0}catch{try{const o=document.createElement("span");o.className="contextmemo-highlight",o.dataset.noteId=e.id,o.dataset.noteContent=e.content,o.title=e.content;const a=r.extractContents();o.appendChild(a),r.insertNode(o);const s=document.createElement("span");return s.className="contextmemo-indicator",s.textContent="📝",s.title="Click to view note",o.appendChild(s),this.highlights.set(e.id,[o]),!0}catch(o){return console.error("Highlight creation failed:",o),!1}}}removeHighlight(e){const r=this.highlights.get(e);r&&(r.forEach(n=>{const o=n.parentNode;if(o){for(;n.firstChild;)o.insertBefore(n.firstChild,n);o.removeChild(n)}}),this.highlights.delete(e))}clearAll(){for(const e of this.highlights.keys())this.removeHighlight(e)}}const g=new F;let y=null,u=null;const P=`
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
`;function X(){let t=document.getElementById("savenotes-root");if(!t){t=document.createElement("div"),t.id="savenotes-root",t.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2147483647;
    `,document.body.appendChild(t),y=t.attachShadow({mode:"open"});const e=document.createElement("style");e.textContent=P,y.appendChild(e)}return t}function W(t,e,r){if(X(),!u){const n=document.createElement("div");n.style.cssText="pointer-events: auto;",y.appendChild(n),u=j(n)}u.render(i.jsx(z,{position:t,selectedText:e,domLocator:r,onClose:()=>{u.render(null)},onSave:n=>{g.createHighlight(n),u.render(null)}}))}chrome.runtime.onMessage.addListener((t,e,r)=>{if(t.type===R.ADD_NOTE){const n=window.getSelection();if(n.rangeCount>0){const o=n.getRangeAt(0),a=o.getBoundingClientRect(),s=L(o),m={x:a.left,y:a.bottom};W(m,t.payload.selectionText,s)}}else t.type==="NOTE_DELETED"&&g.removeHighlight(t.payload.id)});async function E(){(await k(window.location.href)).forEach(e=>{g.createHighlight(e)})}T(t=>{g.clearAll();const e=window.location.href;t.filter(n=>n.url===e||n.url===e.split("#")[0]).forEach(n=>{g.createHighlight(n)})});document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{g.injectStyles(),E()}):(g.injectStyles(),E());const Y=new MutationObserver(t=>{document.getElementById("contextmemo-styles")||g.injectStyles()});document.head&&Y.observe(document.head,{childList:!0});
