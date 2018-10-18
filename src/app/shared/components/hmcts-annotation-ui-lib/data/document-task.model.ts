export interface IDocumentTask {
    id?: number;
    inputDocumentId?: string;
    outputDocumentId?: string;
    taskState?: string;
    failureDescription?: string;
    createdDate?: string;
    createdBy?: string;
    lastModifiedBy?: string;
    lastModifiedDate?: string;
}

export class DocumentTask implements IDocumentTask {

    constructor(
        public id?: number,
        public inputDocumentId?: string,
        public outputDocumentId?: string,
        public taskState?: string,
        public failureDescription?: string,
        public createdDate?: string,
        public createdBy?: string,
        public lastModifiedBy?: string,
        public lastModifiedDate?: string) {
    }
}



