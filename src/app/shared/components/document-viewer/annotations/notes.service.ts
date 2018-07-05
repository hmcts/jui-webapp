import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UrlFixerService} from '../url-fixer.service';
import {Note, pageNoteType} from './note';

@Injectable()
export class NotesService {

  private annotationSet: any;

  constructor(private httpClient: HttpClient,
              private urlFixer: UrlFixerService) {
  }

  getNotes(url): Promise<Note[]> {
    return this.lookForAnnotationSets(url).then(possibleSet => {
      if (possibleSet) {
        this.annotationSet = possibleSet;
        return this.extractNotes(possibleSet);
      }
      return this.initiateNewSet(url);
    });
  }

  getNote(note: Note): Observable<Note> {
    if (note.url) {
      return this.httpClient.get(note.url, this.getHttpOptions()).map((n) => {
        return this.newNoteFromAnnotation(n);
      });
    }
    note.content = ''; // No URL means it's a new note so just clear the content.
    return new Observable<Note>(observer => {
      observer.next(note);
    });
  }

  saveNote(note: Note): Observable<any> {
    if (note.url) {
      if (note.content) {
        return this.httpClient.put(note.url, note.toObject(), this.getHttpOptions()).map(resp => note);
      }
      return this.httpClient.delete(note.url, this.getHttpOptions()).map(resp => {
        note.url = '';
        return note;
      });
    }
    return this.httpClient.post(this.urlFixer.fixAnno(this.annotationSet._links['add-annotation'].href),
                                note.toObject(),
                                this.getHttpOptions())
      .map(annotation => this.newNoteFromAnnotation(annotation));
  }

  private newNoteFromAnnotation(annotation) {
    return new Note(this.urlFixer.fixAnno(annotation._links.self.href), annotation.comments[0].content, annotation.page);
  }

  private lookForAnnotationSets(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const httpOptions = this.getHttpOptions();
      const annoUrl = `/demproxy/an/annotation-sets/filter?url=${url}`;
      this.httpClient.get<any>(annoUrl, httpOptions).subscribe(response => {
        if (response._embedded && response._embedded.annotationSets && response._embedded.annotationSets.length) {
          resolve(response._embedded.annotationSets[0]);
        } else {
          resolve(null);
        }
      }, reject);
    });
  }

  private extractNotes(set) {
    const notes = set.annotations
      .filter(a => a.type === pageNoteType) // only page notes
      .sort((a, b) => a.page - b.page) // order by page
      .map(annotation => {
        return this.newNoteFromAnnotation(annotation);
      })
      .reduce((acc, current) => {
        acc[current.page - 1] = current;
        return acc;
      }, []);
    return notes;
  }

  private initiateNewSet(url: string) {
    return new Promise((resolve, reject) => {
      const body = {
        documentUri: url,
        annotations: [],
      };
      this.httpClient.post('/demproxy/an/annotation-sets', body, this.getHttpOptions()).subscribe(response => {
          this.annotationSet = response;
          resolve(new Array<Note>());
        },
        reject);
    });
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
  }

}
