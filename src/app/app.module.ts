import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, Validators,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MyloginComponent } from './mylogin/mylogin.component';
import { DatabindComponent } from './databind/databind.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DataService } from './data.service';
import {NotificationsModule, NotificationsService} from 'angular4-notify';
import { UsersComponent } from './users/users.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TestComponent } from './test/test.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
 import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { FormvalidationComponent } from './formvalidation/formvalidation.component';
import { ValidationService } from './validation.service';
import { SignupComponent } from './signup/signup.component';
import { LaddaModule } from 'angular2-ladda';
import { HomeComponent } from './home/home.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { UserlistComponent } from './userlist/userlist.component';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
 import "rxjs/Rx";
 import { LoadingModule } from 'ngx-loading';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfinitescrollComponent } from './infinitescroll/infinitescroll.component';
import { AuthService } from './services/auth.service';
// export const ROUTES: Routes = [
var routes = [
{ path: '', component: MyloginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'register', component: RegistrationComponent },
{ path: 'users', component: UsersComponent },
{ path: 'formvalidation', component: FormvalidationComponent },
{ path: 'user_list', component: UserlistComponent },
{ path: 'scroll', component: InfinitescrollComponent }
// { path: '**', component: NotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MyloginComponent,
    DatabindComponent,
    NavbarComponent,
    NotfoundComponent,
    UsersComponent,
    TestComponent,
    FormvalidationComponent,
    SignupComponent,
    HomeComponent,
    UserlistComponent,
    InfinitescrollComponent

  ],
  // ,{useHash: true}
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NotificationsModule,
    AngularFontAwesomeModule,
    NgxSmartModalModule.forRoot(),
    ToastModule.forRoot(),
    ReactiveFormsModule,
    LaddaModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule,
    LoadingModule,
    InfiniteScrollModule
  ],
  providers: [DataService,NotificationsService,NgxSmartModalService,ValidationService ,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
