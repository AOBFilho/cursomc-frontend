import { HttpClient } from "@angular/common/http";
import { StorageService } from "../storage.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService {
    
    constructor(public http : HttpClient, public storage : StorageService){}

    public findByEmail(email : string) : Observable<ClienteDTO>{
        return this.http.get<ClienteDTO>(`${API_CONFIG.urlBase}/clientes/email?value=${email}`);
    }

}