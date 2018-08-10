import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor (public http: HttpClient){}

    findByCategoria(categoria_id:string, page: number = 0, linesPerPage: number = 24){
        return this.http.get(`${API_CONFIG.urlBase}/produtos?categorias=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    findById(produto_id:string){
        return this.http.get<ProdutoDTO>(`${API_CONFIG.urlBase}/produtos/${produto_id}`);
    }
}