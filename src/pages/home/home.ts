import { Component,ViewChild } from '@angular/core';
import { NavController,AlertController  } from 'ionic-angular';
import { Chart } from 'chart.js';
import { ViewPage } from '../view/view';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  items;
  xArray: any[] = [];
  yArray: any[] = [];
  myInput;
  flag = false;
  flag2 = true;

  constructor(
      public navCtrl: NavController,
      public database: AngularFireDatabase,
      public alertCtrl: AlertController
    ) {
        this.items = firebase.database().ref('chart/data').orderByKey();
        this.items.on('value',(snapshot) => {
            this.xArray.splice(0,this.xArray.length);
            this.yArray.splice(0,this.yArray.length);
            snapshot.forEach((childSnapshot) => {
              this.xArray.push(childSnapshot.key);
              this.yArray.push(childSnapshot.val());
            });

            this.chartData(this.yArray,this.xArray);
          });


  }

     

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
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
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

      addData(){

        let prompt = this.alertCtrl.create({
            title: 'Add Data',
            message: "Enter a numeric value",
            inputs: [
                {
                    name: 'value',
                    placeholder:'value'
                },
            ],
            buttons:[
                {
                    text:'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text:'Save',
                    handler: data => {
                        const newDataRef =this.database.list("/chart/data/").push(data.value);
                        /*const newDataRef =this.database.list("/chart/data/").push({});
                        newDataRef.set({
                            id: 11,
                            value: data.value
                        })*/
                    }
                }
            ]
        });
        prompt.present();
      }

      hidden(){
        this.flag = true;
        this.flag2 = false;
      }

      hidden2(){
        this.flag2= true;
        this.flag = false;
      }
}
