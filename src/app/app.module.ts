import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {RoundProgressModule} from 'angular-svg-round-progressbar';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { GenderPage } from '../pages/gender/gender';
import { StaturePage } from '../pages/stature/stature';
import { WeightPage } from '../pages/weight/weight';
import { AgePage } from '../pages/age/age';
import { FinishPage } from '../pages/finish/finish';
import { ViewPage } from '../pages/view/view';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FirebaseDbProvider } from '../providers/firebase-db/firebase-db';
import { DataProvider } from '../providers/data/data';

const firebaseConfig = {
    apiKey: "AIzaSyC3OSEMlsGgp0Y7kVDNNO1cpgTshj95m2c",
    authDomain: "hospital-645ee.firebaseapp.com",
    databaseURL: "https://hospital-645ee.firebaseio.com",
    projectId: "hospital-645ee",
    storageBucket: "hospital-645ee.appspot.com",
    messagingSenderId: "761286977231"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,
    GenderPage,
    StaturePage,
    WeightPage,
    AgePage,
    FinishPage,
    ViewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RoundProgressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    WelcomePage,
    GenderPage,
    StaturePage,
    WeightPage,
    AgePage,
    FinishPage,
    ViewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FirebaseDbProvider,
    DataProvider
  ]
})
export class AppModule {}
