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
  
  items : ProdutoDTO[] = [];
  page : number = 0;

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
    this.produtoService.findByCategoria(this.navParams.get('categoria_id'),this.page,10)
      .subscribe(
        response => {
          this.items = this.items.concat(response['content']);
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
    this.items = [];
    this.page = 0;
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }


}
