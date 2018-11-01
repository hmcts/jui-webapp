import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {ConfigService} from '../../config.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class DecisionService {
    constructor(
            private httpClient: HttpClient,
            private configService: ConfigService
    ) { }

    generateDecisionUrl( jurId: string, caseId: string, pageId: string ) {
        return `${this.configService.config.api_base_url}/api/decisions/state/${jurId}/${caseId}/${pageId}`;
    }

    fetch(jurId:string, caseId: string, pageId: string): Observable<any> {
        const url = this.generateDecisionUrl(jurId, caseId, pageId);
      //  console.log('fetch', url);
        return this.httpClient.get(url);
    }

    submitDecisionDraft(jurId: string, caseId: string, pageId: string, body: any): Observable<any> {
        const url = this.generateDecisionUrl(jurId, caseId, pageId);
        console.log('Submit', url, jurId, caseId, pageId, body);
        return this.httpClient.post(url, body);
    }

    updateDecisionDraft(caseId: string, award: string, text: string) {
        const url = this.generateDecisionUrl('fr', caseId, 'create');
        const body = {
            decision_award: award,
            decision_header: award,
            decision_reason: text,
            decision_text: text,
            decision_state: 'decision_drafted'
        };
        return this.httpClient.put(url, body);
    }

    issueDecision(caseId: string, decision: any): Observable<any>  {
        const url = this.generateDecisionUrl('fr', caseId, 'create');

        const body = {
            decision_award: decision.decision_award,
            decision_header: decision.decision_header,
            decision_reason: decision.decision_reason,
            decision_text: decision.decision_text,
            decision_state: 'decision_issue_pending'
        };
        return this.httpClient.put(url, body);
    }

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
