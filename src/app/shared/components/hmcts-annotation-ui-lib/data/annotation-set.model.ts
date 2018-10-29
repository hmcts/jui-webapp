export interface IComment {
    id: string;
    annotationId: string;
    createdBy: string;
    createdByDetails: {};
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedByDetails: {};
    lastModifiedDate: Date;
    content: string;

    isModified(): boolean;
}

export class Comment implements IComment {
    constructor(
        public id: string,
        public annotationId: string,
        public createdBy: string,
        public createdByDetails: {},
        public createdDate: Date,
        public lastModifiedBy: string,
        public lastModifiedByDetails: {},
        public lastModifiedDate: Date,
        public content: string) {
    }

    public isModified(): boolean {
        if (this.createdDate === null) {
            return false;
        } else if (this.lastModifiedBy === null) {
            return false;
        } else if (this.createdDate === this.lastModifiedDate) {
            return false;
        } else {
            return true;
        }
    }
}

export interface IRectangle {
    id?: string;
    annotationId?: string;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    height?: number;
    width?: number;
    x?: number;
    y?: number;
}

export class Rectangle implements IRectangle {
    constructor(
        public id?: string,
        public annotationId?: string,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
        public height?: number,
        public width?: number,
        public x?: number,
        public y?: number) {
    }
}

export interface IAnnotation {
    id?: string;
    annotationSetId?: string;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    documentId?: string;
    page?: number;
    color?: string;
    comments?: Comment[];
    rectangles?: Rectangle[];
    type?: string;
}

export class Annotation implements IAnnotation {

    constructor(
        public id?: string,
        public annotationSetId?: string,
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
        public documentId?: string,
        public page?: number,
        public color?: string,
        public comments?: Comment[],
        public rectangles?: Rectangle[],
        public type?: string) {
    }
}

export interface IAnnotationSet {
    id: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    documentId: string;
    annotations: Annotation[];
}

export class AnnotationSet implements IAnnotationSet {
    constructor(
        public id: string,
        public createdBy: string,
        public createdDate: Date,
        public lastModifiedBy: string,
        public lastModifiedDate: Date,
        public documentId: string,
        public annotations: Annotation[]) {
    }
}
