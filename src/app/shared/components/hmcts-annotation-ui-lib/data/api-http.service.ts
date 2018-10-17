import {Observable} from 'rxjs';
import {HttpResponse, HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {IDocumentTask} from './document-task.model';
import {Annotation, IAnnotation, IAnnotationSet} from './annotation-set.model';

@Injectable()
export class ApiHttpService {
    private baseUrl = '/api';

    constructor(private httpClient: HttpClient) {
    }

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getBaseUrl(): string {
        return this.baseUrl;
    }

    createAnnotationSet(baseUrl, body): Observable<HttpResponse<IAnnotationSet>> {
        return this.httpClient.post<IAnnotationSet>(`${baseUrl}/em-anno/annotation-sets`,
            body, {observe: 'response'});
    }

    fetch(baseUrl, dmDocumentId): Observable<HttpResponse<IAnnotationSet>> {
        const url = `${baseUrl}/em-anno/annotation-sets/${dmDocumentId}`;
        return this.httpClient.get<IAnnotationSet>(url, {observe: 'response'});
    }

    documentTask(dmDocumentId, outputDmDocumentId): Observable<HttpResponse<IDocumentTask>> {
        const url = `${this.baseUrl}/em-npa/document-tasks`;
        const documentTasks = {
            inputDocumentId: dmDocumentId,
            outputDocumentId: outputDmDocumentId
        };
        return this.httpClient.post<IDocumentTask>(url, documentTasks, {observe: 'response'});
    }

    deleteAnnotation(annotation: Annotation): Observable<HttpResponse<IAnnotation>> {
        const url = `${this.baseUrl}/em-anno/annotations/${annotation.id}`;
        return this.httpClient.delete<IAnnotation>(url, {observe: 'response'});
    }

    saveAnnotation(annotation: Annotation): Observable<HttpResponse<IAnnotation>> {
        const url = `${this.baseUrl}/em-anno/annotations`;
        return this.httpClient.post<IAnnotation>(url, annotation, {observe: 'response'});
    }
}
