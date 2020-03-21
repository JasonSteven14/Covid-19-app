import { Component, OnInit } from '@angular/core';
import { Covid19HelperService } from '../services/covid-19-helper.service';
import { CovidCases } from '../models/covid-cases';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cases: CovidCases;

  constructor(
    private covid19Helper: Covid19HelperService
  ) { }

  ngOnInit() {
    this.covid19Helper.getCovid19CasesByCountrySpain().then(
      res => {
        this.cases = res;
      }
    );
  }
  refreshCases() {
  }
}
