import { Injectable } from '@angular/core';
import { CovidCases } from '../interfaces/covid-cases';
import { Covid19Service } from '../covid-19.service';
import { AngularDelegate } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class Covid19HelperService {

  constructor(
    private covid19Service: Covid19Service
  ) { }

  async getCovid19CasesByCountrySpain() {
    return this.covid19Service.getCasesByCountrySpain().then(res => {
      return res;
    });
  }

  getCasesByCountry() {
    return this.covid19Service.getCasesByCountry().then(res => {
      return res;
    });
  }
}
