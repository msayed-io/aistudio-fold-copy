(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; let raf=0, observer;
  const isOwn = node => node instanceof Element && (node.matches('[data-afc-ui]') || Boolean(node.closest('[data-afc-ui]')));
  const relevant = mutation => {
    if (isOwn(mutation.target)) return false;
    if (mutation.type === 'attributes') return !isOwn(mutation.target);
    return [...mutation.addedNodes, ...mutation.removedNodes].some(node => node.nodeType === Node.ELEMENT_NODE && !isOwn(node));
  };
  A.process=()=>{raf=0; const root=A.q(document,A.selectors.scroll).el||document; const turns=A.qAll(root,A.selectors.turn).els; let n=0; for(const turn of turns){const type=A.classifyTurn(turn,A.settings.debug); if(type==='unknown')continue; const bubble=type==='user'?A.q(turn,A.selectors.userBubble).el:A.q(turn,A.selectors.modelBubble).el; if(!bubble)continue; if(type==='user'&&A.settings.foldUserMessages)A.applyFold(bubble); if((type==='user'&&A.settings.copyUserMessages)||(type==='model'&&A.settings.copyModelMessages))A.ensureCopy(bubble,type); else bubble.querySelector('[data-afc-copy]')?.remove(); if(type==='model') A.updateCopyAvailability?.(bubble); n++;} if(A.settings.debug)console.debug('[AFC] processed',n,'turns');};
  A.schedule=()=>{if(!raf)raf=requestAnimationFrame(A.process);};
  A.startObserver=()=>{const root=A.q(document,A.selectors.scroll).el||document.body; observer?.disconnect(); observer=new MutationObserver(mutations=>{if(mutations.some(relevant))A.schedule();}); observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['class','aria-expanded','aria-busy','data-streaming']});A.schedule();};
})();
