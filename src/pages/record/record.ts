import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the RecordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-record',
  templateUrl: 'record.html',
})
export class RecordPage {
  actualDate;
  user;
  data;
  items: any[] = [];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
	public afDB: AngularFireDatabase,
    private auth: AuthProvider,
    public toastCtrl: ToastController
  	
  	) {
  }

    ionViewDidEnter(){



	    var date = new Date();
	    this.actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);	
	    this.user = this.auth.getUser();

	            let toast = this.toastCtrl.create({
	                message: "Actualizando... ",
	                position: 'top',
	                dismissOnPageChange: true
	              });

	            toast.present();   
	     		
	            	this.getData();

				toast.dismiss();

	}


	getData(){

			this.data = firebase.database().ref('Users/'+this.user+'/chart/'+this.actualDate);

			    this.data.once('value',(dataSnapshot) => {
			          
			    this.items = [];

	        	dataSnapshot.forEach((childSnapshot) => {

	        		this.items.push(childSnapshot.val());

			  });

	        	console.log(this.items);

		});

	}

}




