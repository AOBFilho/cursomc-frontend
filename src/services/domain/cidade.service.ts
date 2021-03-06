import { HttpClient } from "@angular/common/http";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CidadeService {

    constructor(public http : HttpClient){    }

    findAll(estado_id: string) : Observable<CidadeDTO[]>{
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.urlBase}/estados/${estado_id}/cidades`);
    }
}