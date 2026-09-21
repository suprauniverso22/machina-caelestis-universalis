import {describe,it,expect} from 'vitest';
import {defaults} from '../core/state';
import {kingWen,resolveHexagram,hexagramInfo} from '../modules/yijing';
import {skyAt,projectSky} from '../astronomy/sky';
import {toJD} from '../core/time';
import {longitudes} from '../astronomy/ephemeris';
import {symbols} from '../data/symbols';
describe('Vistas coordinadas',()=>{
 it('representa los 64 hexagramas sin duplicados y conserva extremos King Wen',()=>{expect(new Set(kingWen).size).toBe(64);expect(hexagramInfo(63).number).toBe(1);expect(hexagramInfo(0).number).toBe(2);expect(hexagramInfo(7).number).toBe(11);});
 it('avanza y retrocede el hexagrama diario, y respeta la selección manual',()=>{const s={...defaults,yijingRule:'binary-demo-v1' as const,zone:'UTC'};expect(resolveHexagram({...s,jd:s.jd+1})).toBe((resolveHexagram(s)+1)%64);expect(resolveHexagram({...s,jd:s.jd+64})).toBe(resolveHexagram(s));expect(resolveHexagram({...s,jd:s.jd-64})).toBe(resolveHexagram(s));expect(resolveHexagram({...s,yijingRule:'none',hexagram:23})).toBe(23);});
 it('muestra luna nueva durante el eclipse del 8 de abril de 2024',()=>{const q=longitudes(toJD({year:2024,month:4,day:8,hour:18,minute:21}));expect(q.illumination).toBeLessThan(.001);});
 it('cambia altitud estelar con hora y lugar, conserva reversibilidad',()=>{const state={...defaults,jd:toJD({year:2024,month:4,day:8,hour:18,minute:21})};const a=skyAt(state),b=skyAt({...state,jd:state.jd+.25}),c=skyAt({...state,latitude:-33.87,longitude:151.21});const star=(s:typeof a)=>s.stars.find(x=>x.name==='Sirius')!;expect(a.stars.length).toBe(925);expect(Math.abs(star(a).alt-star(b).alt)).toBeGreaterThan(10);expect(Math.abs(star(a).alt-star(c).alt)).toBeGreaterThan(10);expect(star(skyAt(state))).toEqual(star(a));expect(projectSky(90,0)).toEqual({x:320,y:310});});
 it('cada símbolo tiene procedencia y las 24 runas son distintas',()=>{expect(new Set(symbols.map(s=>s.id)).size).toBe(symbols.length);expect(symbols.filter(s=>s.cultura==='Runas')).toHaveLength(24);for(const s of symbols){expect(s.fuente).toMatch(/^https:/);expect(s.traduccionES.length).toBeGreaterThan(0);expect(s.asset.length).toBeGreaterThan(0);}});
});
