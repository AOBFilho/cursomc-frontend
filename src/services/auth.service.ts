import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciasDTO } from "../models/credencias.dto";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { LocalUser } from "../models/local_user";

@Injectable()
export class AuthService {

    constructor(public http : HttpClient, 
                public storage : StorageService ){

    }

    authenticate(creds:CredenciasDTO){
        return this.http.post(`${API_CONFIG.urlBase}/login`, creds, {
            observe: "response",
            responseType: "text"
        });
    }

    sucessFulLogin(authorizationValue : string) {
        let tok : string = authorizationValue.substring(7);
        let usr : LocalUser = {
            token : tok
        }
        this.storage.setLocalUser(usr);
    }

    logout(){
        this.storage.setLocalUser(null);
    }
}