import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      { id : "1",
        logradouro : "logradouro 1",
        numero : "1",
        complemento : "complemento 1",
        bairro : "bairro 1",
        cep : "44555111",
        cidade : {
          id : "1",
          nome : "cidade 1",
          estado : {
            id : "1",
            nome : "estado 1"
          }   
        }
      },
      { id : "2",
      logradouro : "logradouro 2",
      numero : "2",
      complemento : "complemento 2",
      bairro : "bairro 2",
      cep : "44555112",
      cidade : {
        id : "2",
        nome : "cidade 2",
        estado : {
          id : "2",
          nome : "estado 2"
        }   
      }
    }
    ];
  }

}
