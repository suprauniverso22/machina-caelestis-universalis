import {create} from 'zustand';
export const useCultural=create<{enabled:boolean;focus:boolean;entry:string;setEnabled:(value:boolean)=>void;setFocus:(value:boolean)=>void;inspect:(id:string)=>void}>(set=>({enabled:true,focus:false,entry:'dendera',setEnabled:enabled=>set({enabled}),setFocus:focus=>set({focus}),inspect:entry=>set({entry})}));
