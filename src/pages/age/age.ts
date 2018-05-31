import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import { TabsPage } from '../tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { FinishPage } from '../finish/finish';

/**
 * Generated class for the AgePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-age',
  templateUrl: 'age.html',
})
export class AgePage {
  myDate;
  personalData;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private dataUser: DataProvider,
    private firebasedatabase: FirebaseDbProvider

  ) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgePage');
  }

  saveAge(){
    var date = new Date();
    
    var values=this.myDate.split("-");
    var dateUser = values[2];
    var monthUser = values[1];
    var yearUser = values[0];

    var now = new Date();
    var yearNow = now.getFullYear();
    var monthNow = now.getMonth()+1;
    var dayNow = now.getDate();

    var age = yearNow - yearUser;

    if(monthNow < monthUser){
      age--;
    }
    if((monthNow == monthNow) && (dayNow < dateUser)){
      age--;
    }

    this.dataUser.setAge(age);
   
    this.navCtrl.push(FinishPage);
  }



}
