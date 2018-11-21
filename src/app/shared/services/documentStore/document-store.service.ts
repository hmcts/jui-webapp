import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../../config.service';
import {TransferState} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class DocumentStoreService {

  constructor(private http: HttpClient, private configService: ConfigService, private state: TransferState) { }

    convertUrlToProxy(url: string): string {
        const URLsplit = url.split('/');
        const host = URLsplit[0] + '//' + URLsplit[2] + '/';
        return url.replace(host, `${this.configService.config.api_base_url}/api/dm-store/`);
    }

    // TODO: add addtional thing for the postfile thing
    postFile(classification: string, metaDate: Map<string, string>, file: File) {
        const formData: FormData = new FormData();
        formData.append('classification', classification);
        formData.append('files', file, file.name);

        if (metaDate) {
            metaDate.forEach( (v, k) => {
                formData.append('metadata[' + k + ']', v);
                console.log('metadata[' + k + '] = ' + v);
            });
        }
        return this.http.post<any>(`${this.configService.config.api_base_url}/api/dm-store/documents`, formData);
    }

    deleteDocument(url: string) {
        return this.http.delete(url);
    }

    getCreatorDocuments(page: number, sortby: string, order: string, size: number)  {
        return this.http.post<any>(this.getDmFindByCreatorUrlWithParams(page, sortby, order, size), null);
    }

    private getDmFindByCreatorUrlWithParams(page: number, sortby: string, order: string, size: number) {
        return `${this.configService.config.api_base_url}/api/dm-store/documents/owned`
            + '?page=' + page
            + '&sort=' + order + ',' + sortby
            + '&size=' + size;
    }
}
