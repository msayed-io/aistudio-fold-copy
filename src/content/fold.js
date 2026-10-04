(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; const states=new Map();
  const key=b=>{ const t=b.closest('ms-console-turn'); return t?.getAttribute('data-turn-id')||t?.textContent.slice(0,80)||b; };
  const lineHeight=b=>parseFloat(getComputedStyle(b).lineHeight)||20;
  A.applyFold=(bubble, opts=A.settings)=>{
    if(!opts.foldUserMessages)return;
    // Keep AI Studio's DOM intact: never move children into a wrapper.
    const text=A.q(bubble,A.selectors.textNode).el;
    if(!text||bubble.querySelector('[contenteditable="true"],textarea,input'))return;
    const wrap=text;
    wrap.dataset.afcText='';
    const limit=lineHeight(bubble)*(opts.lines+opts.tolerance);
    const naturalHeight=Math.max(wrap.scrollHeight||0, Math.ceil(wrap.getBoundingClientRect().height||0));
    const needs=naturalHeight>limit+2;
    const k=key(bubble); const open=states.get(k)===true;
    bubble.dataset.afcFolded=needs&&!open?'true':'false';
    if(!needs){bubble.querySelector('[data-afc-toggle]')?.remove();return;}
    wrap.style.setProperty('--afc-limit',`${limit}px`);
    let btn=bubble.querySelector('[data-afc-toggle]');
    if(!btn){
      btn=document.createElement('button'); btn.type='button'; btn.dataset.afcUi=''; btn.dataset.afcToggle=''; btn.className='afc-toggle';
      btn.addEventListener('click',()=>{const next=states.get(k)!==true;states.set(k,next);A.applyFold(bubble,opts);});
      bubble.appendChild(btn);
    }
    btn.setAttribute('aria-expanded',String(open)); btn.setAttribute('aria-label',open?'طي الرسالة':'فتح الرسالة'); btn.textContent=open?'⌃':'⌄';
  };
  A.resetFolds=()=>{states.clear();document.querySelectorAll('[data-afc-folded="true"], [data-afc-text]').forEach(el=>{if(el.matches('[data-afc-text]'))el.removeAttribute('data-afc-text');else el.removeAttribute('data-afc-folded');});document.querySelectorAll('[data-afc-toggle]').forEach(b=>b.remove());};
})();
