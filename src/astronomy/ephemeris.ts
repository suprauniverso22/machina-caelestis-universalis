import * as A from 'astronomy-engine';
import {J2000,degrees,rad,localJD,fromJD} from '../core/time';
import type {Settings} from '../core/state';
import {pinSlot,pinSlotVelocity} from '../mechanics/solver';
export const LUNAR={synodic:29.530588853,sidereal:27.321661,anomalistic:27.55455,draconic:27.21222,apsidalYears:8.8826};
export const astroTime=(jd:number)=>new A.AstroTime(jd-J2000);
export const observer=(s:Pick<Settings,'latitude'|'longitude'|'altitude'>)=>new A.Observer(s.latitude,s.longitude,s.altitude);
export function longitudes(jd:number){const t=astroTime(jd);const sun=A.SunPosition(t).elon,moon=A.EclipticGeoMoon(t).lon;return {sun,moon,elongation:degrees(moon-sun),illumination:A.Illumination(A.Body.Moon,t).phase_fraction};}
export function lunarMechanical(jd:number){const days=jd-J2000,theta=rad(degrees(134.9633964+360*days/LUNAR.anomalistic));const correction=degrees((pinSlot(theta)-theta)*180/Math.PI+180)-180;const mean=degrees(218.3164477+360*days/LUNAR.sidereal);return {longitude:degrees(mean+correction),correction,velocity:360/LUNAR.sidereal+(pinSlotVelocity(theta)-1)*360/LUNAR.anomalistic,apsis:degrees(83.3530513+360*days/(LUNAR.apsidalYears*365.25))};}
export function lunarError(jd:number){const actual=longitudes(jd).moon,mechanical=lunarMechanical(jd).longitude;return degrees(mechanical-actual+180)-180;}
export function lunarSamples(jd:number){return Array.from({length:49},(_,i)=>{const d=i*365.25/48;return {x:d,y:lunarError(jd+d)};});}
export function nextPhase(jd:number,direction:number){const start=astroTime(jd+direction*1e-5);const events=[0,90,180,270].map(phase=>({phase,t:A.SearchMoonPhase(phase,start,direction*40)})).filter(x=>x.t&&direction*(x.t.ut+J2000-jd)>0).sort((a,b)=>direction*(a.t!.ut-b.t!.ut));return events[0]?{jd:events[0].t!.ut+J2000,phase:events[0].phase}:null;}
export function solarContext(s:Settings){const midnight=Math.floor(localJD(s.jd,s.zone)-.5)+.5-(localJD(s.jd,s.zone)-s.jd);const obs=observer(s);const rise=A.SearchRiseSet(A.Body.Sun,obs,1,astroTime(midnight),1);const eq=A.Equator(A.Body.Sun,astroTime(s.jd),obs,true,true);const horizontal=A.Horizon(astroTime(s.jd),obs,eq.ra,eq.dec,'normal');return {sunrise:rise?rise.ut+J2000:null,sunAltitude:horizontal.altitude,sunAzimuth:horizontal.azimuth};}
// Sirius J2000 catalogue position; precession by Astronomy Engine, proper motion omitted.
A.DefineStar(A.Body.Star1,6.752481,-16.716116,8.60);
export function siriusContext(s:Settings){const obs=observer(s),eq=A.Equator(A.Body.Star1,astroTime(s.jd),obs,true,true),h=A.Horizon(astroTime(s.jd),obs,eq.ra,eq.dec,'normal');
 const c=fromJD(s.jd);if(c.year<1800||c.year>2200)return {altitude:h.altitude,azimuth:h.azimuth,heliacal:null,note:'Búsqueda limitada a 1800–2200; movimiento propio omitido.'};
 let previous:boolean|undefined,found:number|null=null;
 for(let day=-1;day<367;day++){const start=Math.floor(s.jd-.5)+.5+day;const dawn=A.SearchAltitude(A.Body.Sun,obs,1,astroTime(start),1,-s.solarDepression);if(!dawn)continue;const q=A.Equator(A.Body.Star1,dawn,obs,true,true),hor=A.Horizon(dawn,obs,q.ra,q.dec,'normal');const visible=hor.altitude>=s.siriusAltitude+s.horizon;if(previous===false&&visible){found=dawn.ut+J2000;break;}previous=visible;}
 return {altitude:h.altitude,azimuth:h.azimuth,heliacal:found,note:'Primer cruce anual del umbral al alba; criterio geométrico, sin extinción ni meteorología. Sirio J2000 sin movimiento propio; no fecha histórica absoluta.'};
}
export function planets(jd:number){return [A.Body.Mercury,A.Body.Venus,A.Body.Mars,A.Body.Jupiter,A.Body.Saturn].map(body=>({body,longitude:A.Ecliptic(A.GeoVector(body,astroTime(jd),true)).elon}));}
