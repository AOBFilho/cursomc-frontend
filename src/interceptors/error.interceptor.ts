import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular';
import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  
    constructor ( public storage : StorageService,
                  public alertControl : AlertController){}

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

                switch(errorObj.status){
                    case 401 :
                        this.handle401();
                        break;
                    case 403 :
                        this.handle403();
                        break;
                    case 422 :
                        this.handle422(errorObj);
                        break;
                    default :
                        this.handleDefaultError(errorObj);
                        break;
                }
                
                return Observable.throw(errorObj);
            }) as any;

    }

    handle403(){
        this.storage.setLocalUser(null);
    }

    handle401(){
        let alert = this.alertControl.create({
            title : 'Erro 401: falha na autenticação',
            message : 'Email ou senha inválido',
            enableBackdropDismiss : false,
            buttons : [
                {text : 'ok'}
            ]
        }); 
        alert.present();
    }

    handle422(errorObj){
        let alert = this.alertControl.create({
            title : "Erro de validação",
            message : this.listErrors(errorObj.errors),
            enableBackdropDismiss : false,
            buttons : [{
                text : "Ok"
            }]
        });
        alert.present();
    }

    listErrors(errors : FieldMessage[]) : string{
        return errors.reduce((acumulado,elemento) => acumulado + `<p><strong>${elemento.fieldName}</strong>:${elemento.message}</p>`,"");
    }

    handleDefaultError(errorObj){
        let alert = this.alertControl.create({
            title : `Erro ${errorObj.status} : ${errorObj.error}`,
            message : errorObj.message,
            enableBackdropDismiss : false,
            buttons : [
                {text : 'ok'}
            ]
        }); 
        alert.present();
    }

}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};