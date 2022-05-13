import { Component, Input } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country',
  templateUrl: './by-country.component.html',
  styles: [`
    li {
      cursor: pointer;
    }
  `
  ]
})
export class ByCountryComponent {

  term: string = '';
  existError: boolean = false;
  countries: Country[] = [];

  suggestedCountries: Country[] = [];
  showSuggestions: boolean = false;

  constructor(private countryService: CountryService) { }

  search(term: string) {
    this.existError = false;
    this.term = term;

    this.countryService.searchCountry(term)
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

  suggestions(term: string) {
    this.existError = false;
    this.term = term;
    this.showSuggestions = true;
    
    this.countryService.searchCountry(term)
      .subscribe({
        next: (countries) => {
          this.suggestedCountries = countries.splice(0,5);
        },
        error: (err) => {
          this.suggestedCountries = [];
        }
      })
    
  }

  suggestedSearch(term: string) {
    this.showSuggestions = false;
    this.search(term);
  }


}
