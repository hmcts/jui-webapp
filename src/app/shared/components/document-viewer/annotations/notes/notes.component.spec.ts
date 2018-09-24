import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';

import {NotesComponent} from './notes.component';
import {DebugElement} from '@angular/core';
import {NotesService} from '../notes.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {UrlFixerService} from '../../../utils/url-fixer.service';
import {Note} from '../note';

const jwt = '12345';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let element: DebugElement;
  let fixture: ComponentFixture<NotesComponent>;
  let httpMock: HttpTestingController;
  const val = '/demproxy/an/annotation-sets';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotesComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [NotesService, UrlFixerService]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NotesComponent);
    httpMock = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    component.url = 'https://doc123';
    fixture.detectChanges();
  }));

  describe('when no notes are loaded', () => {
    beforeEach(() => {
      const req = httpMock.expectOne('/demproxy/an/annotation-sets/filter?url=https://doc123');
      req.flush({
        _embedded: {
          annotationSets: []
        }
      });
      component.page = 0;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialise to page 0', () => {
      expect(component.page).toEqual(0);
    });

    it('should default to 0 pages', () => {
      expect(component.numPages).toEqual(0);
    });

    describe('when there is a note against the current page', () => {
      beforeEach(() => {
        component.currentNote = new Note('', 'A note');
        fixture.detectChanges();
      });

      describe('and we swap to the next page', () => {
        beforeEach(() => {
          component.page = 1;
          fixture.detectChanges();
        });

        it('should update the current note to a blank note', () => {
          expect(component.currentNote.content).toEqual('');
        });

        describe('when we swap back to the previous page', () => {
          beforeEach(() => {
            component.page = 0;
            fixture.detectChanges();
          });

          it('should update the current note to the first page note', () => {
            expect(component.currentNote.content).toEqual('A note');
          });
        });
      });
    });
  });

  describe('when notes are loaded', () => {
    beforeEach(async(() => {
      const req = httpMock.expectOne('/demproxy/an/annotation-sets/filter?url=https://doc123');
      req.flush({
        _embedded: {
          annotationSets: [{
            uuid: '1234',
            annotations: [{
              uuid: '1',
              page: 2,
              type: 'PAGENOTE',
              comments: [{
                content: 'Page 2 note'
              }],
              '_links': {
                self: {
                  href: 'http://test.com/annotation-sets/1234/annotation/1'
                }
              }
            }, {
              uuid: '2',
              page: 1,
              type: 'PAGENOTE',
              comments: [{
                content: 'Page 1 note'
              }],
              '_links': {
                self: {
                  href: 'http://test.com/annotation-sets/1234/annotation/2'
                }
              }
            }, {
              uuid: '3',
              page: 1,
              type: 'COMMENT',
              comments: [{
                content: 'Page 1 comment'
              }],
              '_links': {
                self: {
                  href: 'http://test.com/annotation-sets/1234/annotation/3'
                }
              }
            }],
            '_links': {
              self: {
                href: 'http://test.com/annotation-sets/1234'
              },
              'add-annotation': {
                href: 'http://test.com/annotation-sets/1234/annotation'
              }
            }
          }]
        }
      });
      fixture.detectChanges();
    }));

    it('should filter out the non page note annotations', () => {
      expect(component.notes.length).toBe(2);
    });

    it('should update the current note to the loaded note', () => {
      expect(component.currentNote.content).toEqual('Page 1 note');
    });

    describe('when we change the current note and save', () => {
      let putRequest;

      beforeEach(async(() => {
        component.currentNote.content = 'New page 1 note';
        component.notesForm.form.markAsDirty();
        fixture.detectChanges();
        component.save();

        putRequest = httpMock.expectOne('/demproxy/an/annotation-sets/1234/annotation/2');
        putRequest.flush({}, {status: 200, statusText: 'Good!'});
      }));

      it('should be a put request', () => {
        expect(putRequest.request.method).toEqual('PUT');
      });

      it('should set the form to pristine', () => {
        expect(component.notesForm.form.dirty).toBe(false);
      });
    });

    describe('when we change the current note and cancel', () => {
      let putRequest;

      beforeEach(async(() => {
        component.currentNote.content = 'New page 1 note';
        component.notesForm.form.markAsDirty();
        fixture.detectChanges();
        component.clear();

        putRequest = httpMock.expectOne('/demproxy/an/annotation-sets/1234/annotation/2');
        putRequest.flush({
          uuid: '1',
          page: 1,
          type: 'PAGENOTE',
          comments: [{
            content: ''
          }],
          '_links': {
            self: {
              href: 'http://test.com/annotation-sets/1234/annotation/1'
            }
          }
        });
      }));

      it('should be a get request', () => {
        expect(putRequest.request.method).toEqual('GET');
      });

      it('should reset the content', () => {
        expect(component.currentNote.content).toEqual('');
      });
    });
  });

  describe('when we remove the current note and save', () => {
    let deleteRequest;

    beforeEach(async(() => {
      component.currentNote.content = '';
      component.currentNote.url = '/demproxy/an/annotation-sets/1234/annotation/2';
      component.notesForm.form.markAsDirty();
      fixture.detectChanges();
      component.save();

      deleteRequest = httpMock.expectOne('/demproxy/an/annotation-sets/1234/annotation/2');
      deleteRequest.flush({}, {status: 200, statusText: 'Good!'});
    }));

    it('should be a delete request', () => {
      expect(deleteRequest.request.method).toEqual('DELETE');
    });

    it('should set the form to pristine', () => {
      expect(component.notesForm.form.dirty).toBe(false);
    });

    it('should clear the url from the current note', () => {
      expect(component.currentNote.url).toBe('');
    });
  });

  describe('when we try and load notes but we have no sets', () => {
    beforeEach(async(() => {
      const req = httpMock.expectOne('/demproxy/an/annotation-sets/filter?url=https://doc123');
      req.flush({});
      fixture.detectChanges();
    }));

    beforeEach(async(() => {
      const postReq = httpMock.expectOne('/demproxy/an/annotation-sets');
      postReq.flush({
        uuid: '1234',
          annotations: [],
          '_links': {
          self: {
            href: 'http://test.com/annotation-sets/1234'
          },
          'add-annotation': {
            href: 'http://test.com/annotation-sets/1234/annotation'
          }
        }
      });
      fixture.detectChanges();
    }));

    it('should initialise blank note', () => {
      expect(component.currentNote.content).toBe('');
    });

    describe('when I update the note and save', () => {
      beforeEach(async(() => {
        component.currentNote.content = 'A really great note';
        fixture.detectChanges();
        component.save();
        const postReq = httpMock.expectOne('/demproxy/an/annotation-sets/1234/annotation');
        postReq.flush({
          uuid: '1',
          page: 1,
          type: 'PAGENOTE',
          comments: [{
            content: 'A really great note'
          }],
          '_links': {
            self: {
              href: 'http://test.com/annotation-sets/1234/annotation/1'
            }
          }
        });
      }));

      it('should update the note with the generated url', () => {
        expect(component.currentNote.url).toEqual('/demproxy/an/annotation-sets/1234/annotation/1');
      });
    });

    describe('when I update the note and cancel', () => {
      beforeEach(async(() => {
        component.currentNote.content = 'A rubbish note';
        fixture.detectChanges();
        component.clear();
        const postReq = httpMock.expectNone('/demproxy/an/annotation-sets/1234/annotation');
      }));

      it('should update the note with the generated url', () => {
        expect(component.currentNote.content).toEqual('');
      });
    });
  });

  function newEvent(eventName: string, bubbles = false, cancelable = false) {
    const evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
  }

});
