import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';
import firebase from "firebase";

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {


  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider
) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  savePersonalData(data){
    return this.afDB.database.ref('Users/'+ data.name + ' ' + data.lastname + ': ' + this.auth.getUser()).set(data)
 }

 saveOxygenData(id,oxygen,pulse){
    
    var date = new Date();
    var actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    var actualHour = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + ':'+ ('0' + date.getSeconds()).slice(-2);

    var jsonVariable = {};
    
    jsonVariable['actualHour'] = actualHour;    
    jsonVariable['oxygen'] = oxygen;    
    jsonVariable['pulse'] = pulse;    
    //var chartRef = firebase.database().ref('Users/'+this.auth.getUser()+'/chart/oxigeno').child(actualDate);
     var chartRef = firebase.database().ref('UsersChart/' + this.auth.getUser()+ '/'+ actualDate).child(actualHour);
     return chartRef.update(jsonVariable)
    //return this.afDB.database.ref.child('Users/'+this.auth.getUser()+'/chart/oxigeno')
 }

 savePulseData(data){
    
    var date = new Date();
    var actualDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    var actualHour = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2) + ':'+ ('0' + date.getSeconds()).slice(-2);

    var jsonVariable = {};

      jsonVariable[actualHour] = data;    
     //var chartRef = firebase.database().ref('Users/'+this.auth.getUser()+'/chart/pulso').child(actualDate);
     var chartRef = firebase.database().ref('UsersChart/'+this.auth.getUser()+'/'+actualDate).child('pulso');
     return chartRef.update(jsonVariable)
    //return this.afDB.database.ref.child('Users/'+this.auth.getUser()+'/chart/oxigeno')
 }

 deleteData(){
  this.afDB.database.ref('Users').remove();
 }

}
