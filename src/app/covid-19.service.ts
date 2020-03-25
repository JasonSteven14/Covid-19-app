import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Covid19Service {

  constructor() { }

  getCasesByCountrySpain() {
    const url = 'https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=SPAIN';
    const data = fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'coronavirus-monitor.p.rapidapi.com',
        'x-rapidapi-key': 'fc9b700d8cmsh07c4965a20c35efp18bd1ajsn0bb779b30d62'
      }
    }).then(res => {
      const reader = res.body.getReader();
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
    }).then(
      res => {
        return res.json();
      }
    ).then(
      res => {
        return res.latest_stat_by_country[0];
      }
    ).catch(err => {
      console.log(err);
    });
    return data;
  }

  getCasesByCountry() {
    return fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
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
            return reader.read().then(({ done, value }) => {
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
    }).then( res => {
      return res.json();
    }).then( res => {
      return res.countries_stat;
    }
    ).catch(err => {
      console.log(err);
    });
  }
}
