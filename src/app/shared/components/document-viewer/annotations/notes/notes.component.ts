import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotesService} from '../notes.service';
import {Note} from '../note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @ViewChild('notesForm') notesForm;
  private _page = 1;
  @Input() numPages = 0;
  @Input() url;

  notes: Note[] = [];
  private _currentNote: Note = new Note();

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes(this.url).then(notes => {
      this.notes = notes;
      this.page = this._page;
    }).catch(console.log);
  }

  @Input() set page(value: number) {
    this._page = value;
    if (!this.notes[this._page - 1]) {
      this.notes[this._page - 1] = new Note('', '', this._page);
    }
    this.currentNote = this.notes[this._page - 1];
  }

  get page(): number {
    return this._page;
  }

  set currentNote(value: Note) {
    this._currentNote = value;
    this.notes[this._page - 1] = this._currentNote;
  }

  get currentNote(): Note {
    return this._currentNote;
  }

  save() {
    this.notesService.saveNote(this.currentNote).subscribe((note) => {
      this._currentNote.url = note.url;
      this.notesForm.form.markAsPristine();
    }, error => {
      console.log(error);
    });
  }

  clear() {
    this.notesService.getNote(this.currentNote).subscribe(note => {
      this.currentNote = note;
      this.notesForm.form.markAsPristine();
    });
  }
}
