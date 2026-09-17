import { mod, J2000 } from '../core/time';
import type {ModuleId} from '../core/state';
export interface Rational {n:number;d:number}
export const gcd=(a:number,b:number):number=>b?gcd(b,a%b):Math.abs(a);
export function rational(n:number,d:number):Rational{if(!Number.isInteger(n)||!Number.isInteger(d)||!d)throw Error('Relación racional inválida');const g=gcd(n,d);return {n:n/g*Math.sign(d),d:Math.abs(d)/g};}
export const multiply=(a:Rational,b:Rational)=>rational(a.n*b.n,a.d*b.d);
export type Gear={id:string;module:ModuleId;teeth:number;pitch:number;shaft:string;parent?:string;connection:'external'|'shaft'|'internal';position:[number,number,number];material:string;function:string;inputPeriod:number;depth:number};
export function solveRatios(gears:Gear[]):Map<string,Rational>{
 const byId=new Map(gears.map(g=>[g.id,g])),result=new Map<string,Rational>(),visiting=new Set<string>();
 function visit(id:string):Rational{if(result.has(id))return result.get(id)!;if(visiting.has(id))throw Error('Ciclo cinemático no resuelto');const g=byId.get(id);if(!g||g.teeth<=0)throw Error(`Engranaje inválido: ${id}`);visiting.add(id);let r=rational(1,1);if(g.parent){const p=byId.get(g.parent);if(!p)throw Error('Eje padre ausente');r=multiply(visit(p.id),g.connection==='shaft'?rational(1,1):rational(p.teeth*(g.connection==='external'?-1:1),g.teeth));}visiting.delete(id);result.set(id,r);return r;}
 gears.forEach(g=>visit(g.id));return result;
}
export function angleAt(jd:number,period:number,ratio:Rational,backlash=0){const angle=mod((jd-J2000)/period*ratio.n/ratio.d,1)*Math.PI*2;return Math.max(0,angle-backlash*Math.PI/180);}
export function planetaryCarrier(sun:number,ring:number,sunTeeth:number,ringTeeth:number){return (sun*sunTeeth+ring*ringTeeth)/(sunTeeth+ringTeeth);}
export const differential=(a:number,b:number)=>(a+b)/2;
export function pinSlot(theta:number,eccentricity=.1098,radius=1){if(Math.abs(eccentricity)>=radius)throw Error('Excentricidad excesiva');return Math.atan2(radius*Math.sin(theta),radius*Math.cos(theta)-eccentricity);}
export function pinSlotVelocity(theta:number,e=.1098,r=1){return r*(r-e*Math.cos(theta))/(r*r+e*e-2*r*e*Math.cos(theta));}
export const thermalScale=(temperature:number,alpha=19e-6)=>1+alpha*(temperature-20);
export function transmissionLoad(inputTorque:number,ratio:Rational,loss:number,limit:number){const output=Math.abs(inputTorque/(ratio.n/ratio.d))*(1-loss);return {torque:Math.min(output,limit),slipping:output>limit,efficiency:1-loss};}
export function interference(gears:Gear[],temperature=20):[string,string][]{const collisions:[string,string][]=[];const scale=thermalScale(temperature);for(let i=0;i<gears.length;i++)for(let j=i+1;j<gears.length;j++){const a=gears[i],b=gears[j];if(a.parent===b.id||b.parent===a.id||a.shaft===b.shaft)continue;if(Math.abs(a.position[2]-b.position[2])>=.15)continue;const distance=Math.hypot(a.position[0]-b.position[0],a.position[1]-b.position[1]);if(distance<(a.teeth*a.pitch+b.teeth*b.pitch)*.5*scale-.02)collisions.push([a.id,b.id]);}return collisions;}
