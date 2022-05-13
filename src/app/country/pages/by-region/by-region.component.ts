import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region',
  templateUrl: './by-region.component.html',
  styles: [`
    button {
      margin-right: 5px;
    }
  `
  ]
})
export class ByRegionComponent {

  regions: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  activeRegion: string = '';
  countries: Country[] = [];

  constructor(private countryService: CountryService) { }

  getClassCSS(region: string): string {
    return (region === this.activeRegion) ? 'btn btn-primary' : 'btn btn-outline-primary';
  }

  activateRegion(region: string) {

    if (region === this.activeRegion) {
      return;
    }

    this.activeRegion = region;
    this.countries = [];
    // console.log(region);
    
    this.countryService.searchRegion(region)
      .subscribe({
        next: (countries) => {
          this.countries = countries;
        }
      });
  }

}
