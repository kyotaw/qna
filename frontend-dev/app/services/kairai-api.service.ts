import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { environment } from '../../environments/environment';

@Injectable()
export class KairaiApiService {

    private readonly baseUrl = environment.APISERVER_URL + 'api/';

    constructor(private http: HttpClient) {}

    getQnAs(kbId: string, environment: string): Observable<Object> {
        const url = this.baseUrl + 'qnas';
        return this._get(url, { kbId: kbId, environment: environment });
    }

    signUp(email: string, password: string) {
        const url = this.baseUrl + 'auth/signup';
        return this._post(url, {email: email, password: password});
    }

    certificate(certCode: string) {
        const url = this.baseUrl + 'users/certification';
        return this._post(url, {certCode: certCode});
    }

    deleteUser(userId: string) {
        const url = this.baseUrl + 'users/' + userId;
        return this._delete(url);
    }

    login(email: string, password: string) {
        const url = this.baseUrl + 'auth/login';
        return this._get(url, {email: encodeURIComponent(email), password: encodeURIComponent(password)});
    }

    isLoggedIn(accessToken: string) {
        const url = this.baseUrl + 'auth/loggedin';
        return this._get(url, { accessToken: accessToken });
    }

    socialLogin(socialSystem: string) {
    const url = 'https://kairai.herokuapp.com/api/auth/' + socialSystem + '/login';
        return this._get(url);
    }

    updatePassword(curPassword: string, newPassword: string) {
        const url = this.baseUrl + 'users/password';
        return this._put(url, {currentPassword: curPassword, newPassword: newPassword});
    }

    _get(url, params={}) {
        const options = {
            params: params,
            withCredentials: true
        }
        return this.http.get(url, options);
    }

    _post(url, params) {
        const options = {
            withCredentials: true
        }
        return this.http.post(url, params, options);
    }

    _put(url, params) {
        const options = {
            withCredentials: true
        }
        return this.http.put(url, params, options); 
    }

    _delete(url) {
        const options = {
            withCredentials: true
        }
        return this.http.delete(url, options);
    }
}
