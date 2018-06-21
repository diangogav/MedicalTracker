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
  dataArray:any[] = [];
  user;
  oxygenMean = 0;
  pulseMean = 0;
  actualDate;
  actualTime;
  oxygenReadings;
  readings;
  pulseAcum = 0;
  oxygenAcum = 0;

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
	     		
	            	this.getDataMean();

				toast.dismiss();

}

	getDataMean(){

		//this.pulse = firebase.database().ref('Users/'+this.user+'/chart/pulso/'+this.actualDate);
		this.pulse = firebase.database().ref('Users/'+this.user+'/chart/'+this.actualDate);
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


		      }); 	        
		  });

	}


	updateValues(){
		this.getDataMean();
	}

}
