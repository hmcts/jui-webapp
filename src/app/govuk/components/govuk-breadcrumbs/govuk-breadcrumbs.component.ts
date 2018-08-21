import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-govuk-breadcrumbs',
  templateUrl: './govuk-breadcrumbs.component.html',
  styleUrls: ['./govuk-breadcrumbs.component.scss']
})
export class GovukBreadcrumbsComponent {

    @Input() items = [
        {
            text: 'Home',
            href: '#'
        },
        {
            text: 'Passports, travel and living abroad',
            href: '#'
        },
        {
            text: 'Passports, travel and living abroad',
            href: '#'
        },
        {
            text: 'Travel abroad'
        }
        ];

  constructor() { }

}
