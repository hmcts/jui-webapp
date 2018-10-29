import { Injectable } from '@angular/core';

@Injectable()
export class UrlFixerService {
  public fixDm(url: string, baseUrl: string): string {
    return url.replace(/http.*\/documents\//, `${baseUrl}/documents/`);
  }
}
