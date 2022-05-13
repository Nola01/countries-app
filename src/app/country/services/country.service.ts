import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private _apiUrl: string = 'https://restcountries.com/v3.1';

  get httpParams () {
    return new HttpParams().set('fields', 'name,capital,altSpellings,flags,population');
  }

  constructor(private http: HttpClient) { }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this._apiUrl}/name/${term}`;

    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this._apiUrl}/capital/${term}`;

    return this.http.get<Country[]>(url, {params: this.httpParams});
  }

  getCountryByCode(id: string): Observable<Country> {
    const url = `${this._apiUrl}/alpha/${id}`;
    
    return this.http.get<Country>(url);
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this._apiUrl}/region/${region}`;

    return this.http.get<Country[]>(url, {params: this.httpParams})
            .pipe(
              tap(console.log)
            )
  }

}
