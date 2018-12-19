import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-custombuttons',
  templateUrl: './custombuttons.component.html',
  styleUrls: ['./custombuttons.component.scss']
})
export class CustombuttonsComponent implements OnInit {


  @Input() label;


  constructor() { }

  ngOnInit() {
  }

}
