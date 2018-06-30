import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController,ToastController  } from 'ionic-angular';
import { Chart } from 'chart.js';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';
import 'rxjs/add/observable/interval'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('lineCanvas2') lineCanvas2;

  //=========================================================================================
  //Variables
  maxOxygen = 98;
  maxPulse = 98;
  lineChart: any;
  items;
  itemsPulse;
  xArray: any[] = [];
  yArray: any[] = [];
  actualValue: any[];
  viewChartOxygen = false;
  viewCircularOxygen = true;
  viewChartPulse = false;
  viewCircularPulse = true;
  user;
  timerVar;
  oxygenArray: any[] = [];
  pulseArray: any[] = [];
  timeArray: any[] = [];
  actualValuePulse: any[];
  actualValueTime;
  i=0;
//=============================================================================================
  constructor(
      public navCtrl: NavController,
      public database: AngularFireDatabase,
      public alertCtrl: AlertController,
      private auth: AuthProvider,
      private firebasedatabase: FirebaseDbProvider,
      public toastCtrl: ToastController
    ) {

        //Actual Date
        this.startTimer();
        var date = new Date();
        var actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
       //Current User
        this.user = this.auth.getUser();
        //=================================================================================================
        //Get Firebase Data To oxygenArray, pulseArray, timeArray

        //************************************ */
        //Spinner
        let toast = this.toastCtrl.create({
          message: 'Loading Data',
          position: 'top'
        });
    
        toast.present();

        setTimeout(() => {
        //************************************ */
        this.items = firebase.database().ref('UsersChart/'+this.user+'/'+'date: ' + actualDate).limitToLast(10);
        this.items.on('value',(snapshot) => {

            this.xArray.splice(0,this.xArray.length);
            this.yArray.splice(0,this.yArray.length);
            this.oxygenArray.splice(0,this.oxygenArray.length);
            this.pulseArray.splice(0,this.pulseArray.length);
            this.timeArray.splice(0,this.timeArray.length);

            snapshot.forEach((childSnapshot) => {
              this.yArray.push(childSnapshot.val());
            });
            
            this.yArray.forEach((data=> {
              this.oxygenArray.push(data.oxygen);
              this.pulseArray.push(data.pulse);
              this.timeArray.push(data.actualHour);
            }))

            this.actualValue = this.oxygenArray[this.oxygenArray.length - 1]
            this.actualValuePulse = this.pulseArray[this.pulseArray.length - 1]
            this.actualValueTime = this.timeArray[this.timeArray.length - 1 ]
            this.chartDataPulse(this.pulseArray,this.timeArray);
            this.chartData(this.oxygenArray,this.timeArray);

            toast.dismiss();
          });
          //End Get Firebase Data
          //================================================================================================
        }, 5000);
      
        toast.dismiss();
  }

//********************************************************************************
//Pulse Chart

       chartDataPulse(values,labels){
        this.lineChart = new Chart(this.lineCanvas2.nativeElement, {      
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Realtime Data",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(214,10,10,0.4)",
                        borderColor: "rgba(214, 10, 10,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(214,10,10,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(214,10,10,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: values,
                        spanGaps: false,
                    }
                ]
            },
            options: {
              animation: {
                duration: 300
              }
          }
        });
      } 

  
//==================================================================================================
 //GRAFICA 1

      chartData(values,labels){
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {      
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Realtime Data",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(32, 186, 252,0.4)",
                        borderColor: "rgba(32, 186, 252,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(32, 186, 252,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(32, 186, 252,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: values,
                        spanGaps: false,
                    }
                ]
            },
            options: {
              animation: {
                duration: 300
              }
          }
        });
      } 

      // Change char view to circular view -->
      hiddenChartOxygen(){
        this.viewChartOxygen = true;
        this.viewCircularOxygen = false;
      }

      hiddenCircularOxygen(){
        this.viewCircularOxygen= true;
        this.viewChartOxygen = false;
      }
      hiddenPulseChart(){
        this.viewChartPulse = true;
        this.viewCircularPulse = false;
      }
      hiddenCircularPulse(){
        this.viewChartPulse = false;
        this.viewCircularPulse = true;
      }
      //end change


      //Data to database
      startTimer(){

        this.timerVar = Observable.interval(5000).subscribe(x => {
                  this.i++;
                  this.firebasedatabase.saveOxygenData(this.i,Math.round(Math.random()*(this.maxOxygen-75)+75),Math.round(Math.random()*(this.maxPulse-75)+75))
                  //this.firebasedatabase.savePulseData(Math.round(Math.random()*(this.maxPulse-75)+75))
        })

      }
}
