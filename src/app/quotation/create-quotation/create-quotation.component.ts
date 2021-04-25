import { CarModelI } from './../../models/car-model.interface';
//Services
import { QuotationService } from './../../services/quotation.service';
import { CarModelService } from './../../services/car-model.service';
import { LocationService } from './../../services/location.service';

//Interfaces
import { QuotationI } from './../../models/quotation.interface';
import { RegionI, CityI } from './../../models/location.interface';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-create-quotation',
  templateUrl: './create-quotation.component.html',
  styleUrls: ['./create-quotation.component.css'],
})
export class CreateQuotationComponent implements OnInit {
  selected_region: RegionI = { id: 0, name: '' };
  regions: RegionI[] = [];
  cities: CityI[] = [];
  models: any = [];
  quotationForm: FormGroup;
  condictions: boolean = true;
  quotation_errors = [];
  quotation_alert = '';
  quotation_succes = '';
  loading: boolean = false;

  constructor(
    private lService: LocationService,
    private cmService: CarModelService,
    private qService: QuotationService,
    private formBuilder: FormBuilder
  ) {
    this.getCarModels();
    this.quotationForm = this.formBuilder.group({
      modelo: ['', Validators.required],
      nombre_completo: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      numero_celular: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      condictions: ['', Validators.required],
    });
    // this.loading = true;
  }

  ngOnInit(): void {
    this.getCarModels();
    this.regions = this.lService.getRegions();
  }
  acceptCondictions(event: any) {
    this.condictions = event.target.checked;
  }
  onRegionSelected(event: any): void {
    this.cities = this.lService
      .getCities()
      .filter((item) => item.regionId == event.target.value);
  }
  getCarModels() {
    this.cmService.getCarModels().subscribe((resp) => {
      this.models = resp[1].subitems;
    });
  }

  createQuotation(values: any) {
    this.loading = true;

    let region = this.lService
      .getRegions()
      .filter((item) => item.id == values.departamento);

    let quotation: QuotationI = {
      modelo: values.modelo,
      nombre_completo: values.nombre_completo,
      email: values.email,
      numero_celular: values.numero_celular,
      departamento: region[0]?.name,
      ciudad: values.ciudad,
    };
    this.qService.createQuotation(quotation).subscribe(
      (resp) => {
        this.quotation_succes = 'Cotización creada exitosamente';
        setTimeout(() => {
          this.quotation_succes = '';
          this.loading = false;
        }, 5000);
      },
      (err) => {
        this.loading = false;
        let e = err.error.errors;
        if (e) {
          let keys = Object.keys(err.error.errors);

          keys.forEach((key) => {
            const control = this.quotationForm.controls[key];
            if (control) {
              control.setErrors({ custom: e[key][0] });
            }
          });
        }

        if (err.error.error) {
          this.quotation_alert = err.error.error;
          setTimeout(() => {
            this.quotation_alert = '';
          }, 5000);
        }
      }
    );
  }

  public getError(field: string) {
    if (this.quotationForm?.controls[field].hasError('custom')) {
      return this.quotationForm.controls[field].errors?.custom;
    }

    return null;
  }
}
