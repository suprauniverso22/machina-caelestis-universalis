import { modules } from '../data/modules';
import {solveRatios,type Gear} from './solver';
export const gears:Gear[]=modules.flatMap((m,mi)=>{
 const list:Gear[]=[];
 // Each module is a complete root + external pair + compound transfer stack.
 for(let layer=0;layer<5;layer++){
 const pitch=.021,ts=m.teeth;const x0=-.75,x1=x0+(ts[0]+ts[1])*pitch/2,x2=x1+(ts[1]+ts[2])*pitch/2*Math.cos(1.1),y2=(ts[1]+ts[2])*pitch/2*Math.sin(1.1);
 const positions:[[number,number],[number,number],[number,number]]=[[x0,0],[x1,0],[x2,y2]];
 for(let n=0;n<3;n++){const id=`${m.id}-${layer}-${n}`;list.push({id,module:m.id,teeth:ts[n],pitch,shaft:`${m.id}-axis-${n}-${layer}`,parent:n?`${m.id}-${layer}-${n-1}`:layer?`${m.id}-${layer-1}-0`:undefined,connection:n?'external':'shaft',position:[positions[n][0],positions[n][1],.32-layer*.23],depth:layer,material:n===1?'Cobre-berilio':'Latón relojero',function:layer===0?['Entrada temporal canónica','Transmisión inversora','Indicador de salida'][n]:'Transferencia coaxial ilustrativa',inputPeriod:m.period});}}
 return list;
});
export const ratios=solveRatios(gears);
export const centers=modules.map((_,i)=>{const a=Math.PI/2-i*Math.PI/4;return [4.45*Math.cos(a),4.45*Math.sin(a),0] as [number,number,number];});
export const pieceCount=gears.length*5+7+96+24;
