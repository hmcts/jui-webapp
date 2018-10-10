import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../../domain/services/case.service';
import {FormGroup, FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'get-new-case',
    templateUrl: './get-new-case.component.html',
    styleUrls: ['./get-new-case.component.scss']
})
export class GetNewCaseComponent implements OnInit {
    getCaseForm : any;
    data: Object;
    error: string;

    constructor(private caseService: CaseService, private router: Router) {
    }

    ngOnInit() {
        this.getCaseForm = new FormGroup({
            getNextCase: new FormControl('')
        });
        this.caseService.getJurisdictions().subscribe(val => { console.log(val); this.data = val});
        console.log("data ", this.data);
    }


    onSubmit() {
        this.router.navigate([''], {
            queryParams: { selectedJurisdiction : this.getCaseForm.value.getNextCase}
        });
    }
}
