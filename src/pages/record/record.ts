import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import 'rxjs/add/operator/do';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import * as _ from 'lodash'



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
  itemsLoader: any[] = [];
  initPointer = 0;
  endPointer = 0;
  limit: number = 20;
  referenceToOldestKey = '';

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
	public afDB: AngularFireDatabase,
    private auth: AuthProvider,
	public toastCtrl: ToastController,
  	
  	) {}

    ionViewDidEnter(){
		this.referenceToOldestKey = '';
        //************************************ */
        //Spinner
        let toast = this.toastCtrl.create({
			message: 'Loading Data',
			position: 'top'
		  });
	  
		toast.present();
		
		this.items = [];

		//Actual Date
	    var date = new Date();
	    this.actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);	
	    this.user = this.auth.getUser();
	     		//Get Data Firebase
					this.getData();

		toast.dismiss();
	}


	//======================================================================
	//Infinite Scroll
	doInfinite(): Promise<any> {

	    return new Promise((resolve) => {
	      setTimeout(() => {

	            	this.getData();

	        resolve();
	      }, 500);
	    })
	 }
	//======================================================================


	getData(){

		if(this.referenceToOldestKey == undefined){

		}else if (!this.referenceToOldestKey) { // if initial fetch

		  firebase.database().ref('UsersChart/'+this.user+'/'+ this.actualDate)
		   .orderByKey()
		   .limitToLast(20)
		   .once('value')
		   .then((snapshot) => { 
		      // changing to reverse chronological order (latest first)
		      let arrayOfKeys = Object.keys(snapshot.val())
		         .sort()
		         .reverse();
		      // transforming to array

		      let results = arrayOfKeys
		         .map((key) => snapshot.val()[key]);

		      // storing reference
		      this.referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];

		      results.forEach(data => {
		      	this.items.push(data);
		      })

		 
		      // Do what you want to do with the data, i.e.
		      // append to page or dispatch({ … }) if using redux
		   })
		   .catch((error) => {  } );
		 
		 } else {
		 
		   firebase.database().ref('UsersChart/'+this.user+'/'+ this.actualDate)
		    .orderByKey()
		    .endAt(this.referenceToOldestKey)
		    .limitToLast(21)
		    .once('value')
		    .then((snapshot) => {
		      // changing to reverse chronological order (latest first)
		      // & removing duplicate
		      let arrayOfKeys = Object.keys(snapshot.val())
		          .sort()
		          .reverse()
		          .slice(1);


		       // transforming to array
		       let results = arrayOfKeys
		          .map((key) => snapshot.val()[key]);

		       // updating reference
		       this.referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
		       // Do what you want to do with the data, i.e.
		       // append to page or dispatch({ … }) if using redux
		       results.forEach(data => {
		      	this.items.push(data);
		      });



		    })
		   .catch((error) => {  } );
		 
		 }
 
	}
}




