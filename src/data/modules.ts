import type {ModuleId} from '../core/state';
export const modules:{id:ModuleId;title:string;latin:string;description:string;color:string;period:number;teeth:[number,number,number];kind:string}[]=[
{id:'lunar',title:'Anomalía lunar',latin:'SELENE · ANTICITERA',description:'El movimiento irregular de nuestra Luna',color:'#89c6d6',period:27.321661,teeth:[48,32,48],kind:'ASTRONÓMICA'},
{id:'maya',title:'Rueda mesoamericana',latin:'TZOLK’IN · HAAB’',description:'Dos calendarios, un encuentro cada 52 años',color:'#89b99b',period:260,teeth:[52,73,52],kind:'HISTÓRICO-CALENDÁRICA'},
{id:'sino',title:'Matriz sinotibetana',latin:'ANIMALES · ELEMENTOS',description:'La trama del ciclo de sesenta años',color:'#ddab7d',period:365.2425*60,teeth:[60,12,30],kind:'HISTÓRICO-CALENDÁRICA'},
{id:'yijing',title:'Transformaciones Yìjīng',latin:'TRIGRAMAS · HEXAGRAMAS',description:'Una biblioteca de transformaciones',color:'#b5a7d4',period:64,teeth:[64,32,16],kind:'SIMBÓLICA-INTERPRETATIVA'},
{id:'vedic',title:'Horizonte védico',latin:'PAÑCĀṄGA · KĀLA',description:'Cinco miembros para medir el día',color:'#dfb36c',period:27.321661,teeth:[54,27,36],kind:'ASTRONÓMICA'},
{id:'egypt',title:'Esfera egipcio-helenística',latin:'SOTHIS · DECANOS',description:'El cielo de Sirio y los treinta y seis decanos',color:'#64b7ba',period:360,teeth:[36,12,30],kind:'HISTÓRICO-CALENDÁRICA'},
{id:'kalachakra',title:'Corona Kālacakra',latin:'KALKI · HISTORIOGRAFÍA',description:'Una cronología religiosa independiente',color:'#bf8f9b',period:365.2425*2500,teeth:[50,25,98],kind:'SIMBÓLICA-INTERPRETATIVA'}];
