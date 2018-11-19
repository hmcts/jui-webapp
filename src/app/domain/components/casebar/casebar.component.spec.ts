// import {async, ComponentFixture, TestBed} from '@angular/core/testing';
// import {CaseBarComponent} from './casebar.component';
// import {SharedModule} from '../../../shared/shared.module';
// import {DomainModule} from '../../domain.module';
// import {CaseService} from '../../services/case.service';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {ConfigService} from '../../../config.service';
// import {BrowserTransferStateModule} from '@angular/platform-browser';
// import {RouterTestingModule} from '@angular/router/testing';
// import {Selector} from '../../../../../test/selector-helper';
// import {mockCaseBar} from './mock/case.mock';
// import {caseApi} from '../../../enviorment.mock';
// import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
//
// const caseUrl = caseApi;
// const configMock = {
//     config: {
//         api_base_url: ''
//     }
// };
//
// describe('CaseBarComponent', () => {
//     let component: CaseBarComponent;
//     let fixture: ComponentFixture<CaseBarComponent>;
//     let httpMock: HttpTestingController;
//     let nativeElement;
//     let element;
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [],
//             imports: [
//                 DomainModule,
//                 SharedModule,
//                 BrowserTransferStateModule,
//                 HttpClientTestingModule,
//                 RouterTestingModule
//             ],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             providers: [
//                 CaseService,
//                 {
//                     provide: ConfigService,
//                     useValue: configMock
//                 }
//             ]
//         })
//             .compileComponents();
//     }));
//
//     beforeEach(() => {
//         fixture = TestBed.createComponent(CaseBarComponent);
//         component = fixture.componentInstance;
//         component.case = mockCaseBar.data.caseData;
//         component.case.id = '1244';
//         element = fixture.debugElement;
//         nativeElement = fixture.nativeElement;
//         httpMock = TestBed.get(HttpTestingController);
//         fixture.detectChanges();
//     });
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
//
//
//     fdescribe('Setting inputs', () => {
//
//
//
//
//         it('should set a DataList Component for each section in panelData', () => {
//             expect(element.nativeElement.querySelectorAll(Selector.selector('data-casebar-details-component')).length)
//                 .toBe(1);
//         });
//
//         it(`should set the DataList Component's title to the sections name`, () => {
//             const actualDetails = element.nativeElement.querySelectorAll(Selector.selector('data-casebar-details-component'));
//             expect(actualDetails.textContent)
//                 .toEqual(component.case.details.fields[0].value);
//         });
//
//         it(`should set the DataList Component's title to the sections name`, () => {
//             const actualTitles = element.nativeElement.querySelectorAll(Selector.selector('data-casebar-title-component'));
//             expect(actualTitles.textContent)
//                 .toEqual(component.case.details.fields[1].value);
//         });
//     });
//
//
// });
