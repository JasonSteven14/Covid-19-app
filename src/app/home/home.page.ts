import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Covid19HelperService } from '../services/covid-19-helper.service';
import { CovidCases } from '../interfaces/covid-cases';
import { interval, Observable,  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  time = new Date().toUTCString();
  public currentTime = this.time;
  casesSpain: CovidCases;
  casesCovid19: CovidCases;
  titletl: string;

  constructor(
    private covid19Helper: Covid19HelperService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
   }

  ngOnInit() {

    this.translate.get('TITLE').subscribe(res => {
      this.titletl = res;
    }
    );
    this.covid19Helper.getCovid19CasesByCountrySpain().then(res => {
      return this.casesSpain = res;
    });
    this.covid19Helper.getCasesByCountry().then(res => {
      this.casesCovid19 = res;
    });
  }

  doRefresh(event: any) {
    this.covid19Helper.getCovid19CasesByCountrySpain().then(
      res => {
        this.casesSpain = res;
        event.target.complete();
      }
    );
  }

}
