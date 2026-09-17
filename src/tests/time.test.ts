import {describe,it,expect} from 'vitest';import {toJD,fromJD,parseCivil,stepTime,zoneOffset,localJD,formatJD} from '../core/time';import {defaults,serialize,validateState} from '../core/state';
describe('Tiempo canónico y calendarios',()=>{
 it('J2000: 2000-01-01 12:00 UTC = JD2451545 (USNO/Meeus)',()=>expect(toJD({year:2000,month:1,day:1,hour:12})).toBe(2451545));
 it('1582-10-15 gregoriano = 1582-10-05 juliano (convención proléptica)',()=>expect(toJD({year:1582,month:10,day:15})).toBe(toJD({year:1582,month:10,day:5},'julian')));
 for(const calendar of ['gregorian','julian'] as const)for(const year of [-4000,-3113,-2000,-1,0,1,100,1582,2000,6000])it(`Ida/vuelta año astronómico ${year} · ${calendar}`,()=>{const c={year,month:3,day:1,hour:15,minute:24,second:39};expect(fromJD(toJD(c,calendar),calendar)).toEqual(c);});
 it('Rechaza fechas inexistentes, NaN y límites',()=>{expect(()=>parseCivil('2023-02-29','gregorian')).toThrow();expect(()=>parseCivil('2000-01-01 24:00','gregorian')).toThrow();expect(()=>parseCivil('6001-01-01','gregorian')).toThrow();});
 it('Distingue bisiesto juliano y gregoriano en 1900',()=>{expect(()=>parseCivil('1900-02-29','gregorian')).toThrow();expect(()=>parseCivil('1900-02-29','julian')).not.toThrow();});
 it('Paso de mes recorta 31 enero a 29 febrero de 2024',()=>expect(formatJD(stepTime(toJD({year:2024,month:1,day:31}),'mes',1,'gregorian')).slice(0,10)).toBe('2024-02-29'));
 it('UTC→Kolkata +5:30 cruza fecha (IANA)',()=>{const jd=toJD({year:2024,month:4,day:8,hour:20});expect(zoneOffset(jd,'Asia/Kolkata')).toBe(330);expect(fromJD(localJD(jd,'Asia/Kolkata')).day).toBe(9);});
 it('Nueva York transición DST 2024-03-10 07:00 UTC (IANA)',()=>{expect(zoneOffset(toJD({year:2024,month:3,day:10,hour:6}),'America/New_York')).toBe(-300);expect(zoneOffset(toJD({year:2024,month:3,day:10,hour:8}),'America/New_York')).toBe(-240);});
 it('Exportación/importación conserva el estado completo y rechaza valores inválidos',()=>{expect(validateState(JSON.parse(serialize(defaults)))).toEqual(defaults);for(const patch of [{jd:NaN},{latitude:91},{zone:'invalid/zone'},{speed:Infinity},{selected:'bad'},{quality:'bad'},{correlation:5.2}])expect(()=>validateState({version:1,state:{...defaults,...patch}})).toThrow();expect(()=>validateState({version:2,state:defaults})).toThrow();});
});
