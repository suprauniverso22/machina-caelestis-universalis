import {describe,it,expect} from 'vitest';import {gears,ratios} from '../mechanics/machine';import {rational,solveRatios,angleAt,planetaryCarrier,differential,pinSlot,pinSlotVelocity,thermalScale,transmissionLoad,interference} from '../mechanics/solver';import {defaults} from '../core/state';
describe('Cinemática declarativa',()=>{
 it('Circuito completo y relaciones de dientes por cada módulo',()=>{for(const g of gears){expect(ratios.has(g.id)).toBe(true);if(g.parent){const p=gears.find(x=>x.id===g.parent)!,a=ratios.get(g.id)!,b=ratios.get(p.id)!;expect(a.n/a.d).toBeCloseTo(b.n/b.d*(g.connection==='shaft'?1:-p.teeth/g.teeth),12);}}});
 it('Tzolk’in 260→Haab’365; relación 52/73 inversa',()=>{expect(ratios.get('maya-0-1')).toEqual({n:-52,d:73});expect(260/(52/73)).toBe(365);});
 it('Conservación de fase al avanzar y retroceder 18980 días',()=>{for(const g of gears){const r=ratios.get(g.id)!;const t=defaults.jd,initial=angleAt(t,g.inputPeriod,r);expect(angleAt(t+18980-18980,g.inputPeriod,r)).toBe(initial);}});
 it('Rechaza grafo cíclico y padre ausente',()=>{expect(()=>solveRatios([{...gears[0],parent:gears[0].id}])).toThrow();expect(()=>solveRatios([{...gears[0],parent:'missing'}])).toThrow();});
 it('Relación interior mantiene el sentido y compuesto conserva velocidad',()=>{const base={...gears[0],id:'root',parent:undefined,teeth:20};const out={...base,id:'out',teeth:80,parent:'root',connection:'internal' as const};expect(solveRatios([base,out]).get('out')).toEqual(rational(1,4));});
 it('Willis: sol20/corona60 fija produce portador 1/4',()=>expect(planetaryCarrier(1,0,20,60)).toBe(.25));
 it('Diferencial de dos entradas iguales opuestas produce cero',()=>expect(differential(3,-3)).toBe(0));
 it('Pasador concéntrico es uniforme, excéntrico cambia velocidad',()=>{expect(pinSlot(.5,0)).toBeCloseTo(.5,12);expect(pinSlotVelocity(.5,0)).toBe(1);expect(pinSlotVelocity(0)).toBeGreaterThan(pinSlotVelocity(Math.PI));});
 it('Dilatación y limitador son explícitos',()=>{expect(thermalScale(20)).toBe(1);expect(thermalScale(100)).toBeGreaterThan(1);expect(transmissionLoad(10,rational(1,2),.1,5)).toEqual({torque:5,slipping:true,efficiency:.9});});
 it('Detecta colisión no conectada y separa planos',()=>{const a={...gears[0],id:'a',parent:undefined,shaft:'a'},b={...a,id:'b',shaft:'b'};expect(interference([a,b])).toHaveLength(1);expect(interference([a,{...b,position:[0,0,3]}])).toHaveLength(0);});
 it('No hay interferencias de envolvente en el plano de cada circuito nominal',()=>{for(const id of new Set(gears.map(g=>g.module)))expect(interference(gears.filter(g=>g.module===id))).toEqual([]);});
});
