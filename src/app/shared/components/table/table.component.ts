import {Component, OnChanges, Input} from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

    @Input() data: Object;

    head = [];
    rows = [];

    ngOnChanges(changes) {
        const headObj = changes.data.currentValue.columns.map(c => ({ text: c.label, fieldId: c.case_field_id}));
        this.head = headObj.map(h => ({text: h.text}));
        this.rows = changes.data.currentValue.results
            .map(r => {
                return headObj
                    .map(h => {
                        if (h.fieldId === 'case_ref') {
                            return {html: this.caseIdHref(r.case_jurisdiction, r.case_type_id, r.case_id, r.case_fields[h.fieldId]) };
                        } else {
                            return {text: r.case_fields[h.fieldId]};
                        }
                    });
            });

        columns.splice(3, 1);
        columns.splice(3, 0, 'state');

        columns.splice(0, 1);
        columns.unshift('case_id');

    }


    caseIdHref(case_jurisdiction, case_type_id, case_id, text){
        return `<a data-selector="case-reference-link" [routerLink]="/jurisdiction/${case_jurisdiction}/casetype/${case_type_id}/viewcase/${case_id}/summary">${text}</a>`;
    }

}
