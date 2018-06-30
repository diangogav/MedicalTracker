import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { TabsPage } from '../tabs/tabs';
import { AuthProvider } from '../../providers/auth/auth';
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
    private firebasedatabase: FirebaseDbProvider,
    public loadingCtrl : LoadingController,
    public toastCtrl : ToastController,
    public auth : AuthProvider

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }

  saveUser(){
  	this.personalData = {


      email: this.dataUser.getEmail(),
      name: this.dataUser.getName(),
      lastname: this.dataUser.getLastname(),
      gender: this.dataUser.getGender(),
      weight: this.dataUser.getWeight(),
      stature: this.dataUser.getStature(),
      age: this.dataUser.getAge()
    }

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    

    this.auth.registerUser(this.personalData.email,this.dataUser.getPassword())
    .then((user) => {

      this.personalData.id = this.auth.getUser();
      
      this.firebasedatabase.savePersonalData(this.personalData).then(res=>{
           loading.dismiss();
           let toast = this.toastCtrl.create({
                message: "Se ha registrado correctamente",
                duration: 3000,
                position: 'top'
              });
  
             toast.present();        
             this.navCtrl.push(TabsPage);
      })
    })
    .catch(err=>{
              loading.dismiss();     
              let toast = this.toastCtrl.create({
                message: err,
                duration: 3000,
                position: 'top'
              });
  
             toast.present();   
    })
  }

}
