(() => {
  const A=globalThis.AFC=globalThis.AFC||{}; A.settings={foldUserMessages:true,copyUserMessages:true,copyModelMessages:true,lines:8,tolerance:2,includeThoughts:false,debug:false};
  A.isStreaming=bubble=>Boolean(bubble.closest('[aria-busy="true"], [data-streaming="true"], .streaming, .is-streaming'));
  A.updateCopyAvailability=bubble=>{const button=bubble.querySelector('[data-afc-copy]');if(!button)return;const streaming=A.isStreaming(bubble);button.hidden=streaming;button.disabled=streaming;button.setAttribute('aria-hidden',String(streaming));};
  A.ensureCopy=(bubble,type)=>{if(bubble.querySelector('[data-afc-copy]')){A.updateCopyAvailability(bubble);return;} const b=document.createElement('button');b.type='button';b.dataset.afcUi='';b.dataset.afcCopy='';b.className='afc-copy';b.setAttribute('aria-label','نسخ الرسالة');b.title='نسخ الرسالة';b.textContent='⧉';b.addEventListener('click',()=>A.copyFor(bubble,type==='user',b));bubble.appendChild(b);};
  const load=()=>chrome.storage.sync.get(A.settings).then(s=>{A.settings=Object.assign(A.settings,s);A.schedule();}).catch(()=>A.schedule());
  chrome.storage.onChanged.addListener((changes,area)=>{if(area!=='sync')return;for(const [k,v] of Object.entries(changes))A.settings[k]=v.newValue;A.resetFolds();A.schedule();});
  if(location.pathname.startsWith('/apps/')){load();A.startObserver();window.addEventListener('resize',A.schedule,{passive:true});}
})();
