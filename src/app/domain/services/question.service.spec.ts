import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../../config.service';
import { QuestionService } from './question.service';
import { HttpClientModule, HttpRequest, HttpParams } from '@angular/common/http';

const configMock = {
    config: {
        api_base_url: ''
    }
};

describe('QuestionService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                QuestionService,
                {
                    provide: ConfigService,
                    useValue: configMock
                }
            ]
        });
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    describe('#create', () => {
        const caseId = '1234';
        const formData = {
            subject: 'What are you doing?',
            question: 'Please describe what you are doing.'
        };

        xit(`should send an expected login request`, async(inject([
                QuestionService,
                HttpTestingController
            ],
            (service: QuestionService, backend: HttpTestingController) => {
                service.create(caseId, formData).subscribe(res => {
                    backend.expectOne((req: HttpRequest<any>) => {
                        return req.url === `/api/questions/${caseId}`
                            && req.method === 'POST'
                            && req.body.toString() === formData.toString();
                    }, `POST to '/api/questions/${caseId}' with subject & question`);
                });
            }))
        );

        xit(`should emit 'false' for 401 Unauthorized`, async(inject([
                QuestionService,
                HttpTestingController
            ],
            (service: QuestionService, backend: HttpTestingController) => {
                expect(service.create(caseId, formData))
                    .toBeFalsy();

                backend.expectOne(`/api/questions/${caseId}`)
                       .flush(null, {
                           status: 401,
                           statusText: 'Unauthorized'
                       });
            }))
        );

        xit(`should emit 'true' for 200 Ok`, async(inject([
                QuestionService,
                HttpTestingController
            ],
            (service: QuestionService, backend: HttpTestingController) => {
                expect(service.create(caseId, formData))
                    .toBeTruthy();

                backend.expectOne(`/api/questions/${caseId}`)
                       .flush(null, {
                           status: 200,
                           statusText: 'Ok'
                       });
            }))
        );
    });
});
