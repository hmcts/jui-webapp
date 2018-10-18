import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IDocumentTask} from './document-task.model';
import {ApiHttpService} from './api-http.service';

@Injectable()
export class NpaService {

    documentTask: Subject<IDocumentTask>;
    outputDmDocumentId: Subject<string>;

    constructor(private apiHttpService: ApiHttpService) {
        this.outputDmDocumentId = new Subject<string>();
        this.documentTask = new Subject<IDocumentTask>();
    }

    exportPdf(dmDocumentId: string, outputDmDocumentId?: string): Observable<HttpResponse<IDocumentTask>> {
        return this.apiHttpService.documentTask(dmDocumentId, outputDmDocumentId);
    }
}
