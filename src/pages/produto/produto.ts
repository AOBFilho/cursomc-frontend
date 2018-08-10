import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto',
  templateUrl: 'produto.html',
})
export class ProdutoPage {
  
  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let loading = this.presentLoadingDefault();
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'))
      .subscribe(
        response => {
          this.items = response['content'];
          loading.dismiss();
        },
        error => {
          loading.dismiss();
        }
      );
  }

  showDetail(produto_id : string){
    this.navCtrl.push('ProdutoDetailPage',{ produto_id : produto_id});
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    return loading;
  }
  
  doRefresh(refresher) {
    setTimeout(() => {
      this.loadData();
      refresher.complete();
    }, 1000);
  }

}
