import {Component, Input, OnInit} from '@angular/core';
import moment from 'moment';

@Component({
    selector: 'app-case-file-tree-list',
    templateUrl: './case-file-tree-list.component.html',
    styleUrls: ['./case-file-tree-list.component.scss']
})
export class CaseFileTreeListComponent implements OnInit {

    @Input() documents: any;

    constructor() {
    }

    ngOnInit() {
    }

    /**
     * getHumanReadableDate
     *
     * @param isoDate - 2018-11-21T10:39:02+0000
     *
     * @return {string} - 21st Nov 2018, 10:39:02 am
     */
    getHumanReadableDate(isoDate) {
        return moment(isoDate).format('Do MMM YYYY, h:mm:ss a');
    }

}
