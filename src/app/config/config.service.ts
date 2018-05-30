import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from './config.model';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigService {

    private config: Config;

    constructor(
        private http: HttpClient
    ) {}

    public load(): Promise<void> {
        const configUrl = environment.config;

        return new Promise<void>((resolve, reject) => {
            this.http
                .get(configUrl)
                .subscribe((config: Config) => {
                    this.config = config;
                    resolve();
                }, error => {
                    reject();
                    return Observable.throw(error.json().error || 'Server error');
                });
        });
    }

    public getLoginUrl(): string {
        return this.config.login_url;
    }

    getOauth2CallbackTokenEndpoint(): any {
        return this.config.oauth2_callback_token_endpoint;
    }

    getOauth2CallbackTokenEndpointBackend(): any {
        return this.config.oauth2_callback_token_endpoint_backend;
    }

    getOauth2ClientId(): any {
        return this.config.oauth2_client_id;
    }

    public getDmStoreAppLocalUrl(): string {
        return this.config.dm_store_app_local_endpoint;
    }

    public getEmAnnoAppLocalUrl(): string {
        return this.config.em_anno_app_local_endpoint;
    }

    public getEmRedactAppLocalUrl(): string {
        return this.config.em_redact_app_local_endpoint;
    }

    public getDmStoreUploadUrl(): string {
        return this.config.dm_upload_url;
    }

    public getDmStoreSearchCreatorUrl(): string {
        return this.config.dm_find_documents_by_creator_url;
    }

    public getDmStoreSearchMetadataUrl(): string {
        return this.config.dm_find_documents_by_metadata_url;
    }

}
