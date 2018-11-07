import {Component, Input, OnInit, OnChanges} from '@angular/core';
import { Observable, EMPTY } from 'rxjs';

@Component({
  selector: 'app-fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldsetComponent implements OnInit, OnChanges {
    @Input() classes;
    @Input() validate;
    @Input() group;
    @Input() data;
    @Input() childrenOf;

    constructor() {}

    ngOnInit() {
        // this.showChilds.subscribe( (value) => {
        //     this.showChilds = value;
        //     console.log(value);
        // });
    }
    ngOnChanges() {
      //  console.log(this.showChilds, this.childrenOf);
    }
}
