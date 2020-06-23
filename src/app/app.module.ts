import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tab1Page } from './tab1/tab1.page';
import { FloorsPage } from './tab1/floors/floors.page';
import { IonicStorageModule } from '@ionic/storage';
import { AppPopOverComponent } from './app-pop-over/app-pop-over.component';
import { CompareValidatorDirective } from './directives/compare-validator.directive';
import { FCM } from '@ionic-native/fcm/ngx';
import { CompformPage } from './tab2/compform/compform.page';
import { AddUserPage } from './tab3/add-user/add-user.page';
import { UserInfoPage } from './tab3/user-info/user-info.page';
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [AppComponent, CompareValidatorDirective, CompformPage, AddUserPage,UserInfoPage],
  entryComponents: [CompformPage, AddUserPage,UserInfoPage],
  imports: [BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()],
  providers: [
    FCM,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpClientModule,
    DatePipe
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
