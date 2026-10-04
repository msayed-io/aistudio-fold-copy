(() => {
  const A = globalThis.AFC = globalThis.AFC || {};
  A.classifyTurn = function classifyTurn(el, debug = false) {
    if (!(el instanceof Element)) return 'unknown';
    const tag = el.tagName.toLowerCase();
    if (tag === 'ms-chat-turn-error' || el.closest('ms-chat-turn-error')) return 'unknown';
    const bubble = el.matches('div.bubble') ? el : el.querySelector(':scope > div.bubble');
    if (!bubble) return 'unknown';
    if (bubble.matches('div.bubble.user')) { if (debug) console.debug('[AFC] classify user: structural bubble.user'); return 'user'; }
    if (bubble.matches('div.bubble:not(.user)') && !bubble.querySelector('div.bubble.user')) { if (debug) console.debug('[AFC] classify model: structural bubble'); return 'model'; }
    return 'unknown';
  };
})();
