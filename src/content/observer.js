(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; let raf=0, observer; let processAll=true; const pending=new Set();
  const isOwn=node=>node instanceof Element&&(node.matches('[data-afc-ui]')||Boolean(node.closest('[data-afc-ui]')));
  const turnOf=node=>{if(!(node instanceof Element)||isOwn(node))return null;return node.closest('ms-console-turn');};
  const addTurn=node=>{const turn=turnOf(node);if(turn)pending.add(turn);};
  A.process=()=>{
    raf=0;
    const root=A.q(document,A.selectors.scroll).el||document;
    const turns=processAll?A.qAll(root,A.selectors.turn).els:[...pending];
    processAll=false; pending.clear();
    let n=0;
    for(const turn of turns){
      if(!turn?.isConnected)continue;
      const type=A.classifyTurn(turn,A.settings.debug); if(type==='unknown')continue;
      const bubble=type==='user'?A.q(turn,A.selectors.userBubble).el:A.q(turn,A.selectors.modelBubble).el; if(!bubble)continue;
      if(type==='user'&&A.settings.foldUserMessages)A.applyFold(bubble);
      if((type==='user'&&A.settings.copyUserMessages)||(type==='model'&&A.settings.copyModelMessages))A.ensureCopy(bubble,type); else bubble.querySelector('[data-afc-copy]')?.remove();
      if(type==='model')A.updateCopyAvailability?.(bubble); n++;
    }
    if(A.settings.debug)console.debug('[AFC] processed',n,'turns');
  };
  A.schedule=(turns=null)=>{if(turns)for(const turn of turns)pending.add(turn);if(!raf)raf=requestAnimationFrame(A.process);};
  A.startObserver=()=>{
    const root=A.q(document,A.selectors.scroll).el||document.body; observer?.disconnect();
    observer=new MutationObserver(mutations=>{
      const changed=[];
      for(const mutation of mutations){
        if(isOwn(mutation.target))continue;
        if(mutation.type==='attributes'){addTurn(mutation.target);continue;}
        addTurn(mutation.target);
        for(const node of mutation.addedNodes) addTurn(node);
        for(const node of mutation.removedNodes) addTurn(mutation.target);
      }
      if(pending.size)changed.push(...pending);
      if(changed.length)A.schedule(changed);
    });
    // Deliberately do not watch class/aria-expanded: AI Studio changes those while scrolling.
    observer.observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-busy','data-streaming']});
    A.schedule();
  };
})();
