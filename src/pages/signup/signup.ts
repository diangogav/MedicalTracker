import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { GenderPage } from '../gender/gender';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name;
  lastname;
  email;
  password;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dataUser: DataProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  saveData(){

    this.dataUser.setName(this.name);
    this.dataUser.setLastname(this.lastname);
    this.dataUser.setPassword(this.password);
    this.dataUser.setEmail(this.email);
    
    this.navCtrl.push(GenderPage);

  }

}
