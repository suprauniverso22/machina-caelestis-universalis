import * as A from 'astronomy-engine';
import {astroTime,observer} from './ephemeris';
import type {Settings} from '../core/state';
import catalog from '../data/stars.json';
export function skyAt(s:Pick<Settings,'jd'|'latitude'|'longitude'|'altitude'>){
 const time=astroTime(s.jd),obs=observer(s),rotation=A.Rotation_EQJ_EQD(time);
 const horizontal=(ra:number,dec:number)=>{const h=A.Horizon(time,obs,ra,dec);return {ra,dec,alt:h.altitude,az:h.azimuth};};
 const equatorial=(ra:number,dec:number)=>{const vec=A.VectorFromSphere(new A.Spherical(dec,ra*15,1),time),eq=A.EquatorFromVector(A.RotateVector(rotation,vec));return horizontal(eq.ra,eq.dec);};
 const stars=catalog.map(star=>({...star,...equatorial(star.ra,star.dec)}));
 const bodies=[A.Body.Sun,A.Body.Moon,A.Body.Mercury,A.Body.Venus,A.Body.Mars,A.Body.Jupiter,A.Body.Saturn].map((body,i)=>{const eq=A.Equator(body,time,obs,true,true);return {id:body,name:['Sol','Luna','Mercurio','Venus','Marte','Júpiter','Saturno'][i],...horizontal(eq.ra,eq.dec)};});
 const curve=(kind:'equator'|'ecliptic'|'galactic',latitude=0)=>Array.from({length:181},(_,i)=>{const longitude=i*2;if(kind==='equator')return equatorial(longitude/15,latitude);const rot=kind==='galactic'?A.Rotation_GAL_EQJ():A.Rotation_ECT_EQD(time);const vector=A.RotateVector(rot,A.VectorFromSphere(new A.Spherical(latitude,longitude,1),time));const eq=A.EquatorFromVector(vector);return kind==='galactic'?equatorial(eq.ra,eq.dec):horizontal(eq.ra,eq.dec);});
 return {stars,bodies,equator:curve('equator'),ecliptic:curve('ecliptic'),galactic:curve('galactic'),galacticNorth:curve('galactic',7),galacticSouth:curve('galactic',-7),center:equatorial(266.41683/15,-29.00781),northPole:equatorial(0,90),southPole:equatorial(0,-90)};
}
export function projectSky(alt:number,az:number){const r=(90-alt)/90*260,a=az*Math.PI/180;return {x:320-r*Math.sin(a),y:310-r*Math.cos(a)};}
