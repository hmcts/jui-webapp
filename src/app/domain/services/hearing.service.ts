import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config.service';

@Injectable({
    providedIn: 'root'
})
export class HearingService {
    private messageSource = new BehaviorSubject('');
    currentMessage = this.messageSource.asObservable();

    constructor(private httpClient: HttpClient, private configService: ConfigService) { }

    generateHearingsUrl(caseId: string) {
        return `${this.configService.config.api_base_url}/api/hearings/${caseId}`;
    }

    changeMessage(message: string) {
        this.messageSource.next(message);
    }

    listForHearing(caseId: string, relist_reason: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);

        const body = {
            online_hearing_state: 'continuous_online_hearing_relisted',
            reason: relist_reason,
        };

        return this.httpClient.post(url, body);
    }
}
