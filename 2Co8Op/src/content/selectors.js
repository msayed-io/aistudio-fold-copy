(() => {
  const A = globalThis.AFC = globalThis.AFC || {};
  A.selectors = Object.freeze({
    chat: ['ms-code-assistant-chat'],
    scroll: ['ms-autoscroll-container'],
    turn: ['ms-console-turn'],
    userBubble: ['div.bubble.user'],
    modelBubble: ['div.bubble:not(.user)'],
    textNode: ['ms-cmark-node'],
    attachment: ['div.preview-container', 'ms-file-preview'],
    code: ['ms-code-block'],
    thought: ['ms-chat-step', 'ms-expandable-turn'],
    error: ['ms-chat-turn-error']
  });
  A.q = (root, list) => { for (const s of list) { try { const el = root.querySelector(s); if (el) return {el, selector:s}; } catch (_) {} } return {el:null, selector:null}; };
  A.qAll = (root, list) => { for (const s of list) { try { const els = root.querySelectorAll(s); if (els.length) return {els:[...els], selector:s}; } catch (_) {} } return {els:[], selector:null}; };
})();
