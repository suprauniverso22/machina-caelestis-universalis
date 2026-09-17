import {describe,it,expect} from 'vitest';
import {existsSync} from 'node:fs';
import {J2000} from '../core/time';
import {phase,rotation,signedAngleDelta,dragDays,daysFromEpoch,logarithmicPosition,MAX_DAYS,sectorStep,activeIndex,activeEntry} from '../wheel/engine';
import {rings,entries,core,tropicalSolarSign} from '../wheel/catalog';
import {validateState,defaults} from '../core/state';
describe('Rueda concéntrica y reloj unificado',()=>{
 it('normaliza fechas anteriores a J2000 y conserva fases diminutas de eones',()=>{expect(daysFromEpoch(J2000)).toBe(0);expect(rotation(-1,20)).toBe(342);expect(rotation(20,20)).toBe(0);expect(rotation(1,1e17)).toBe(3.6e-15);for(const r of rings)expect(rotation(-(r.phaseOffset||0),r.period,r.phaseOffset||0)).toBeCloseTo(0);});
 it('recupera fases y fecha al invertir el arrastre y al cruzar ±180°',()=>{expect(signedAngleDelta(179,-179)).toBe(2);expect(signedAngleDelta(-179,179)).toBe(-2);for(const r of rings){const next=dragDays(0,90,r.period);expect(phase(next,r.period)).toBeCloseTo(.25,10);expect(dragDays(next,-90,r.period)).toBeCloseTo(0,6);}});
 it('repite las dos ruedas del Tzolk’in cada 260 días y el Haab’ a los 18980',()=>{for(const id of ['tzolkin','tzolkin-number']){const r=rings.find(r=>r.id===id)!;expect(rotation(260,r.period)).toBe(0);}for(const id of ['tzolkin','tzolkin-number','haab']){const r=rings.find(r=>r.id===id)!;expect(rotation(18980,r.period)).toBe(0);}});
 it('conserva los 158 ciclos y la proporción de los cinco días complementarios',()=>{expect(entries.xiuhmolpilli).toHaveLength(158);expect(rings.find(r=>r.id==='xiuhmolpilli')!.period).toBe(158*18980);expect(entries.haab.map(e=>e.weight).reduce((a,b)=>a!+b!,0)).toBe(365);expect(entries.dendera.map(e=>e.weight).reduce((a,b)=>a!+b!,0)).toBe(365);expect(entries.yugas.map(e=>e.weight)).toEqual([4,3,2,1]);});
 it('mantiene la jerarquía radial y el inventario completo de coronas',()=>{
  expect(rings).toHaveLength(18);
  expect(rings.every((ring,i)=>i===0||ring.inner===rings[i-1].outer+1)).toBe(true);
  expect(Object.fromEntries(rings.map(r=>[r.id,entries[r.id].length]))).toEqual({tonalpohualli:20,xiuhpohualli:19,siglo:52,xiuhmolpilli:158,zodiac:12,houses:12,tzolkin:20,'tzolkin-number':13,haab:19,tibetan:12,elements:5,parkha:8,mewa:9,iching:64,dendera:37,yugas:4,kalpa:10,mahakalpa:12});
  expect(Object.fromEntries(rings.map(r=>[r.id,r.period]))).toMatchObject({tonalpohualli:20,'tzolkin-number':13,tzolkin:20,haab:365,xiuhmolpilli:158*18980,iching:64,yugas:1577880000,kalpa:1577880000000});
 });
 it('todas las entradas tienen texto, procedencia y assets locales existentes',()=>{for(const e of [core,...Object.values(entries).flat()]){expect(e.native).toBeTruthy();expect(e.transliteration).toBeTruthy();expect(e.translation).toBeTruthy();expect(e.description).toBeTruthy();expect(e.source).toMatch(/^https:/);if(e.image)expect(existsSync('public/'+e.image),e.image).toBe(true);}});
 it('avanza sectores desiguales y mantiene fases negativas por debajo de una vuelta',()=>{expect(sectorStep(0,100,[4,3,2,1],1)).toBe(40);expect(sectorStep(40,100,[4,3,2,1],-1)).toBe(0);expect(sectorStep(0,365,[20,20,5],-1)).toBeCloseTo(-365*5/45);expect(rotation(-1,1e17)).toBeLessThan(360);});
 it('usa el mismo índice para el texto y el sector bajo la aguja superior',()=>{for(const ring of rings){const rows=entries[ring.id],weights=rows.map(row=>row.weight||1),days=9750,index=activeIndex(days,ring,weights);expect(activeEntry(days,ring,rows)).toBe(rows[index]);expect(rotation(days,ring.period,ring.phaseOffset||0)).toBeGreaterThanOrEqual(0);expect(rotation(days,ring.period,ring.phaseOffset||0)).toBeLessThan(360);}const yuga=rings.find(r=>r.id==='yugas')!,weights=entries.yugas.map(row=>row.weight||1);expect(activeIndex(9750,yuga,weights)).toBe(3);expect(activeIndex(154858,yuga,weights)).toBe(0);expect(rotation(154858,yuga.period,yuga.phaseOffset||0)).toBeCloseTo(0,10);});
 it('alinea el centro geométrico de cada sector activo exactamente a 0 grados (12:00 h)',()=>{
  for(const ring of rings){
   const rows=entries[ring.id],weights=rows.map(r=>r.weight||1),totalWeight=weights.reduce((a,b)=>a+b,0);
   for(const days of [0, 100, 4738, 9750, 154858]){
    const idx=activeIndex(days,ring,weights);
    let start=0;for(let i=0;i<idx;i++)start+=weights[i];
    const sectorCenter=start+weights[idx]/2;
    const drawnAngle=-(sectorCenter/totalWeight)*360;
    const rot=rotation(days,ring,ring.phaseOffset||0,weights);
    expect((drawnAngle+rot+360000)%360).toBeCloseTo(0,5);
    expect(activeEntry(days,ring,rows)).toBe(rows[idx]);
   }
  }
 });
 it('garantiza la regla histórica de Kali Yuga para D < 154858 y Satya en D = 154858',()=>{
  const yugaRing=rings.find(r=>r.id==='yugas')!,rows=entries.yugas,weights=rows.map(r=>r.weight||1);
  for(const days of [-100000, 0, 9750, 154857]){
   expect(activeIndex(days,yugaRing,weights)).toBe(3);
   expect(activeEntry(days,yugaRing,rows).name).toBe('Kali');
  }
  expect(activeIndex(154858,yugaRing,weights)).toBe(0);
  expect(activeEntry(154858,yugaRing,rows).name).toBe('Satya');
 });
 it('sincroniza reactivamente jd y d en state.ts',()=>{
  const state=validateState({version:1,state:{...defaults,jd:J2000+500}});
  expect(state.d).toBe(500);
 });
 it('guarda escalas cósmicas y rechaza estados y períodos inválidos',()=>{expect(validateState({version:1,state:{...defaults,jd:J2000+1e17,speed:1e12}}).speed).toBe(1e12);expect(()=>validateState({version:1,state:{...defaults,jd:2*MAX_DAYS}})).toThrow();for(const p of [0,-1,NaN,Infinity])expect(()=>phase(1,p)).toThrow();expect(logarithmicPosition(1e18)).toBe(1);});
 it('para 11/09/2026 (D ≈ 9750) reporta Virgo en el zodiaco helenístico y Caballo de Fuego en Kālacakra',()=>{
  const days = 9750;
  const zodiacRing = rings.find(r => r.id === 'zodiac')!;
  const zodiacWeights = entries.zodiac.map(r => r.weight || 1);
  const zIdx = activeIndex(days, zodiacRing, zodiacWeights);
  expect(zIdx).toBe(5);
  expect(activeEntry(days, zodiacRing, entries.zodiac).native).toBe('Παρθένος');
  expect(tropicalSolarSign(days)).toBe('Virgo (♍ / Παρθένος)');

  const rotZodiac = rotation(days, zodiacRing, zodiacRing.phaseOffset || 0, zodiacWeights);
  const drawnAngleZodiac = -((5 + 0.5) / 12) * 360;
  expect((drawnAngleZodiac + rotZodiac + 360000) % 360).toBeCloseTo(0, 5);

  const tibetanRing = rings.find(r => r.id === 'tibetan')!;
  const elementsRing = rings.find(r => r.id === 'elements')!;
  const tibetanAnimal = activeEntry(days, tibetanRing, entries.tibetan);
  const tibetanElement = activeEntry(days, elementsRing, entries.elements);
  expect(tibetanAnimal.name).toBe('Caballo');
  expect(tibetanElement.name).toBe('Fuego');
  expect(`${tibetanAnimal.name} de ${tibetanElement.name}`).toBe('Caballo de Fuego');
 });
});
