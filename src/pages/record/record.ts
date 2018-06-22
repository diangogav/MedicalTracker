import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import 'rxjs/add/operator/do';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
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
    public toastCtrl: ToastController
  	
  	) {

	    let oxymeter = this.afDB.list('Users/'+this.user+'/chart/'+this.actualDate);
  }

    ionViewDidEnter(){

	    var date = new Date();
	    this.actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);	
	    this.user = this.auth.getUser();





	   //          let toast = this.toastCtrl.create({
	   //              message: "Actualizando... ",
	   //              position: 'top',
	   //              dismissOnPageChange: true
	   //            });

	   //          toast.present();   
	     		
	            	this.getData();

				// toast.dismiss();

	}


	doInfinite(): Promise<any> {



	    console.log('Begin async operation');

	    return new Promise((resolve) => {
	      setTimeout(() => {

	            	this.getData();

	      	console.log(this.items);
	        console.log('Async operation has ended');
	        resolve();
	      }, 500);
	    })
	 }


	getData(){

		if (!this.referenceToOldestKey) { // if initial fetch
		 
		  firebase.database().ref('Users/'+this.user+'/chart/'+this.actualDate)
		   .orderByKey()
		   .limitToLast(20)
		   .once('value')
		   .then((snapshot) => { 
		      // changing to reverse chronological order (latest first)
		      let arrayOfKeys = Object.keys(snapshot.val())
		         .sort()
		         .reverse();
		      // transforming to array

		      console.log(arrayOfKeys);
		      let results = arrayOfKeys
		         .map((key) => snapshot.val()[key]);

		         console.log(results);
		      // storing reference
		      this.referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
		      console.log(this.referenceToOldestKey);

		      results.forEach(data => {
		      	this.items.push(data);
		      })

		      console.log(this.items);
		 
		      // Do what you want to do with the data, i.e.
		      // append to page or dispatch({ … }) if using redux
		   })
		   .catch((error) => {  } );
		 
		 } else {

		 	this.items = [];
		 
		   firebase.database().ref('Users/'+this.user+'/chart/'+this.actualDate)
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

		          console.log("Array de keys:",arrayOfKeys);
		       // transforming to array
		       let results = arrayOfKeys
		          .map((key) => snapshot.val()[key]);
		          console.log("array de val: ", results);
		       // updating reference
		       this.referenceToOldestKey = arrayOfKeys[arrayOfKeys.length-1];
		       console.log("nueva referencia:",this.referenceToOldestKey);
		       // Do what you want to do with the data, i.e.
		       // append to page or dispatch({ … }) if using redux
		       	results.forEach(data => {
		      	this.items.push(data);
		      });

		      console.log(this.items);

		    })
		   .catch((error) => {  } );
		 
		 }
 
}
}




