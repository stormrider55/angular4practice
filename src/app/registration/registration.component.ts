import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NotificationsService} from 'angular4-notify';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private dataService:DataService,private http: HttpClient,protected notificationsService: NotificationsService,public toastr: ToastsManager,vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  someProperty:string = '';
  regLoading: boolean = false;
  ngOnInit() {
    console.log(this.dataService);
    this.someProperty = this.dataService.myData();
    console.log(this.someProperty);
  }

  private headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': true
});

  registerUser(form: NgForm) {
    this.regLoading = !this.regLoading;
    this.http.post('http://localhost:8000/api/testApi',form.value).subscribe(data => {
      this.regLoading = !this.regLoading;
      this.toastr.success('User created successfully!', 'Success!');
      form.reset();
      // if(data.code == "200")
      // {
      //   this.notificationsService.addInfo('User created successfully');
      // }
      // else
      // {
      //   this.notificationsService.addError('Something happened wrong');
      // }
    });
  }

}
