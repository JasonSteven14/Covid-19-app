import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Covid19HelperService } from '../services/covid-19-helper.service';
import { CovidCases } from '../interfaces/covid-cases';
import { TranslateService } from '@ngx-translate/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  time = new Date();
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  public currentTime = this.time;
  casesSpain: CovidCases;
  casesCovid19: CovidCases;
  titletl: string;

  constructor(
    private covid19Helper: Covid19HelperService,
    private translate: TranslateService,
  ) {
    console.log(this.time.toLocaleString('es-ES', this.options));
   }

  ngOnInit() {
    this.covid19Helper.getCovid19CasesByCountrySpain().then(res => {
      return this.casesSpain = res;
    });
    this.covid19Helper.getCasesByCountry().then(res => {
      this.casesCovid19 = res;
      console.log(res);
    });
  }

  doRefresh(event: any) {
    this.covid19Helper.getCovid19CasesByCountrySpain().then(
      res => {
        this.casesSpain = res;
        console.log(res);
        event.target.complete();
      }
    );
  }
}
