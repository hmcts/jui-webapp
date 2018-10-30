export interface IComment {
    id: string;
    annotationId: string;
    createdBy: string;
    createdByDetails: IdamDetails;
    createdDate: any;
    lastModifiedBy: string;
    lastModifiedByDetails: IdamDetails;
    lastModifiedDate: any;
    content: string;
  }

  export class Comment implements IComment {
    constructor(
      public id: string,
      public annotationId: string,
      public createdBy: string,
      public createdByDetails: IdamDetails,
      public createdDate: any,
      public lastModifiedBy: string,
      public lastModifiedByDetails: IdamDetails,
      public lastModifiedDate: any,
      public content: string) {
    }
  }

  export interface IRectangle {
    id?: string;
    annotationId?: string;
    createdBy?: string;
    createdByDetails?: IdamDetails;
    createdDate?: any;
    lastModifiedBy?: string;
    lastModifiedByDetails?: IdamDetails;
    lastModifiedDate?: any;
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
      public createdByDetails?: IdamDetails,
      public createdDate?: any,
      public lastModifiedBy?: string,
      public lastModifiedByDetails?: IdamDetails,
      public lastModifiedDate?: any,
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
    createdByDetails?: IdamDetails;
    createdDate?: any;
    lastModifiedBy?: string;
    lastModifiedByDetails?: IdamDetails;
    lastModifiedDate?: any;
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
      public createdDate?: any,
      public createdByDetails?: IdamDetails,
      public lastModifiedBy?: string,
      public lastModifiedByDetails?: IdamDetails,
      public lastModifiedDate?: any,
      public documentId?: string,
      public page?: number,
      public color?: string,
      public comments?: Comment[],
      public rectangles?: Rectangle[],
      public type?: string) {
    }
  }

  export class IdamDetails {
    constructor(
      public forename: string,
      public surname: string,
      public email: string
    ) {}
  }

  export interface IAnnotationSet {
    id: string;
    createdBy: string;
    createdByDetails: IdamDetails;
    createdDate: any;
    lastModifiedBy: string;
    lastModifiedByDetails: IdamDetails;
    lastModifiedDate: any;
    documentId: string;
    annotations: Annotation[];
  }

  export class AnnotationSet implements IAnnotationSet {
    constructor(
      public id: string,
      public createdBy: string,
      public createdByDetails: IdamDetails,
      public createdDate: any,
      public lastModifiedBy: string,
      public lastModifiedByDetails: IdamDetails,
      public lastModifiedDate: any,
      public documentId: string,
      public annotations: Annotation[]) {
    }
  }
