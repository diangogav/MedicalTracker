import { Component } from '@angular/core';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  oxygen;
  oxygenArray:any[] = [];
  pulse;
  pulseArray:any[] = [];
  user;
  oxygenMean = 0;
  pulseMean = 0;
  actualDate;
  actualTime;
  oxygenReadings;
  pulseReadings;
  constructor(
  	    
  	public navCtrl: NavController, 
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private auth: AuthProvider,

  	) {}

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
	     		
	            	this.getPulses();
	            	this.getOxygens();

				toast.dismiss();

}

	getPulses(){

		//this.pulse = firebase.database().ref('Users/'+this.user+'/chart/pulso/'+this.actualDate);
		this.pulse = firebase.database().ref('Users/'+this.user+'/chart/'+this.actualDate+'/pulso');
		    this.pulse.once('value',(dataSnapshot) => {
		          

		        this.pulseArray = [];

		        dataSnapshot.forEach((childSnapshot) => {

		        this.pulseArray.push(childSnapshot.val());

				this.pulseReadings = this.pulseArray.length;

		       	this.pulseArray.forEach((pulseDat) => {

		       		this.pulseMean = this.pulseMean + pulseDat;
		       	});

		       	this.pulseMean = this.pulseMean / this.pulseArray.length;

		       	this.pulseMean = parseFloat(this.pulseMean.toFixed(2));

		      }); 	        
		  });

	}

	getOxygens(){

			//this.oxygen = firebase.database().ref('Users/'+this.user+'/chart/oxigeno/'+this.actualDate);
			this.oxygen = firebase.database().ref('Users/'+this.user+'/chart/'+this.actualDate+'/oxigeno');
		    
		    this.oxygen.once('value',(dataSnapshot) => {
	          

	        this.oxygenArray = [];

	        dataSnapshot.forEach((childSnapshot) => {

	        this.oxygenArray.push(childSnapshot.val());
			
			this.oxygenReadings = this.oxygenArray.length;

	       	this.oxygenArray.forEach((oxygenDat) => {

	       		this.oxygenMean = this.oxygenMean + oxygenDat;
	       	});

	       	this.oxygenMean = this.oxygenMean / this.oxygenArray.length;

	       	this.oxygenMean = parseFloat(this.oxygenMean.toFixed(2));



	      }); 	        
	  });

	}

	updateValues(){
		this.getPulses();
		this.getOxygens();
	}

}
