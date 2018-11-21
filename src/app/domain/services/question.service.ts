import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import 'rxjs/operators/map';

@Injectable()
export class QuestionService {
    constructor(private http: HttpClient, private configService: ConfigService, private state: TransferState) {
    }

    private fetchWithUrl(url): Observable<any> {
        const key = makeStateKey(url);
        const cache = this.state.get(key, null as any);

        if (cache) { return of(cache); }

        return this.http.get(url)
            .pipe(map(data => {
                this.state.set(key, data);
                return data;
            }));
    }

    fetch(caseId, questionId): Observable<Object> {
        const url = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/questions/${questionId}`;
        return this.fetchWithUrl(url);
    }

    fetchAll(caseId): Observable<any[]> {
        const url = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/questions`;
        return this.fetchWithUrl(url);
    }

    create(caseId, question) {
        const xUrl = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/questions`;
        return this.http.post(xUrl, question);
    }

    update(caseId, questionId, question) {
        const xUrl = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/questions/${questionId}`;
        return this.http.put(xUrl, question);
    }

    remove(caseId, questionId) {
        const xUrl = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/questions/${questionId}`;
        return this.http.delete(xUrl);
    }

    sendQuestions(caseId, roundId) {
        const xUrl = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/rounds/${roundId}`;
        return this.http.put(xUrl, {});
    }

    fetchRound(caseId, roundId): any {
        const xUrl = `${this.configService.config.api_base_url}/api/caseQ/${caseId}/rounds/${roundId}`;
        return this.http.get(xUrl);
    }
}
