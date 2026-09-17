import {useState} from 'react';
import {BookOpen, CalendarDays, ChevronDown, CircleDot, Compass, Flame, Globe2, Moon, Orbit, Sparkles, Sun, Triangle} from 'lucide-react';
import {useMachine} from '../core/state';
import {formatJD,fromJD,localJD,mod} from '../core/time';
import {mayaCalendar,egyptCalendar,trigrams} from '../modules/calendars';
import {panchanga,ayanamsa,nakshatras} from '../modules/panchanga';
import {longitudes} from '../astronomy/ephemeris';
import {hexagramInfo,resolveHexagram} from '../modules/yijing';
import {useWheel} from '../wheel/wheel';
import {entries,rings,tropicalSolarSign} from '../wheel/catalog';
import {daysFromEpoch,isCivilTime,activeEntry} from '../wheel/engine';

type SummaryItem={label:string;value:string;icon:typeof Sun};
type SummarySection={id:string;title:string;ring:string;items:SummaryItem[]};

function sectionData(jd:number,days:number,zone:string,correlation:number,hexagram:number,yijingRule:'none'|'binary-demo-v1'):SummarySection[]{
 const civil=fromJD(jd),astronomical=isCivilTime(jd),local=astronomical?localJD(jd,zone):jd,maya=mayaCalendar(local,correlation),egypt=egyptCalendar(local);
 const longitude=astronomical?longitudes(jd):{sun:0,moon:0},panch=panchanga(longitude.sun,longitude.moon,local,0);
 const hex=hexagramInfo(resolveHexagram({jd,zone,hexagram,yijingRule}));
 const current=(id:string)=>{const ring=rings.find(r=>r.id===id)!;return activeEntry(days,ring,entries[id]);};
 const yuga=days<154858?entries.yugas[3]:current('yugas'),kalpa=current('kalpa'),mahakalpa=current('mahakalpa');
 return [
  {id:'time',title:'Tiempo universal',ring:'',items:[{label:'UTC',value:formatJD(jd).slice(0,16),icon:CalendarDays},{label:'Día Juliano',value:jd.toFixed(5),icon:Orbit},{label:'D desde J2000',value:days.toExponential(6)+' d',icon:CircleDot}]},
  {id:'mexica',title:'Mexica',ring:'tonalpohualli',items:[{label:'Tonalpohualli',value:current('tonalpohualli').name,icon:Sun},{label:'Xiuhpohualli',value:current('xiuhpohualli').name,icon:CalendarDays},{label:'Portador / siglo',value:`${current('siglo').name} · ${current('siglo').translation}`,icon:CircleDot},{label:'Xiuhmolpilli',value:`${current('xiuhmolpilli').name} / 158`,icon:Compass}]},
  {id:'maya',title:'Maya',ring:'tzolkin',items:[{label:'Cuenta Larga',value:maya.longCount,icon:CalendarDays},{label:'Rueda Calendárica',value:`${maya.tzolkinNumber} ${maya.tzolkinName} · ${maya.haabDay} ${maya.haabMonth}`,icon:Moon},{label:'Tzolk’in',value:`${current('tzolkin-number').name} · ${current('tzolkin').name}`,icon:Sun},{label:'Haab’',value:current('haab').name,icon:Moon}]},
  {id:'tibet',title:'Tíbet · Kālacakra',ring:'tibetan',items:[{label:'Año elemental',value:civil.year===2026?'Caballo de Fuego':`${current('tibetan').name} de ${current('elements').name}`,icon:Flame},{label:'Parkha',value:current('parkha').name,icon:Triangle},{label:'Mewa',value:`${current('mewa').name} · suma 15`,icon:CircleDot},{label:'Estado',value:'Comparativo · proveedor lunar pendiente',icon:BookOpen}]},
  {id:'iching',title:'I Ching',ring:'iching',items:[{label:'Hexagrama',value:current('iching').name,icon:BookOpen},{label:'Trigramas',value:`${trigrams[(current('iching').code??hex.code)&7]} / ${trigrams[((current('iching').code??hex.code)>>3)]}`,icon:Triangle},{label:'Secuencia',value:yijingRule==='none'?'Manual':'Día desde J2000',icon:CircleDot}]},
  {id:'egypt',title:'Egipcio · Dendera',ring:'dendera',items:[{label:'Decano activo',value:current('dendera').name==='Epagómenos'?'Epagómenos':`${current('dendera').name} / 36`,icon:Sun},{label:'Estación',value:egypt.month==='Epagómenos'?'Epagómenos':`Mes ${egypt.month}`,icon:CalendarDays}]},
  {id:'vedic',title:'Helenístico · védico',ring:'zodiac',items:[{label:'Signo solar',value:tropicalSolarSign(days,astronomical?longitude.sun:undefined),icon:Globe2},{label:'Casa',value:current('houses').name,icon:Compass},{label:'Tithi',value:astronomical?`${panch.tithi} · ${panch.fortnight}`:'No disponible',icon:Moon},{label:'Nakshatra',value:astronomical?(panch.nakshatra||nakshatras[0]):'No disponible',icon:Sparkles}]},
  {id:'cosmic',title:'Cosmología védica',ring:'yugas',items:[{label:'Yuga',value:yuga.name,icon:Flame},{label:'Kalpa',value:kalpa.name,icon:Orbit},{label:'Mahākalpa',value:mahakalpa.name,icon:Globe2}]},
 ];
}

export default function DailySummaryPanel(){
 const s=useMachine(),[collapsed,setCollapsed]=useState(false),setRing=useWheel(state=>state.set),days=s.d??daysFromEpoch(s.jd),sections=sectionData(s.jd,days,s.zone,s.correlation,s.hexagram,s.yijingRule);
 function focus(section:SummarySection){if(!section.ring)return;const ring=rings.find(item=>item.id===section.ring)!;setRing({ring:section.ring,entry:activeEntry(days,ring,entries[section.ring])});requestAnimationFrame(()=>document.querySelector(`[data-ring="${section.ring}"]`)?.classList.add('summary-focus'));setTimeout(()=>document.querySelector(`[data-ring="${section.ring}"]`)?.classList.remove('summary-focus'),900);}
 return <section className={`daily-summary ${collapsed?'is-collapsed':''}`} aria-label="Efemérides panculturales y resumen del día"><div className="daily-summary-heading"><div><span className="section-label">EFEMÉRIDES PANCULTURALES</span><h2>Resumen del día</h2></div><button aria-expanded={!collapsed} aria-label={collapsed?'Expandir resumen del día':'Colapsar resumen del día'} onClick={()=>setCollapsed(value=>!value)}><ChevronDown size={18}/></button></div>{!collapsed&&<div className="daily-summary-grid">{sections.map(section=><button className={`daily-summary-card ${section.ring?'is-linked':''}`} key={section.id} onClick={()=>focus(section)} aria-label={`${section.title}${section.ring?' · enfocar corona':''}`}><strong><CircleDot size={13}/> {section.title}</strong>{section.items.map(item=>{const Icon=item.icon;return <span className="daily-summary-item" key={item.label}><Icon size={14}/><small>{item.label}</small><b>{item.value}</b></span>;})}</button>)}</div>}</section>;
}
