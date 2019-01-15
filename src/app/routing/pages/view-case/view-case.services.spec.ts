import { TestBed, inject } from '@angular/core/testing';

import { CaseDataService } from './view-case.services';
import { ActivatedRoute } from '@angular/router';

describe('CaseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CaseDataService,
        {
          provide: ActivatedRoute,
          useValue: ({ 
            snapshot: {
              _lastPathIndex: 0,
              url: [{
                  path: 'dummy'
              }],
              data: {
                  caseData: {
                    id: '1234',
                    decision: {
                        options: [
                            { id: 'test', name: 'test' }
                        ]
                    }
                  }
              }
            }
          } as any) as ActivatedRoute
        }
      ]
    });
  });

  it('should be created', inject([CaseDataService], (service: CaseDataService) => {
    expect(service).toBeTruthy();
  }));

  it('should return case data', inject([CaseDataService], (service: CaseDataService) => {
    const resultData = {
      id: '1234',
      decision: {
        options: [
          { id: 'test', name: 'test' }
        ]
      }
    };

    expect(service.getCaseData()).toEqual(resultData);
  }));

  it('should return navigation', inject([CaseDataService], (service: CaseDataService) => {
    const requestData = {
      id: 'obj',
      case_jurisdiction: 'dummy',
      case_type_id: 'dummy',
      sections: [
        {id: 'id1', name: 'name1'},
        {id: 'id2', name: 'name2'}
      ]
    };

    const resultData = [
      {
        href: `/case/dummy/dummy/obj/id1`,
        text: 'name1',
        label: 'name1',
        id: 'id1',
        active: false
      },
      {
        href: `/case/dummy/dummy/obj/id2`,
        text: 'name2',
        label: 'name2',
        id: 'id2',
        active: true
      }
    ];

    expect(service.getNavigation(requestData, 'id2')).toEqual(resultData);
  }));

  it('should find target section', inject([CaseDataService], (service: CaseDataService) => {
    const requestData = {
      id: 'obj',
      case_jurisdiction: 'dummy',
      case_type_id: 'dummy',
      sections: [
        {id: 'id1', name: 'name1'},
        {id: 'id2', name: 'name2'}
      ]
    };

    const resultData = {id: 'id2', name: 'name2'};

    expect(service.findTargetSection(requestData, 'id2')).toEqual(resultData);
  })); 
  
});
