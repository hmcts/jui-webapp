import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentPanelComponent } from './document-panel.component';

describe('DocumentPanelComponent', () => {
  let component: DocumentPanelComponent;
  let fixture: ComponentFixture<DocumentPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
