import ka from '../assets/karnataka.json';

interface Proj { minx: number; maxx: number; miny: number; maxy: number; offx: number; offy: number; scale: number; W: number; H: number }
interface KA { viewBox: string; proj: Proj; districts: { name: string; d: string }[] }

const data = ka as unknown as KA;

export const viewBox = data.viewBox;
export const districts = data.districts;

// Project a geographic point (lng, lat) into the same SVG space as the districts.
export function project(lng: number, lat: number): [number, number] {
  const p = data.proj;
  return [
    Math.round((p.offx + (lng - p.minx) * p.scale) * 10) / 10,
    Math.round((p.offy + (p.maxy - lat) * p.scale) * 10) / 10,
  ];
}
