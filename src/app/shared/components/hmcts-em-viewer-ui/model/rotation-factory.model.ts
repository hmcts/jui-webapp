export interface IRotationModel {
    pageNumber: number;
    pageDom: any;
}

export class RotationModel implements IRotationModel {
    constructor(public pageNumber: number,
                public pageDom: any) {}
}
