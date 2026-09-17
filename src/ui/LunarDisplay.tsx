import {useMemo} from 'react';
import {longitudes,astroTime} from '../astronomy/ephemeris';
import {SearchMoonPhase} from 'astronomy-engine';
import {J2000,formatJD,fromJD} from '../core/time';
import {useMachine} from '../core/state';
export const phaseNames=['Luna nueva','Creciente','Cuarto creciente','Gibosa creciente','Luna llena','Gibosa menguante','Cuarto menguante','Menguante'];
// Orthographic projection of the illuminated hemisphere. North is up, east left.
export function MoonDisc({elongation,size=150}:{elongation:number;size?:number}){
 const angle=elongation*Math.PI/180,side=Math.sin(angle)>=0?1:-1,limb:string[]=[],terminator:string[]=[];
 for(let i=0;i<=100;i++){const theta=Math.PI*i/100,y=-49.5*Math.cos(theta),x=49.5*Math.sin(theta);limb.push(`${50+side*x},${50+y}`);terminator.unshift(`${50+side*x*Math.cos(angle)},${50+y}`);}
 return <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={phaseNames[Math.round(elongation/45)%8]}><circle cx="50" cy="50" r="49.5" fill="#202a32"/><polygon points={[...limb,...terminator].join(' ')} fill="#f2e5b9"/><circle cx="50" cy="50" r="49.5" fill="none" stroke="#a2864e"/></svg>;
}
export default function LunarDisplay(){const jd=useMachine(s=>s.jd),set=useMachine(s=>s.set);const data=useMemo(()=>{if(fromJD(jd).year < -2000||fromJD(jd).year>3000)return null;return longitudes(jd);},[jd]);const events=useMemo(()=>data?[0,90,180,270].map(phase=>({phase,time:SearchMoonPhase(phase,astroTime(jd+1e-5),40)})):[],[jd,!!data]);
 if(!data)return <p>Efemérides lunares disponibles entre −2000 y 3000.</p>;
 return <section className="lunar-display" aria-label="Fases lunares calculadas"><MoonDisc elongation={data.elongation}/><div><h3>{phaseNames[Math.round(data.elongation/45)%8]}</h3><p>{(data.illumination*100).toFixed(1)} % iluminada · elongación {data.elongation.toFixed(1)}°</p><small>Proyección esquemática, norte arriba. Astronomy Engine.</small></div><div className="phase-strip">{events.map(({phase,time})=><button key={phase} disabled={!time} onClick={()=>time&&set({jd:time.ut+J2000,playing:false})}><MoonDisc elongation={phase} size={42}/><span>{phaseNames[phase/45]}</span><small>{time&&formatJD(time.ut+J2000).slice(0,16)} UTC</small></button>)}</div></section>;
}
