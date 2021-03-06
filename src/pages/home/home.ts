import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciasDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';

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

  constructor(public navCtrl: NavController, public menu: MenuController, public auth:AuthService) {

  }

  public signup(){
    this.navCtrl.push('SignupPage');
  }
  
  public login(){
    this.auth.authenticate(this.creds).subscribe(
      response => {
        this.auth.sucessFulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriaPage');
      },
      error => {

      }
    )
  }

  public ionViewDidEnter(){
    this.auth.refreshToken().subscribe(
      response => {
        this.auth.sucessFulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriaPage');
      },
      error => {

      }
    )
  }

  public ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  public ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

}
