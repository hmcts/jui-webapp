import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'casestatusgoto'
})
export class CaseStatusGoto implements PipeTransform {

    transform(status, jurisdiction, caseType, caseId) {
        const  href = status.ID ? `${status.actionGoTo}/${status.ID}` : status.actionGoTo;
        return `/jurisdiction/${jurisdiction}/casetype/${caseType}/viewcase/${caseId}/${href}`;
    }
}
