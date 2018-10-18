export interface IComment {
    id: string;
    annotationId: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    content: string;
}

export class Comment implements IComment {
    constructor(
        public id: string,
        public annotationId: string,
        public createdBy: string,
        public createdDate: Date,
        public lastModifiedBy: string,
        public lastModifiedDate: Date,
        public content: string) {
    }
}

export interface IRectangle {
    id: string;
    annotationId: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    height: number;
    width: number;
    x: number;
    y: number;
}

export class Rectangle implements IRectangle {
    constructor(
        public id: string,
        public annotationId: string,
        public createdBy: string,
        public createdDate: Date,
        public lastModifiedBy: string,
        public lastModifiedDate: Date,
        public height: number,
        public width: number,
        public x: number,
        public y: number) {
    }
}

export interface IAnnotation {
    id: string;
    annotationSetId: string;
    createdBy: string;
    createdDate: Date;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    documentId: string;
    page: 1;
    color: string;
    comments: Comment[];
    rectangles: Rectangle[];
    type: string;
}

export class Annotation implements IAnnotation {

    constructor(
        public id: string,
        public annotationSetId: string,
        public createdBy: string,
        public createdDate: Date,
        public lastModifiedBy: string,
        public lastModifiedDate: Date,
        public documentId: string,
        public page: 1,
        public color: string,
        public comments: Comment[],
        public rectangles: Rectangle[],
        public type: string) {
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