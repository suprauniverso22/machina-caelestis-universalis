import {useEffect,useRef,useState} from 'react';
import {useFrame,type ThreeEvent} from '@react-three/fiber';
import {useTexture} from '@react-three/drei';
import * as THREE from 'three';
import {useMachine} from '../core/state';
import {useCultural} from '../core/cultural';
import {mod,J2000} from '../core/time';
import {mayaCalendar} from '../modules/calendars';
import {nahuaDays,mayaDays,mayaMonths,culturalEntries,type DialEntry} from '../data/dial-cultures';
import {culturalTextures,ringTexture} from './culturalTextures';
type Textures=Awaited<ReturnType<typeof culturalTextures>>;
export function useCulturalTextures(){const [textures,setTextures]=useState<Textures|null>(null);useEffect(()=>{let live=true;culturalTextures().then(t=>{if(live)setTextures(t);}).catch(e=>console.error(e));return()=>{live=false;};},[]);return textures;}
function pick(e:ThreeEvent<MouseEvent>,entries:DialEntry[]){e.stopPropagation();if(e.uv){const angle=mod(Math.atan2(e.uv.x-.5,e.uv.y-.5),2*Math.PI);useCultural.getState().inspect(entries[Math.round(angle/(2*Math.PI)*entries.length)%entries.length].id);}}
function EngravedRing({inner,outer,texture,entries,kind}:{inner:number;outer:number;texture:THREE.Texture;entries:DialEntry[];kind:'maya'|'haab'|'nahua'}){const ref=useRef<THREE.Mesh>(null);useFrame(()=>{const s=useMachine.getState(),m=mayaCalendar(s.jd,s.correlation);const index=kind==='maya'?mod(m.n+19,20):kind==='haab'?mayaMonths.findIndex(e=>e.name===m.haabMonth):mod(Math.floor(s.jd+.5)-J2000,20);if(ref.current)ref.current.rotation.z=index/entries.length*Math.PI*2;});return <mesh ref={ref} position={[0,0,2.9]} onClick={e=>pick(e,entries)} onPointerOver={()=>document.body.style.cursor='pointer'} onPointerOut={()=>document.body.style.cursor='auto'}><ringGeometry args={[inner,outer,192]}/><meshBasicMaterial map={texture} side={THREE.DoubleSide}/></mesh>;}
export default function CulturalDial(){const enabled=useCultural(s=>s.enabled),textures=useCulturalTextures(),dendera=useTexture(import.meta.env.BASE_URL+'art/dendera.jpg');const [outer,setOuter]=useState<THREE.Texture|null>(null);useEffect(()=>{culturalTextures().then(()=>setOuter(ringTexture(culturalEntries.filter(e=>e.culture==='Runas'||e.culture==='Árabe'),6.87,7.34,['#e4cc8d','#bfd0b8'])));},[]);if(!enabled||!textures)return null;return <group>
 <mesh position={[0,0,2.74]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[3.56,3.56,.24,128]}/><meshStandardMaterial color="#ac7c34" metalness={.72} roughness={.3}/></mesh>
 <mesh position={[0,0,2.91]} onClick={e=>{e.stopPropagation();useCultural.getState().inspect('dendera');}}><circleGeometry args={[1.34,128]}/><meshBasicMaterial map={dendera} color="#fff1d2"/></mesh>
 <EngravedRing inner={1.38} outer={2.12} texture={textures.nahua} entries={nahuaDays} kind="nahua"/>
 <EngravedRing inner={2.16} outer={2.83} texture={textures.maya} entries={mayaDays} kind="maya"/>
 <EngravedRing inner={2.87} outer={3.53} texture={textures.haab} entries={mayaMonths} kind="haab"/>
 {[1.36,2.14,2.85,3.56].map(r=><mesh key={r} position={[0,0,2.94]}><torusGeometry args={[r,.027,10,192]}/><meshStandardMaterial color="#edc36f" metalness={.8} roughness={.22}/></mesh>)}
 {[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return <group key={i} rotation={[0,0,a]}><mesh position={[0,3.66,2.77]} scale={[.12,.26,.06]}><sphereGeometry args={[1,12,12]}/><meshStandardMaterial color={i%2?'#b34c30':'#317e78'} metalness={.45} roughness={.3}/></mesh><mesh position={[0,4.05,.02]}><boxGeometry args={[.13,1.0,.16]}/><meshStandardMaterial color="#c59544" metalness={.85} roughness={.3}/></mesh><mesh position={[0,3.57,2.85]}><sphereGeometry args={[.047,10,10]}/><meshStandardMaterial color="#f7db8e" metalness={.8}/></mesh></group>;})}
 <mesh position={[0,3.53,3.02]} rotation={[0,0,Math.PI]}><coneGeometry args={[.1,.24,3]}/><meshStandardMaterial color="#a53b29"/></mesh>
 {outer&&<mesh position={[0,0,.48]} onClick={e=>pick(e,culturalEntries.filter(x=>x.culture==='Runas'||x.culture==='Árabe'))}><ringGeometry args={[6.87,7.34,192]}/><meshBasicMaterial map={outer}/></mesh>}
 </group>;}
