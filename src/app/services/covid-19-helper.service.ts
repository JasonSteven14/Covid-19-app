import { Injectable } from '@angular/core';
import { CovidCases } from '../models/covid-cases';
import { Covid19Service } from '../covid-19.service';


@Injectable({
  providedIn: 'root'
})

export class Covid19HelperService {

  private casesHistoric: CovidCases[] = [];
  private casesTimeStamp;

  constructor(
    private covid19Service: Covid19Service
  ) { }

  getCovid19CasesByCountrySpain(): Promise<CovidCases> {
    if (this.casesHistoric && this.casesHistoric.length) {
      return new Promise((resolve) => {
        resolve(this.casesHistoric[0]);
      });
    } else {
      return this.covid19Service.getCasesByCountrySpain().then(res => {
        this.casesHistoric = res;
        if (res && res.length) {
          return this.casesHistoric[0];
        } else {
          return null;
        }
      });
    }
  }
}
