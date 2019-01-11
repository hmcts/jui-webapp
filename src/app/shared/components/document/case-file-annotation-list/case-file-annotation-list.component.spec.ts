import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseFileAnnotationListComponent } from './case-file-annotation-list.component';
import {Selector} from '../../../selector-helper';

describe('CaseFileAnnotationListComponent', () => {
  let component: CaseFileAnnotationListComponent;
  let fixture: ComponentFixture<CaseFileAnnotationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseFileAnnotationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseFileAnnotationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should be created by angular', () => {
        expect(fixture).not.toBeNull();
    });
    it('Data-selectors: Author', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector(Selector.selector('author')).textContent).toContain('Judge Prita Shah');
        expect(fixture.debugElement.nativeElement.querySelector(Selector.selector('timestamp')).textContent).toContain('23 August 2018 at 4:48pm');
        expect(fixture.debugElement.nativeElement.querySelector(Selector.selector('comment-content')).textContent).toContain('Please provide more details on the contents of family home.');
        expect(fixture.debugElement.nativeElement.querySelector(Selector.selector('edit')).textContent).toContain('Edit');
        expect(fixture.debugElement.nativeElement.querySelector(Selector.selector('delete')).textContent).toContain('Delete');
    });
    it('Edit button should be type of submit', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.nativeElement.querySelector(Selector.selector('edit')).getAttribute('type') === 'submit').toBeTruthy();
    });

});
