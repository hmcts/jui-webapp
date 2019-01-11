import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
export interface CaseStatus {
    actionGoTo: string;
    ID?: string;
    name: string;
}
@Pipe({
    name: 'casestatusgoto'
})
export class CaseStatusGoto implements PipeTransform {

    transform(status: CaseStatus, jurisdiction: string, caseType: string, caseId: string) {

        if ( !(status.hasOwnProperty('actionGoTo')) || !(status instanceof Object) || jurisdiction === '' || caseType === '' || caseId === '') return;
        const  href = status.ID ? `${status.actionGoTo}/${status.ID}` : status.actionGoTo;
        return `/case/${jurisdiction}/${caseType}/${caseId}/${href}`;
    }
}
