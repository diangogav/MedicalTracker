import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import { Injectable } from '@angular/core';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {


  constructor(
    public afDB: AngularFireDatabase, 
    public auth: AuthProvider) {
    console.log('Hello FirebaseDbProvider Provider');
  }

  savePersonalData(data){
    data.section  = "Personal Data";
    return this.afDB.database.ref('Users/'+this.auth.getUser()+'/'+data.section).push(data)
 }



}
