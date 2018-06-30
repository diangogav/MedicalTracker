import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  pulse;
  dataArray:any[] = [];
  user;
  oxygenMean = 0;
  pulseMean = 0;
  actualDate;
  actualTime;
  readings;
  pulseAcum = 0;
  oxygenAcum = 0;

  constructor(
  	    
  	public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public toastCtrl: ToastController,
    private auth: AuthProvider,
    private data: FirebaseDbProvider

  	) {}

    ionViewDidEnter(){


		//Actual Date
	    var date = new Date();
	    this.actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);	
	    this.user = this.auth.getUser();


   
	     		
	            	this.getDataMean();

			
}


//=========================================================================================================
// Get Data From Firebase and show in the view
	getDataMean(){

		this.pulse = firebase.database().ref('UsersChart/'+this.user+'/'+ this.actualDate);

		//Spinner
        let toast = this.toastCtrl.create({
			message: 'Loading Data',
			position: 'top'
		  });
	  

		  toast.present();
			
		    this.pulse.once('value',(dataSnapshot) => {
		          

		        this.dataArray = [];

		        dataSnapshot.forEach((childSnapshot) => {
		        this.dataArray.push(childSnapshot.val());

				this.dataArray.forEach((dat) => {
					this.pulseAcum= this.pulseAcum + dat.pulse;
					this.oxygenAcum = this.oxygenAcum + dat.oxygen
				});				

				this.actualTime = this.dataArray[this.dataArray.length - 1].actualHour;

				this.pulseMean = this.pulseAcum / this.dataArray.length;
				this.oxygenMean = this.oxygenAcum / this.dataArray.length;

				this.pulseMean = parseFloat(this.pulseMean.toFixed(2));
				this.oxygenMean = parseFloat(this.oxygenMean.toFixed(2));

				this.pulseAcum = 0;
				this.oxygenAcum = 0;
				
				this.readings = this.dataArray.length;

				toast.dismiss();

		      }); 	        
		  	})
		


	}

//=========================================================================================================
//Refresh data
	updateValues(){

	     		
		  this.getDataMean();

	}

	delete(){
		this.data.deleteData();
	}
	

}
