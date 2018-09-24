export const pageNoteType = 'PAGENOTE';

export class Note {
  url: string;
  content: string;
  page: number;

  constructor(url = '', content: string = '', page: number = 1) {
    this.url = url;
    this.content = content;
    this.page = page;
  }

  toObject() {
    return {
      page: this.page,
      comments: [{
        content: this.content
      }],
      type: pageNoteType
    };
  }
}

