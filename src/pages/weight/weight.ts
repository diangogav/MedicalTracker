import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { AgePage } from '../age/age';

/**
 * Generated class for the WeightPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weight',
  templateUrl: 'weight.html',
})
export class WeightPage {
  weight;
  personalData = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebasedatabase: FirebaseDbProvider,
    private dataUser: DataProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeightPage');
  }

  saveWeight(){
    this.personalData = {
      weight: this.weight,
    }

    this.dataUser.setWeight(this.weight);
    this.navCtrl.push(AgePage);


    /*this.firebasedatabase.savePersonalData(this.personalData).then(res=>{
      console.log('Gender guardado en firebase');
      this.navCtrl.push(StaturePage);
    })*/


  }

}
