import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IDocumentTask} from './document-task.model';
import {ApiHttpService} from './api-http.service';
import { EmLoggerService } from '../logging/em-logger.service';

@Injectable()
export class NpaService {

    documentTask: Subject<IDocumentTask>;
    outputDmDocumentId: Subject<string>;

    constructor(private log: EmLoggerService,
                private apiHttpService: ApiHttpService) {
        log.setClass('NpaService');
        this.outputDmDocumentId = new Subject<string>();
        this.documentTask = new Subject<IDocumentTask>();
    }

    exportPdf(dmDocumentId: string, outputDmDocumentId: string, baseUrl: string): Observable<HttpResponse<IDocumentTask>> {
        this.log.info('Calling HTTP service for NPA');
        return this.apiHttpService.documentTask(dmDocumentId, outputDmDocumentId, baseUrl);
    }
}
