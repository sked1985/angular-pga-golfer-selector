import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerSelectorService {
  // dev
  // private statsUrl = 'http://localhost:4200/api/json/PlayerSeasonStats/2021';
  // prod
  // private statsUrl = 'https://witty-sea-0be26fd03.azurestaticapps.net/api/json/PlayerSeasonStats/2021';
  private statsUrl = 'https://fly.sportsdata.io/golf/v2/json/PlayerSeasonStats/2021';

  constructor(
    private http: HttpClient
  ) { }

  getPlayers(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': '9a223f53e5de442aa3aca629adae2c5e',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
    });


    const options = {
      headers
    };
    return this.http.get<any>(this.statsUrl, options)
      .pipe(
        tap(resp => {
          console.log(resp);
        }),
        map(resp => {
          if (resp) {
            return resp;
          }
        })
      );
  }
}
