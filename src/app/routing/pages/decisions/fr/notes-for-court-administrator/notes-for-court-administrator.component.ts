import { Component, OnInit,  Input } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsService} from '../../../../../shared/services/forms.service';
import {DecisionService} from '../../../../../domain/services/decision.service';

@Component({
  selector: 'app-notes-for-court-administrator',
  templateUrl: './notes-for-court-administrator.component.html',
  styleUrls: ['./notes-for-court-administrator.component.scss']
})
export class NotesForCourtAdministratorComponent implements OnInit {
    notesForCourtAdminForm: FormGroup;
    draft: string;
    options: any;
    decision: any;
    request: any;
    pageValues: any;
    case: any;

    @Input() pageitems;
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public decisionService: DecisionService,
        private formsService: FormsService
    ) { }
    createForm(pageitems, pageValues) {
        this.notesForCourtAdminForm = new FormGroup(this.formsService.defineformControls(pageitems, pageValues));
    }
    ngOnInit() {
        this.activatedRoute.parent.data.subscribe(data => {
            this.case = data.caseData;
        });
        const caseId = this.case.id;
        const pageId = 'notes-for-court-administrator';
        const jurId = 'fr';
        this.decisionService.fetch(jurId, caseId, pageId).subscribe(decision => {
            this.decision = decision;
            this.pageitems = this.decision.meta;
            this.pageValues = this.decision.formValues;
            this.createForm(this.pageitems, this.pageValues);
            console.log('Pageitems = ', this.pageitems);
        });
    }
    onSubmit() {
        const event = this.notesForCourtAdminForm.value.createButton.toLowerCase();
        delete this.notesForCourtAdminForm.value.createButton;
        this.request = { formValues: this.notesForCourtAdminForm.value, event: event };
        this.decisionService.submitDecisionDraft('fr',this.activatedRoute.snapshot.parent.data.caseData.id, this.pageitems.name, this.request).subscribe(decision => {
            console.log(decision.newRoute);
            this.router.navigate([`../${decision.newRoute}`], {relativeTo: this.activatedRoute});
        });
    }
}
