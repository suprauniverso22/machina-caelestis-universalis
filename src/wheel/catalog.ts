import data from './data.json';
import {nahuaDays,mayaDays,mayaMonths,fromSymbol,type DialEntry} from '../data/dial-cultures';
import {symbols} from '../data/symbols';
import {hexagramInfo} from '../modules/yijing';
import {mod} from '../core/time';
import {activeIndex} from './engine';

export type Ring = typeof data.rings[number];
export interface Entry extends DialEntry { native:string; transliteration:string; weight?:number; code?:number }
export const rings:Ring[]=data.rings;
const enrich=(e:DialEntry):Entry=>({...e,native:e.name,transliteration:e.name});
function make(r:Ring,id:string,name:string,glyph:string,translation:string,description='',native=name,transliteration=name):Entry {
 return {id:r.id+'-'+id,name,native,transliteration,glyph,translation,description:description||r.description,culture:r.culture,source:r.source,license:'Texto explicativo propio; símbolo convencional.',author:'Machina Caelestis'};
}
export const core:Entry={id:'tonatiuh',name:'Tonatiuh',native:'Tōnatiuh',transliteration:'Tōnatiuh',translation:'El Sol · núcleo de la Piedra del Sol',culture:'Mexica',image:'art/tonatiuh.jpg',description:'El rostro central, identificado habitualmente como Tonatiuh, está rodeado por los cuatro soles anteriores y el signo de movimiento.',source:'https://www.inah.gob.mx/index.php/foto-del-dia/piedra-del-sol',license:'Texto explicativo propio; símbolo convencional.',author:'Tradición iconográfica mexica'};
const solarMonths='Atlcahualo Tlacaxipehualiztli Tozoztontli Hueytozoztli Toxcatl Etzalcualiztli Tecuilhuitontli Hueytecuilhuitl Tlaxochimaco Xocotlhuetzi Ochpaniztli Teotleco Tepeilhuitl Quecholli Panquetzaliztli Atemoztli Tititl Izcalli Nemontemi'.split(' ');
const animals=[['བྱི་བ་','byi ba','Ratón'],['གླང་','glang','Buey'],['སྟག་','stag','Tigre'],['ཡོས་','yos','Liebre'],['འབྲུག་','’brug','Dragón'],['སྦྲུལ་','sbrul','Serpiente'],['རྟ་','rta','Caballo'],['ལུག་','lug','Oveja'],['སྤྲེལ་','spreʼu / sprel','Mono'],['བྱ་','bya','Ave'],['ཁྱི་','khyi','Perro'],['ཕག་','phag','Cerdo']];
const elements=[['ཤིང་','shing','Madera'],['མེ་','me','Fuego'],['ས་','sa','Tierra'],['ལྕགས་','lcags','Hierro'],['ཆུ་','chu','Agua']];
const pinyin='Qián Kūn Zhūn Méng Xū Sòng Shī Bǐ XiǎoChù Lǚ Tài Pǐ TóngRén DàYǒu Qiān Yù Suí Gǔ Lín Guān ShìKè Bì Bō Fù WúWàng DàChù Yí DàGuò Kǎn Lí Xián Héng Dùn DàZhuàng Jìn MíngYí JiāRén Kuí Jiǎn Xiè Sǔn Yì Guài Gòu Cuì Shēng Kùn Jǐng Gé Dǐng Zhèn Gèn Jiàn GuīMèi Fēng Lǚ Xùn Duì Huàn Jié ZhōngFú XiǎoGuò JìJì WèiJì'.split(' ');
const prompts=['Da forma a una intención y sostén el primer paso.','Observa lo que puedes recibir antes de intervenir.','Prepara apoyos antes de comenzar algo incierto.','Reconoce lo que aún necesitas aprender.'];
export const reflection=(code:number)=>{const h=hexagramInfo(code);return `«${h.name}»: ${prompts[(h.number-1)%4]} Pregunta de contemplación: ¿cómo aparece este tema en tu situación? Interpretación editorial, sin predecir acontecimientos.`;};
export function entriesFor(r:Ring):Entry[] {
 switch(r.id){
 case 'tonalpohualli':return nahuaDays.map(enrich);
 case 'xiuhpohualli':return solarMonths.map((name,i)=>({...make(r,String(i),name,String(i+1),i===18?'Cinco días nemontemi':`Veintena ${i+1}`),weight:i===18?5:20}));
 case 'siglo':return Array.from({length:52},(_,i)=>{const e=nahuaDays[[2,7,12,17][i%4]];return {...enrich(e),id:'year-'+i,name:`${i%13+1} ${e.name}`,translation:`Año ${i+1} de 52 · ${e.translation}`,description:r.description};});
 case 'xiuhmolpilli':return Array.from({length:158},(_,i)=>make(r,String(i),`Atadura ${i+1}`,'○',`${(i*52).toLocaleString('es-MX')}–${((i+1)*52).toLocaleString('es-MX')} años de 365 días`));
 case 'zodiac':return symbols.filter(s=>s.cultura==='Grecia').map(s=>({...enrich(fromSymbol(s)),native:s.nombreOriginal,transliteration:s.transliteracion}));
 case 'houses':return Array.from({length:12},(_,i)=>make(r,String(i),`Casa ${i+1}`,['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII'][i],'Sector de 30° · esquema de casas iguales'));
 case 'tzolkin':return mayaDays.map(enrich);
 case 'tzolkin-number':return Array.from({length:13},(_,i)=>({...make(r,String(i),`Numeral ${i+1}`,String.fromCodePoint(0x1d2e1+i),String(i+1)),font:'mayan'}));
 case 'haab':return mayaMonths.map((e,i)=>({...enrich(e),weight:i===18?5:20}));
 case 'tibetan':return animals.map(([native,trans,name],i)=>({...make(r,String(i),name,native,name,undefined,native,trans),font:'tibetan',image:undefined}));
 case 'elements':return elements.map(([native,trans,name],i)=>({...make(r,String(i),name,native,name,undefined,native,trans),font:'tibetan'}));
 case 'parkha':return symbols.filter(s=>s.cultura==='China').map(s=>({...enrich(fromSymbol(s)),id:'parkha-'+s.id,native:s.nombreOriginal,transliteration:s.transliteracion,description:r.description+' El nombre chino de este trigrama se conserva como referencia comparativa.',culture:'Tíbet / origen chino'}));
 case 'mewa':return Array.from({length:9},(_,i)=>make(r,String(i),`Mewa ${i+1}`,String(i+1),`Número ${i+1}`,undefined,`སྨེ་བ་ ${i+1}`,'sme ba'));
 case 'iching':return Array.from({length:64},(_,code)=>{const h=hexagramInfo(code);return {...make(r,String(code),`${h.number}. ${h.name}`,h.glyph,h.name,reflection(code),h.chinese,pinyin[h.number-1]),code};});
 case 'dendera':return [...Array.from({length:36},(_,i)=>({...make(r,String(i),`Decano ${i+1}`,'𓇼',`División ${i+1} de 36`,r.description,'𓇼','sbꜣ · estrella; marcador genérico'),font:'egypt',weight:10,image:'art/dendera.jpg'})),{...make(r,'epagomenal','Epagómenos','+5','Cinco días complementarios'),weight:5}];
 case 'yugas':return [['सत्ययुग','Satya / Kṛta','Satya',4,'Era de verdad, claridad y renovación espiritual.'],['त्रेतायुग','Tretā','Tretā',3,'Era de disciplina ritual, virtud y disminución gradual de la armonía.'],['द्वापरयुग','Dvāpara','Dvāpara',2,'Era de dualidad, conocimiento y conflicto creciente.'],['कलियुग','Kali','Kali',1,'Era de oscuridad y conflicto (Kali Yuga). Culminación histórica previa a la Batalla de Shambhala (2424 d.C.)']].map(([native,trans,name,weight,description],i)=>({...make(r,String(i),String(name),String(name),`${Number(weight)*432000} años`,String(description),String(native),String(trans)),weight:Number(weight)}));
 default:return Array.from({length:r.id==='kalpa'?10:12},(_,i)=>make(r,String(i),r.name,r.id==='kalpa'?'KALPA':'MAHĀKALPA',r.id==='kalpa'?`${(i+1)*100} mahāyugas`:`División ${i+1} / 12`,r.description,r.id==='kalpa'?'कल्प':'महाकल्प',r.id==='kalpa'?'kalpa':'mahākalpa'));
 }
}
export const entries=Object.fromEntries(rings.map(r=>[r.id,entriesFor(r)]));
export const groups=[['mexica','Núcleo mexica'],['greek','Grecia helenística'],['maya','Rueda calendárica maya'],['tibet','Tíbet · Kālacakra'],['iching','Oráculo del I Ching'],['egypt','Dendera'],['cosmic','Yugas · Kalpas · Mahākalpas']] as const;

export const zodiacNames = ['Aries','Tauro','Géminis','Cáncer','Leo','Virgo','Libra','Escorpio','Sagitario','Capricornio','Acuario','Piscis'] as const;

export function tropicalSolarSign(days: number, sunLongitude?: number): string {
 const ring = rings.find(r => r.id === 'zodiac')!;
 const idx = typeof sunLongitude === 'number' && Number.isFinite(sunLongitude)
  ? mod(Math.floor(sunLongitude / 30), 12)
  : activeIndex(days, ring, entries.zodiac.map(e => e.weight || 1));
 const entry = entries.zodiac[idx] || entries.zodiac[0];
 const name = zodiacNames[idx] || zodiacNames[0];
 return `${name} (${entry.glyph} / ${entry.name})`;
}
