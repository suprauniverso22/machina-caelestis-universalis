import {useEffect,useRef,useState} from 'react';import {useMachine,serialize,type Settings} from '../core/state';import type {ModuleResult} from '../modules/contracts';
export function useReadings(){const state=useMachine(),[data,setData]=useState<{jd:number;result:ModuleResult}|null>(null),[error,setError]=useState('');const worker=useRef<Worker|null>(null),busy=useRef(false),queued=useRef<Settings|null>(null),sequence=useRef(0);
 useEffect(()=>{const w=new Worker(new URL('../workers/calculation.worker.ts',import.meta.url),{type:'module'});worker.current=w;w.onmessage=e=>{busy.current=false;if(e.data.error)setError(e.data.error);else{setError('');setData({jd:e.data.jd,result:e.data.result});}};w.onerror=()=>{busy.current=false;setError('No se pudo iniciar el trabajador de cálculo. Recarga la aplicación.');};const timer=setInterval(()=>{if(!busy.current&&queued.current){busy.current=true;w.postMessage({id:++sequence.current,settings:queued.current});queued.current=null;}},200);return()=>{clearInterval(timer);w.terminate();worker.current=null;busy.current=false;};},[]);
 // Only calculation inputs enter the worker, visual changes do not request recomputation.
 const key=JSON.stringify([state.jd,state.selected,state.zone,state.latitude,state.longitude,state.altitude,state.correlation,state.sidereal,state.ayanamsa,state.dayBoundary,state.birth,state.birthZone,state.birthPlace,state.yijingRule,state.hexagram,state.siriusAltitude,state.solarDepression,state.horizon]);
 useEffect(()=>{queued.current=JSON.parse(serialize(useMachine.getState())).state;},[key]);
 const matches=data?.result.id===state.selected;
 return {data:matches?data:null,error,stale:!matches||Math.abs((data?.jd??0)-state.jd)>1e-8};
}
