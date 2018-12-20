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
        return `${this.configService.config.api_base_url}/api/decisions/${caseId}/hearing/relist`;
    }

    getHearingUrl(caseId: string) {
        return `${this.configService.config.api_base_url}/api/decisions/${caseId}/hearing`;
    }

    changeMessage(message: string) {
        this.messageSource.next(message);
    }

    listForHearing(caseId: string, relistReason: string, relistState: string): Observable<any> {
        const url = this.generateHearingsUrl(caseId);

        const body = {
            state: relistState,
            reason: relistReason,
        };

        return this.httpClient.put(url, body);
    }

    /**
     * getHearing
     *
     * Retrieves the hearing so that we can pull off the draft information.
     *
     * @param caseId
     * @return {Observable<Object>}
     */
    getHearing(caseId: string): Observable<any> {

        const url = this.getHearingUrl(caseId);

        return this.httpClient.get(url);
    }
}
