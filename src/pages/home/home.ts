import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciasDTO } from '../../models/credencias.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciasDTO = {
    email : "",
    senha : ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  public login(){
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriaPage');
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  public ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

}
