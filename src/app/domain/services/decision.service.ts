import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {ConfigService} from '../../config.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DecisionService {
    constructor(
            private httpClient: HttpClient,
            private configService: ConfigService
    ) { }

    generateDecisionUrl( jurId: string, caseId: string, pageId: string, caseType: string ) {
        return `${this.configService.config.api_base_url}/api/decisions/state/${jurId}/${caseType}/${caseId}/${pageId}`;
    }

    fetch(jurId: string, caseId: string, pageId: string, caseType: string): Observable<any> {

        const url = this.generateDecisionUrl(jurId, caseId, pageId, caseType);
        return this.httpClient.get(url);
    }

    submitDecisionDraft(jurId: string, caseId: string, pageId: string, caseType: string, body: any): Observable<any> {
        const url = this.generateDecisionUrl(jurId, caseId, pageId, caseType);
        return this.httpClient.post(url, body);
    }

    issueDecision(decision: any): void  {}
    findConsentOrderDocumentUrl(caseData): string {
        try {
            return caseData.sections
                .filter(s => s.id === 'casefile')[0].sections
                .filter(s => s.id === 'documents')[0].fields
                .filter(f => f.label === 'consentOrder')[0].value[0].document_url;
        } catch (e) {
            console.error('Could not retrieve consent order document URL');
        }
        return null;
    }

    findConsentOrderDocumentId(caseData): string {
        const documentUrl: string = this.findConsentOrderDocumentUrl(caseData);
        return documentUrl ? documentUrl.substring(documentUrl.lastIndexOf('/') + 1, documentUrl.length) : null;
    }

}
