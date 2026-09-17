import {mod,localJD,fromJD,jdDate,parseCivil,zoneOffset,toJD} from '../core/time';
import type {Settings} from '../core/state';
export const tzolkinNames=['Imix’','Ik’','Ak’bal','K’an','Chikchan','Kimi','Manik’','Lamat','Muluk','Ok','Chuwen','Eb’','B’en','Ix','Men','K’ib’','Kab’an','Etz’nab’','Kawak','Ajaw'];
export const haabNames=['Pop','Wo’','Sip','Sotz’','Sek','Xul','Yaxk’in','Mol','Ch’en','Yax','Sak’','Keh','Mak','K’ank’in','Muwan','Pax','K’ayab','Kumk’u','Wayeb’'];
export function mayaCalendar(jd:number,correlation=584283){const n=Math.floor(jd+.5)-correlation;const h=mod(n+348,365);let r=n;const bases=[144000,7200,360,20,1];const longCount=bases.map(b=>{const q=Math.floor(r/b);r-=q*b;return q;});const yearStart=n-mod(n+348,365);
 return {n,tzolkinNumber:mod(n+3,13)+1,tzolkinName:tzolkinNames[mod(n+19,20)],haabDay:mod(h,20),haabMonth:haabNames[Math.floor(h/20)],longCount:longCount.join('.'),round:mod(n,18980),haabYear:Math.floor(mod(n,18980)/365)+1,yearBearer:tzolkinNames[mod(yearStart+19,20)]};}
export const stems=['Jiǎ 甲','Yǐ 乙','Bǐng 丙','Dīng 丁','Wù 戊','Jǐ 己','Gēng 庚','Xīn 辛','Rén 壬','Guǐ 癸'];
export const branches=['Zǐ 子','Chǒu 丑','Yín 寅','Mǎo 卯','Chén 辰','Sì 巳','Wǔ 午','Wèi 未','Shēn 申','Yǒu 酉','Xū 戌','Hài 亥'];
export const animals=['Rata','Buey','Tigre','Conejo','Dragón','Serpiente','Caballo','Cabra','Mono','Gallo','Perro','Cerdo'];
export const elements=['Madera','Fuego','Tierra','Metal','Agua'];
export function sexagenary(year:number){const n=mod(year-1984,60);return {index:n+1,stem:stems[n%10],branch:branches[n%12],animal:animals[n%12],element:elements[Math.floor(n%10/2)],polarity:n%2?'Yin':'Yang'};}
export function chineseCalendar(jd:number){const year=fromJD(jd).year;if(year<1900||year>2100)return null;const parts=new Intl.DateTimeFormat('en-u-ca-chinese',{year:'numeric',month:'numeric',day:'numeric',timeZone:'Asia/Shanghai'}).formatToParts(jdDate(jd));const get=(k:string)=>parts.find(p=>p.type===k)?.value||'';const related=Number(get('relatedYear'));if(!related)return null;const month=get('month');return {...sexagenary(related),year:related,month,day:+get('day'),leap:/bis|leap/i.test(month),provider:'Intl/ICU · China civil · Asia/Shanghai'};}
export function birthJD(s:Settings){const nominal=parseCivil(s.birth,'gregorian');let jd=nominal;for(let i=0;i<3;i++)jd=nominal-zoneOffset(jd,s.birthZone)/1440;if(Math.abs(localJD(jd,s.birthZone)-nominal)>1/86400)throw Error('Hora de nacimiento inexistente por cambio de horario.');return jd;}
export const trigrams=['Tierra ☷','Trueno ☳','Agua ☵','Lago ☱','Montaña ☶','Fuego ☲','Viento ☴','Cielo ☰'];
export const hexagramLines=(n:number)=>Array.from({length:6},(_,i)=>(n>>i)&1);
export const EGYPT_EPOCH=toJD({year:-746,month:2,day:26},'julian');
export function egyptCalendar(jd:number){const n=Math.floor(jd-EGYPT_EPOCH),day=mod(n,365);return {year:Math.floor(n/365)+1,month:day>=360?'Epagómenos':String(Math.floor(day/30)+1),day:day>=360?day-359:day%30+1,decan:day<360?Math.floor(day/10)+1:null,decadeDay:day%10+1};}
