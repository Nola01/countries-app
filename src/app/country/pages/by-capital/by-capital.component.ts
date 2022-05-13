import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital',
  templateUrl: './by-capital.component.html',
  styles: [
  ]
})
export class ByCapitalComponent {

  term: string = '';
  existError: boolean = false;
  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  search(term: string) {
    this.existError = false;
    this.term = term;

    this.countryService.searchCapital(term)
    .subscribe({
      next: (countries) => {
        console.log(countries);
        this.countries = countries;
      },
      error: (err) => {
        this.existError = true;      
        this.countries = []; 
      }      
    });    
  }
}
