import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { DataProvider } from '../../providers/data/data';
import { GenderPage } from '../gender/gender';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

username;
personalData = {};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	private firebasedatabase: FirebaseDbProvider,
    private dataUser: DataProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  saveUsername(){
    this.personalData = {
      gender: this.username,
    }
    this.dataUser.setUsername(this.username);
    this.navCtrl.push(GenderPage);
}
}
