import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciasDTO } from "../models/credencias.dto";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService {

    constructor(public http: HttpClient){

    }

    authenticate(creds:CredenciasDTO){
        return this.http.post(`${API_CONFIG.urlBase}/login`, creds, {
            observe: "response",
            responseType: "text"
        });
    }
}