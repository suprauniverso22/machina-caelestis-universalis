export const J2000 = 2451545;
export const mod = (x:number,n:number) => ((x%n)+n)%n;
export const degrees = (x:number) => mod(x,360);
export const rad = (x:number) => x*Math.PI/180;
export type Calendar = 'gregorian' | 'julian';
export interface CivilDate {year:number;month:number;day:number;hour?:number;minute?:number;second?:number}
export function toJD(c:CivilDate, calendar:Calendar='gregorian'):number {
 let y=c.year,m=c.month; if(m<=2){y--;m+=12;} const a=Math.floor(y/100);
 const b=calendar==='gregorian'?2-a+Math.floor(a/4):0;
 return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+c.day+b-1524.5+((c.hour||0)*3600+(c.minute||0)*60+(c.second||0))/86400;
}
export function fromJD(jd:number,calendar:Calendar='gregorian'):Required<CivilDate>{
 const z=Math.floor(jd+.5),f=jd+.5-z;let a=z;
 if(calendar==='gregorian'){const alpha=Math.floor((z-1867216.25)/36524.25);a=z+1+alpha-Math.floor(alpha/4);}
 const b=a+1524,c=Math.floor((b-122.1)/365.25),d=Math.floor(365.25*c),e=Math.floor((b-d)/30.6001);
 const day=b-d-Math.floor(30.6001*e),month=e<14?e-1:e-13,year=month>2?c-4716:c-4715;
 const seconds=Math.min(86399,Math.floor(f*86400+.0001));
 return {year,month,day,hour:Math.floor(seconds/3600),minute:Math.floor(seconds/60)%60,second:seconds%60};
}
export const nowJD=()=>Date.now()/86400000+2440587.5;
export const jdDate=(jd:number)=>new Date((jd-2440587.5)*86400000);
export function zoneOffset(jd:number,zone:string):number{
 const dt=jdDate(jd); const parts=new Intl.DateTimeFormat('en-US',{timeZone:zone,timeZoneName:'longOffset'}).formatToParts(dt);
 const value=parts.find(p=>p.type==='timeZoneName')?.value||'GMT'; const match=value.match(/GMT([+-])(\d{2}):(\d{2})(?::(\d{2}))?/);
 return match?(match[1]==='-'?-1:1)*(Number(match[2])*60+Number(match[3])+Number(match[4]||0)/60):0;
}
export const localJD=(jd:number,zone:string)=>jd+zoneOffset(jd,zone)/1440;
export function formatJD(jd:number,calendar:Calendar='gregorian'){
 const c=fromJD(jd,calendar),pad=(n:number)=>String(n).padStart(2,'0');
 return `${c.year<0?'−':''}${String(Math.abs(c.year)).padStart(4,'0')}-${pad(c.month)}-${pad(c.day)} ${pad(c.hour)}:${pad(c.minute)}:${pad(c.second)}`;
}
export function parseCivil(value:string,calendar:Calendar):number{
 const m=value.trim().replace('−','-').match(/^(-?\d{1,5})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?)?$/);
 if(!m)throw Error('Usa AAAA-MM-DD HH:mm:ss; admite años negativos y año 0.');
 const c={year:+m[1],month:+m[2],day:+m[3],hour:+(m[4]||0),minute:+(m[5]||0),second:+(m[6]||0)};
 const jd=toJD(c,calendar),back=fromJD(jd,calendar);
 if(Object.keys(c).some(k=>c[k as keyof typeof c]!==back[k as keyof typeof back])||c.year< -4000||c.year>6000)throw Error('Fecha inválida. Intervalo admitido: −4000 a 6000.');
 return jd;
}
export type Step = 'minuto'|'hora'|'día'|'mes'|'año'|'siglo'|'ciclo';
export function stepTime(jd:number,step:Step,direction:number,cal:Calendar):number{
 const delta={minuto:1/1440,hora:1/24,día:1,ciclo:18980};
 if(step in delta)return jd+direction*delta[step as keyof typeof delta];
 const c=fromJD(jd,cal);if(step==='mes'){const n=c.year*12+c.month-1+direction;c.year=Math.floor(n/12);c.month=mod(n,12)+1;}else c.year+=direction*(step==='siglo'?100:1);
 const next=c.month===12?{year:c.year+1,month:1,day:1}:{year:c.year,month:c.month+1,day:1};
 c.day=Math.min(c.day,toJD(next,cal)-toJD({year:c.year,month:c.month,day:1},cal));return toJD(c,cal);
}
