import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoService } from '../../services/domain/pedido.service';

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItem: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  codigoPedido : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClienteService,
    public pedidoService: PedidoService) {

      this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItem = this.cartService.getCart().itens;
    this.clientService.findById(this.pedido.cliente.id)
      .subscribe(
        response => {
          this.cliente = response as ClienteDTO;  
          this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id,response['enderecos']);
        },
        error => {
          this.navCtrl.setRoot('HomePage');
        }
      )

  }

  private findEndereco(id: String, list: EnderecoDTO[]) : EnderecoDTO {
    return list[list.findIndex(x => x.id == id)];
  }

  total(){
    return this.cartService.total();
  }

  checkout(){
    this.pedidoService.insert(this.pedido)
      .subscribe(
        response => {
          this.cartService.createOrClearCart();
          this.codigoPedido=this.extractIdPedido(response.headers.get('location'));
        },
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
          }
        }
      )
  }

  private extractIdPedido(location:string) : string {
    let position = location.lastIndexOf('/');
    return location.substring(position+1,location.length);
  }

  backPage(){
    this.navCtrl.setRoot('CartPage');
  }

  backPageCategoria(){
    this.navCtrl.setRoot('CategoriaPage');
  }

}
