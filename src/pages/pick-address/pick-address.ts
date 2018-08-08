import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];
  pedido : PedidoDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService : ClienteService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email)  {
      this.clienteService.findByEmailToClienteDTO(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];
          
          this.pedido = {
            cliente : {id : response.id},
            enderecoDeEntrega : null,
            itens : this.cartService.getCart().itens.map(x => { return {quantidade : x.quantidade, produto : {id : x.produto.id}}}),
            pagamento : null
          }
        },
        error => {this.goHomePage()})
    } else {
      this.goHomePage();
    }
  }
  
  goHomePage(){
    this.navCtrl.setRoot('HomePage');
  }

  nextPage(item : EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id : item.id};
    this.navCtrl.push('PaymentPage',{pedido:this.pedido});
  }
}
