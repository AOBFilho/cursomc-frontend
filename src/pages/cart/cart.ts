import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  
  itens : CartItem[];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    this.itens = this.cartService.getCart().itens;
  }

  removeItem(produto : ProdutoDTO){
    this.itens = this.cartService.removeProduto(produto).itens;
  }

  increaseItem(produto : ProdutoDTO){
    this.itens = this.cartService.increaseProduto(produto).itens;
  }

  decreaseItem(produto : ProdutoDTO){
    this.itens = this.cartService.decreaseProduto(produto).itens;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriaPage');
  }
}
