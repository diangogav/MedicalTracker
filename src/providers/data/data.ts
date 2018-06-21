import { Injectable } from '@angular/core';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  gender;stature;weight;age;username;email;password;pulseArray;oxygenArray;

  constructor() {
    console.log('Hello DataProvider Provider');
  }

  setGender(gender){
    this.gender = gender;
    console.log(this.gender);
  }

  setStature(stature){
    this.stature = stature;
    console.log(this.stature);

  }

  setWeight(weight){
    this.weight = weight;
    console.log(this.weight);

  }

  setAge(age){
    this.age = age;
    console.log(age);
  }

  setUsername(username){
    this.username = username;
    console.log(username);
  }

  setEmail(email){
    this.email = email;
    console.log(email);
  }

  setPassword(password){
    this.password = password;
    console.log(password);
  }

  setPulse(pulseArray){
    this.pulseArray = pulseArray;
    console.log(this.pulseArray);
  }

  setOxygen(oxygenArray){
    this.oxygenArray = oxygenArray;
    console.log(this.oxygenArray);
  }

  getGender(){
    return this.gender;
  }

  getStature(){
    return this.stature;
  }

  getWeight(){
    return this.weight;
  }

  getAge(){
    console.log("la edad es: " , this.age);
    return this.age;
  }

  getUsername(){
    return this.username;
  }

  getEmail(){
    return this.email;
  }

  getPassword(){
    console.log("la edad es: " , this.password);
    return this.password;
  }
  
  getPulse(){
    return this.pulseArray;
  }

  getOxygen(){
    return this.oxygenArray;
  }


}
