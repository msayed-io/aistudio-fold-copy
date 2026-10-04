(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; A.settings={foldUserMessages:true,copyUserMessages:true,copyModelMessages:true,lines:8,tolerance:2,includeThoughts:false,debug:false};
  const turnOf=bubble=>bubble.closest('ms-console-turn')||bubble.parentElement;
  const actionsFor=(bubble,type)=>{
    const turn=turnOf(bubble); if(!turn)return bubble;
    // Model turns already contain AI Studio's native action row; join its last visible control.
    if(type==='model'){
      const native=[...turn.querySelectorAll('button:not([data-afc-ui])')].filter(b=>!b.closest('ms-cmark-node')&&b.offsetParent!==null);
      const host=native.at(-1)?.parentElement;
      if(host&&host!==bubble)return host;
    }
    let row=turn.querySelector(`:scope > [data-afc-actions][data-afc-kind="${type}"]`);
    if(!row){row=document.createElement('div');row.dataset.afcUi='';row.dataset.afcActions='';row.dataset.afcKind=type;row.className=`afc-actions afc-${type}-actions`;turn.appendChild(row);}
    return row;
  };
  A.isStreaming=bubble=>Boolean(bubble.closest('[aria-busy="true"], [data-streaming="true"], .streaming, .is-streaming'));
  A.updateCopyAvailability=bubble=>{const button=(turnOf(bubble).querySelector('[data-afc-copy]'));if(!button)return;const streaming=A.isStreaming(bubble);button.hidden=streaming;button.disabled=streaming;button.setAttribute('aria-hidden',String(streaming));};
  A.ensureCopy=(bubble,type)=>{
    const turn=turnOf(bubble); const row=actionsFor(bubble,type); let b=turn.querySelector('[data-afc-copy]');
    if(!b){b=document.createElement('button');b.type='button';b.dataset.afcUi='';b.dataset.afcCopy='';b.className='afc-copy';b.setAttribute('aria-label','نسخ الرسالة');b.title='نسخ الرسالة';b.textContent='⧉';b.addEventListener('click',()=>A.copyFor(bubble,type==='user',b));}
    if(b.parentElement!==row)row.appendChild(b);
    A.updateCopyAvailability(bubble);
  };
  const load=()=>chrome.storage.sync.get(A.settings).then(s=>{A.settings=Object.assign(A.settings,s);A.schedule();}).catch(()=>A.schedule());
  chrome.storage.onChanged.addListener((changes,area)=>{if(area!=='sync')return;for(const [k,v] of Object.entries(changes))A.settings[k]=v.newValue;A.resetFolds();A.schedule();});
  if(location.pathname.startsWith('/apps/')){load();A.startMinimap?.();A.startObserver();window.addEventListener('resize',A.schedule,{passive:true});}
})();
