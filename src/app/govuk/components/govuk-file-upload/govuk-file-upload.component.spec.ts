import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovukFileUploadComponent } from './govuk-file-upload.component';

describe('GovukFileUploadComponent', () => {
  let component: GovukFileUploadComponent;
  let fixture: ComponentFixture<GovukFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovukFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovukFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
