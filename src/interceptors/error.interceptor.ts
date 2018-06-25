import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import 'rxjs/add/operator/catch';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    /**
     * Intercepts an outgoing HTTP request, executes it and handles any error that could be triggered in execution.
     * @see HttpInterceptor
     * @param req the outgoing HTTP request
     * @param next a HTTP request handler
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .catch(errorResponse => {
                let errorObj = errorResponse;
                if (errorObj.error){
                    errorObj = errorObj.error;
                }
                if (!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }
                console.log("Erro detectado pelo interceptor: ")
                console.log(errorObj);
                return _throw(errorObj);
            });
    }
}

/**
 * Provider POJO for the interceptor
 */
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};