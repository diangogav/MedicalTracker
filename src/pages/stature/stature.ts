import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { WeightPage } from '../weight/weight';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the StaturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stature',
  templateUrl: 'stature.html',
})
export class StaturePage {
  stature;
  personalData = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebasedatabase: FirebaseDbProvider,
    private dataUser: DataProvider
  ) 
    {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StaturePage');
  }

  saveStature(){
    this.personalData = {
      stature: this.stature
    }

    this.dataUser.setStature(this.stature);
    this.navCtrl.push(WeightPage);

    /*this.firebasedatabase.savePersonalData(this.personalData).then(res=>{
      console.log('Stature guardado en firebase');
      this.navCtrl.push(WeightPage);
    })*/


  }

}
