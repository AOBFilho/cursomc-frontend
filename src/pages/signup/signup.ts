import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup : FormGroup;
  estados : EstadoDTO[];
  cidades : CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder : FormBuilder,
    public estadoService : EstadoService,
    public cidadeService : CidadeService,
    public clienteService : ClienteService,
    public alterCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome : ['teste', [Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
        email : ['', [Validators.required,Validators.email]],
        tipo : ['0', [Validators.required]],
        cpfOuCnpj : ['', [Validators.minLength(11), Validators.maxLength(14)]],
        senha : ['', [Validators.required]],
        logradouro : ['', [Validators.required]],
        numero : ['', [Validators.required]],
        complemento : ['',[]],
        bairro : ['', [Validators.required]],
        cep : ['', [Validators.required]],
        telefone1 : ['', [Validators.required]],
        telefone2 : ['',[]],
        telefone3  : ['',[]],
        estadoId : [null,[Validators.required]],
        cidadeId : [null,[Validators.required]]
      });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }
  
  updateCidades(){
    this.cidadeService.findAll(this.formGroup.value.estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {});
  }

  signupUser(){
    this.clienteService.insert(this.formGroup.value)
      .subscribe( response => {
                    this.showAlertInsertOk();
                  },
                  error => {}
      );
  }

  showAlertInsertOk(){
    let alert = this.alterCtrl.create({
      title: "Sucesso!",
      message : "Inclusão efetuada com sucesso",
      enableBackdropDismiss: false,
      buttons : [{
        text : "Ok",
        handler : () => {
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }

}
