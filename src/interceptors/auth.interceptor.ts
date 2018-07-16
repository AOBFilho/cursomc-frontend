import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (public storage : StorageService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();
        let n = API_CONFIG.urlBase.length;
        let requestToApi = req.url.substring(0,n) == API_CONFIG.urlBase;

        if (localUser && requestToApi) {
            const authReq = req.clone({headers : req.headers.set('Authorization','Bearer '+localUser.token)});
            return next.handle(authReq);
        } else {
            return next.handle(req)
        };

    }
}

/**
 * Provider POJO for the interceptor
 */
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};