import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the FinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html',
})
export class FinishPage {

personalData;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private dataUser: DataProvider,
    private firebasedatabase: FirebaseDbProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }

  saveUser(){
  	this.personalData = {

  	  username: "Diango",
      gender: this.dataUser.getGender(),
      weight: this.dataUser.getWeight(),
      stature: this.dataUser.getStature(),
      age: this.dataUser.getAge()
    }

    this.firebasedatabase.savePersonalData(this.personalData).then(res=>{
      console.log('Usuario guardado en firebase');
      this.navCtrl.push(TabsPage);
    })
  }

}
