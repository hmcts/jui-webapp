import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-document-panel',
    templateUrl: './document-panel.component.html',
    styleUrls: ['./document-panel.component.scss']
})
export class DocumentPanelComponent implements OnInit {

    @Input()
    panelData;
    documents: Array<Object>;

    constructor(/*private dmStoreService: DMStoreService*/) { }

    ngOnInit() {
        this.documents = this.panelData.fields[0].value[0];

        // console.log('panelData', this.panelData);
        // this.docURL = this.dmStoreService
        //                 .getMime(this.panelData.id);
        // console.log('this.data', this.docURL);
    }
}
