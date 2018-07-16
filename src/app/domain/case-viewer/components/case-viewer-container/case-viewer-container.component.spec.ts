import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseViewerContainerComponent } from './case-viewer-container.component';
import {RouterTestingModule} from '@angular/router/testing';
import {CaseViewerModule} from '../../case-viewer.module';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/observable/of';
import {CaseViewerComponent} from '../case-viewer/case-viewer.component';
import {SummaryPanelComponent} from '../summary-panel/summary-panel.component';

describe('CaseViewerContainerComponent', () => {
  let component: CaseViewerContainerComponent;
  let fixture: ComponentFixture<CaseViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [],
        imports: [CaseViewerModule, RouterTestingModule],
        providers: [
            {
                provide: ActivatedRoute, useValue: {
                    parent: {
                        params: Observable.of({caseid: '1234'}),
                        snapshot: {
                            data: {
                                caseData: {
                                    sections: []
                                }
                            }
                        }
                    },
                    params: Observable.of({caseid: '1234'})
                }
            }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
