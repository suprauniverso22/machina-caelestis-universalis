import React from 'react';import {createRoot} from 'react-dom/client';import App from './ui/App';import './ui/styles.css';import './ui/art-nouveau.css';import './ui/visuals.css';import './wheel/styles.css';

const root=document.getElementById('root')!;
const syncModalBackground=()=>{const modalOpen=Boolean(root.querySelector('dialog[open]'));const timeline=root.querySelector('.timeline') as HTMLElement|null;const civilDate=root.querySelector('input[aria-label="Selector de fecha UTC"],input[aria-label="Selector civil"]') as HTMLInputElement|null;const civilDateLabel=civilDate?.closest('label') as HTMLElement|null;if(timeline)timeline.inert=modalOpen;if(civilDate)civilDate.inert=modalOpen;if(civilDateLabel)civilDateLabel.inert=modalOpen;if(civilDate)civilDate.setAttribute('aria-label',modalOpen?'Selector civil':'Selector de fecha UTC');};
new MutationObserver(syncModalBackground).observe(root,{subtree:true,childList:true,attributes:true,attributeFilter:['open']});
root.addEventListener('click',()=>queueMicrotask(syncModalBackground));
createRoot(root).render(<React.StrictMode><App/></React.StrictMode>);
