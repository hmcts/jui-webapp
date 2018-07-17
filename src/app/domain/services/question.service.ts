import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config.service';
import 'rxjs/operators/map';

@Injectable()
export class QuestionService {
    constructor(private http: HttpClient, private configService: ConfigService) {
    }

    create(caseId, question) {
        return this.http
           .post(`${this.configService.config.api_base_url}/api/questions/${caseId}`, question);
    }

    save(caseId, question) {
        /**
         * To Do
         */
    }
}
