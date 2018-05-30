import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import {JwtUserModelModel} from './jwtUserModel.model';

@Injectable()
export class JwtDecodeService {
    static decode(authToken: object): JwtUserModelModel {
        return jwtDecode<JwtUserModelModel>(authToken);
    }
}
