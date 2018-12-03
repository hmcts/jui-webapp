export interface IPdfPage {
    rotate?: number;
  }

export class PdfPage implements IPdfPage {
    constructor(
      public rotate: number) {
    }
  }

