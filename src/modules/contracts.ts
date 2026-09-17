import type {Settings,ModuleId} from '../core/state';
export type Classification='ASTRONÓMICA'|'HISTÓRICO-CALENDÁRICA'|'SIMBÓLICA-INTERPRETATIVA';
export interface Reading {label:string;value:string;unit?:string}
export interface ModuleResult {id:ModuleId;classification:Classification;status:'operativo'|'aproximado'|'parcial'|'demostrativo';hero:{label:string;value:string;caption:string};readings:Reading[];method:string;uncertainty:string;sourceIds:string[];chart?:{label:string;unit:string;points:{x:number;y:number}[]};details?:Record<string,unknown>}
export interface CalendarProvider<T>{id:string;version:string;source:string;status:'verified'|'partial'|'demo';calculate(settings:Settings):T}
export interface TibetanDate {year:number|null;month:number|null;day:number|null;leapMonth:boolean|null;omittedDay:boolean|null;duplicatedDay:boolean|null;parkha:number|null;mewa:number|null;note:string}
export const tibetanProvider:CalendarProvider<TibetanDate>={id:'tibetan-pending',version:'0.1',source:'https://arxiv.org/abs/1401.6285',status:'partial',calculate:()=>({year:null,month:null,day:null,leapMonth:null,omittedDay:null,duplicatedDay:null,parkha:null,mewa:null,note:'Conversión Phugpa/Tsurphu pendiente de validar. No se deduce del calendario chino. Parkha, Mewa y almanaque no asignados.'})};
export interface HanRuleProvider{ id:string;version:string;source:string;assign(jd:number):number|null }
export const hanProvider:HanRuleProvider={id:'han-unassigned',version:'0.1',source:'Richard J. Smith, The I Ching: A Biography (2012), sistemas posteriores al texto clásico',assign:()=>null};
