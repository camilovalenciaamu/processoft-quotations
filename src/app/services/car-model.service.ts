import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarModelI } from '../models/car-model.interface';
@Injectable({
  providedIn: 'root',
})
export class CarModelService {
  constructor(private http: HttpClient) {}

  public getCarModels() {
    return this.http.get<CarModelI>(
      'https://integrador.processoft.com.co/api/menutest'
    );
  }
}
