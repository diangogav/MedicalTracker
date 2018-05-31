import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { DataProvider } from '../../providers/data/data';
import { StaturePage } from '../stature/stature';

/**
 * Generated class for the GenderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gender',
  templateUrl: 'gender.html',
})
export class GenderPage {
  gender;
  personalData = {};
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebasedatabase: FirebaseDbProvider,
    private dataUser: DataProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenderPage');
  }

  saveGender(){
    this.personalData = {
      gender: this.gender,
    }

    this.dataUser.setGender(this.gender);
    this.navCtrl.push(StaturePage);


    /*this.firebasedatabase.savePersonalData(this.personalData).then(res=>{
      console.log('Gender guardado en firebase');
      this.navCtrl.push(StaturePage);
    })*/


  }

}
