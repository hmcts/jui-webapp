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
        return `${this.configService.config.api_base_url}/api/ccd/${caseId}/hearing/list`;
    }

    getHearingUrl(caseId: string) {
        return `${this.configService.config.api_base_url}/api/decisions/${caseId}/hearing`;
    }

    changeMessage(message: string) {
        this.messageSource.next(message);
    }

    listForHearing(caseId: string, relistReason: any): Observable<any> {
        const url = this.generateHearingsUrl(caseId);
        return this.httpClient.put(url, relistReason);
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


    generateHearingUrl( jurId: string, caseId: string, pageId: string, caseType: string ) {
        // TODO: needs its own api endpoint, not decisions. And maybe no state
        return `${this.configService.config.api_base_url}/api/decisions/state/${jurId}/${caseType}/${caseId}/${pageId}`;
    }

    fetch(jurId: string, caseId: string, pageId: string, caseType: string): Observable<any> {
        const url = this.generateHearingUrl(jurId, caseId, pageId, caseType);
        return this.httpClient.get(url);
    }

    submitHearingDraft(jurId: string, caseId: string, pageId: string, caseType: string, body: any): Observable<any> {
        const url = this.generateHearingUrl(jurId, caseId, pageId, caseType);
        return this.httpClient.post(url, body);
    }

}
