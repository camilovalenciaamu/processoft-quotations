export interface RegionI {
  id: number;
  name: string;
}
export interface CityI {
  id: number;
  regionId: number;
  name: RegionI['name'];
}
