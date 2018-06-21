import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController,IonicPage  } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ViewPage } from '../view/view';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
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
  maxOxygen = 98;
  maxPulse = 98;
  lineChart: any;
  items;
  itemsPulse;
  xArray: any[] = [];
  yArray: any[] = [];
  actualValue: any[];
  myInput;
  flag = false;
  flag2 = true;
  flag3 = false;
  flag4 = true;
  user;
  timerVal;
  timerVar;
  xArrayPulse: any[] = [];
  yArrayPulse: any[] = [];
  actualValuePulse: any[];

  constructor(
      public navCtrl: NavController,
      public database: AngularFireDatabase,
      public alertCtrl: AlertController,
      private auth: AuthProvider,
      private firebasedatabase: FirebaseDbProvider
    ) {

        this.startTimer();
        var date = new Date();
        var actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        this.user = this.auth.getUser();
        console.log(this.user);
        //this.items = firebase.database().ref('Users/'+this.user+'/chart/oxigeno/'+actualDate).limitToLast(10);
        this.items = firebase.database().ref('Users/'+this.user+'/chart/'+actualDate+'/oxigeno').limitToLast(10);
        this.items.on('value',(snapshot) => {
            this.xArray.splice(0,this.xArray.length);
            this.yArray.splice(0,this.yArray.length);
            snapshot.forEach((childSnapshot) => {
              this.xArray.push(childSnapshot.key);
              this.yArray.push(childSnapshot.val());
            });
            console.log(this.xArray);
            console.log(this.yArray);
            this.actualValue = this.yArray[this.yArray.length - 1]
            this.chartData(this.yArray,this.xArray);
          });

          //this.itemsPulse = firebase.database().ref('Users/'+this.user+'/chart/pulso/'+actualDate).limitToLast(10);
          this.itemsPulse = firebase.database().ref('Users/'+this.user+'/chart/'+actualDate+'/pulso').limitToLast(10);
          this.itemsPulse.on('value',(snapshot) => {
              this.xArrayPulse.splice(0,this.xArrayPulse.length);
              this.yArrayPulse.splice(0,this.yArrayPulse.length);
              snapshot.forEach((childSnapshot) => {
                this.xArrayPulse.push(childSnapshot.key);
                this.yArrayPulse.push(childSnapshot.val());
              });
              console.log(this.xArrayPulse);
              console.log(this.yArrayPulse);
              this.actualValuePulse = this.yArrayPulse[this.yArrayPulse.length - 1]
              this.chartDataPulse(this.yArrayPulse,this.xArrayPulse);
            });


  }
//********************************************************************************
//GRÁFICA 2
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
            }
        });
      } 

     
      hidden(){
        this.flag = true;
        this.flag2 = false;
      }

      hidden2(){
        this.flag2= true;
        this.flag = false;
      }
      hidden3(){
        this.flag3 = true;
        this.flag4 = false;
      }
      hidden4(){
        this.flag3 = false;
        this.flag4 = true;
      }


      startTimer(){

        this.timerVar = Observable.interval(5000).subscribe(x => {
                  this.firebasedatabase.saveOxygenData(Math.round(Math.random()*(this.maxOxygen-75)+75))
                  this.firebasedatabase.savePulseData(Math.round(Math.random()*(this.maxPulse-75)+75))
        })

      }
}
