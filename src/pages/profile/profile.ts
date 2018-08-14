import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  picture : string;
  cameraOn : boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage : StorageService,
    public clienteService : ClienteService,
    public camera: Camera) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email)  {
      this.clienteService.findByEmailToClienteDTO(localUser.email)
        .subscribe(response => {
          this.cliente = response
        },
        error => {this.goHomePage()})
    } else {
      this.goHomePage();
    }
  }

  goHomePage(){
    this.navCtrl.setRoot('HomePage');
  }

  getCamera(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options)
    .then((imageData) => {
      this.cameraOn = false;
      this.picture = 'data:image/png;base64,' + imageData;
    }, (err) => {
      this.cameraOn = false; 
    });
  }

}
