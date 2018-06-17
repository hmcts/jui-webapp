import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import { CaseFileService } from '../../../case-file.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-view-case-file',
    templateUrl: './view-case-file.component.html',
    styleUrls: ['./view-case-file.component.scss']
})
export class ViewCaseFileComponent implements OnInit {

    documents: Array<Object>;
    caseId: string;
    documentId: string;
    case: any;

    constructor(public router: Router, private caseFileService: CaseFileService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.caseId = params.case_id;
            this.documentId = params.doc_id;
        });
    }

    ngOnInit() {
        this.caseFileService.fetch(this.caseId).subscribe(data => {
            this.case = data;
            const caseFile = this.case.sections.filter(section => section.id === 'casefile');
            this.documents = caseFile[0].sections;
        });
    }

}
