import { RegionI, CityI } from '../models/location.interface';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}
  private regions: RegionI[] = [
    {
      id: 1,
      name: 'Valle del cauca',
    },
    {
      id: 2,
      name: 'Antioquia',
    },
    {
      id: 3,
      name: 'Bogotá DC',
    },
  ];
  private cities: CityI[] = [
    {
      id: 1,
      regionId: 1,
      name: 'Cali',
    },
    {
      id: 1,
      regionId: 1,
      name: 'Yumbo',
    },
    {
      id: 1,
      regionId: 1,
      name: 'Palmira',
    },
    {
      id: 2,
      regionId: 2,
      name: 'Medellín',
    },

    {
      id: 1,
      regionId: 3,
      name: 'Bogotá',
    },
  ];

  getRegions(): RegionI[] {
    return this.regions;
  }
  getCities(): CityI[] {
    return this.cities;
  }
}
