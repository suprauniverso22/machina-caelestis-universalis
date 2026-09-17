import {J2000, mod, toJD} from '../core/time';

export const MAX_DAYS = 1e18;
export const civilMin = toJD({year:-4000,month:1,day:1});
export const civilMax = toJD({year:6000,month:12,day:31,hour:23,minute:59,second:59});
export const isCivilTime = (jd:number) => jd >= civilMin && jd <= civilMax;
export const daysFromEpoch = (jd:number) => jd - J2000;
// Reduce before dividing: avoids cancellation of tiny positive phases on long cycles.
export function phase(days:number, period:number) {
 if (!Number.isFinite(days) || !Number.isFinite(period) || period <= 0) throw new RangeError('Tiempo o período inválido.');
 const remainder=days % period;
 return remainder < 0 ? Math.min((remainder + period) / period,1-Number.EPSILON/2) : remainder / period;
}
export function ringPhase(days:number, ring:{period:number;phaseOffset?:number}) {
 return phase(days+(ring.phaseOffset||0),ring.period);
}
export function activeIndex(
 days: number,
 ringOrPeriod: {period: number; phaseOffset?: number; id?: string} | number,
 weightsOrCount: number[] | number,
 phaseOffset = 0
): number {
 const isRingObj = typeof ringOrPeriod === 'object' && ringOrPeriod !== null;
 const period = isRingObj ? ringOrPeriod.period : ringOrPeriod;
 const offset = isRingObj ? (ringOrPeriod.phaseOffset || 0) : phaseOffset;
 const ringId = isRingObj ? ringOrPeriod.id : undefined;

 const weights = typeof weightsOrCount === 'number'
  ? Array.from({length: weightsOrCount}, () => 1)
  : weightsOrCount;

 if (ringId === 'yugas' && days < 154858) {
  return 3;
 }

 const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
 const position = phase(days + offset, period) * totalWeight;
 let cursor = 0;
 for (let index = 0; index < weights.length; index += 1) {
  cursor += weights[index];
  if (position < cursor) return index;
 }
 return weights.length - 1;
}

export const rotation = (
 days: number,
 ringOrPeriod: {period: number; phaseOffset?: number; id?: string} | number,
 phaseOffsetOrWeights: number | number[] = 0,
 maybeWeights?: number[]
): number => {
 const isRingObj = typeof ringOrPeriod === 'object' && ringOrPeriod !== null;
 const period = isRingObj ? ringOrPeriod.period : ringOrPeriod;
 const ringId = isRingObj ? ringOrPeriod.id : undefined;
 const phaseOffset = typeof phaseOffsetOrWeights === 'number'
  ? phaseOffsetOrWeights
  : (isRingObj ? (ringOrPeriod.phaseOffset || 0) : 0);
 const weights = Array.isArray(phaseOffsetOrWeights)
  ? phaseOffsetOrWeights
  : maybeWeights;

 if (weights && weights.length > 0) {
  const idx = activeIndex(days, {period, phaseOffset, id: ringId}, weights);
  let start = 0;
  for (let i = 0; i < idx; i++) {
   start += weights[i];
  }
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  const sectorCenter = start + weights[idx] / 2;
  return (sectorCenter / totalWeight) * 360;
 }
 return 360 * phase(days + phaseOffset, period);
};

export function activeEntry<T>(
 days: number,
 ring: {period: number; phaseOffset?: number; id?: string},
 rows: T[],
 weightOf: (row: T) => number = (row: T) => Number((row as {weight?: number}).weight || 1)
): T {
 if (ring.id === 'yugas' && days < 154858) {
  return rows[3] || rows[0];
 }
 return rows[activeIndex(days, ring, rows.map(weightOf))] || rows[0];
}
export const signedAngleDelta = (before:number, after:number) => mod(after-before+180,360)-180;
export const dragDays = (days:number, deltaDegrees:number, period:number) => Math.max(-MAX_DAYS,Math.min(MAX_DAYS,days+deltaDegrees/360*period));
export const durationLabel = (days:number) => days < 1000 ? `${days.toLocaleString('es-MX',{maximumFractionDigits:5})} días` : `${(days/365.25).toLocaleString('es-MX',{maximumSignificantDigits:6})} años medios`;
export const logarithmicPosition = (days:number) => Math.log10(Math.max(1,days))/18;

// Move to the next/previous sector boundary, including unequal calendar sectors.
export function sectorStep(days:number, period:number, weights:number[], direction:number,phaseOffset=0){
 const total=weights.reduce((a,b)=>a+b,0),position=phase(days+phaseOffset,period)*total;
 const boundaries=[0];for(const weight of weights)boundaries.push(boundaries.at(-1)!+weight);
 const epsilon=1e-9;
 const target=direction>0?(boundaries.find(b=>b>position+epsilon)??total):([...boundaries].reverse().find(b=>b<position-epsilon)??-weights.at(-1)!);
 return days+(target-position)/total*period;
}
