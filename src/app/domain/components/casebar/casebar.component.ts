import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/filter';
import {PageDateCaseBar} from '../../models/section_fields';
import {CaseService} from '../../services/case.service';

@Component({
    selector: 'app-casebar',
    templateUrl: './casebar.component.html',
    styleUrls: ['./casebar.component.scss']
})
export class CaseBarComponent implements OnInit {

    @Input() case: PageDateCaseBar;
    isHidden = false;

    constructor(private caseservice: CaseService) {}

    ngOnInit() {
        console.log(typeof this.caseservice.events);
        this.caseservice.events.forEach(event => {
            if (event === 'hideCasebar') {
                this.isHidden = true;
            }
        });
    }

}
