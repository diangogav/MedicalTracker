import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { GenderPage } from '../gender/gender';
import { SignupPage }from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= { email : '', password : ''};

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public auth : AuthProvider,
    public alertCtrl : AlertController,
    public loadingCtrl: LoadingController
  	) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup(){

    this.navCtrl.push(SignupPage);
  }

  login(){

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    
    loading.present();

    this.auth.loginUser(this.user.email,this.user.password ).then((user) => {

      loading.dismiss();

  }).catch(err=>{

      loading.dismiss();

      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

}