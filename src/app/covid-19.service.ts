import { Injectable } from '@angular/core';
import { CovidCases } from './models/covid-cases';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor() { }

  getCasesByCountrySpain(): Promise<CovidCases[]> {
    const url = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=spain';
    const data: Promise<CovidCases[]> = fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': 'fc9b700d8cmsh07c4965a20c35efp18bd1ajsn0bb779b30d62'
      }
    }).then(response => {
      const reader = response.body.getReader();
      const stream = new ReadableStream({
        start(controller) {
          function push() {
            reader.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              push();
            });
          }
          push();
        }
      });
      return new Response(stream, { headers: { 'Content-Type': 'text/html' } });
    }).then(res => {
      return res.json();
    }).then(res => {
      return res.stat_by_country.slice(-5);
    }).catch(err => {
      console.log(err);
    });

    return data;
  }
}
