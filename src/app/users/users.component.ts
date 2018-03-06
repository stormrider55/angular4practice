import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgxSmartModalService} from 'ngx-smart-modal';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   public loading = false;
  constructor(private http: HttpClient,public ngxSmartModalService: NgxSmartModalService,public toastr: ToastsManager,vcr: ViewContainerRef,private Ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    this.toastr.setRootViewContainerRef(vcr);

   }
  editUserData: Object = {};
  data: Object = {};
  allUsers:Object = [{}];
  del_user_id:string;
  total:number;
  ngOnInit() {

    this.getUsers();
  }
  getUsers(){
    this.Ng4LoadingSpinnerService.show();
    this.loading = true;
    this.http.get('http://localhost:8000/api/getUsers').subscribe(data => {
        this.allUsers = data;
        console.log(data);
        this.Ng4LoadingSpinnerService.hide();
        this.loading = false;
        this.total = Object.keys(data).length;
    });
  }
  openEditModal(user){
    this.editUserData = user;
    this.ngxSmartModalService.getModal('myModal').open();
    console.log(this.editUserData);
  }
  updateUserData(){
    console.log(this.editUserData);
    this.http.post('http://localhost:8000/api/updateUser',this.editUserData).subscribe(data => {
      this.ngxSmartModalService.getModal('myModal').close();
      this.toastr.success('User data updated successfully!', 'Success!');
    });
  }
  openDeleteModal(id){
    this.del_user_id = id;
    this.ngxSmartModalService.getModal('deleteModal').open();
  }
  deleteUser(){
    console.log(this.del_user_id);
    var del_data = {'user_id':this.del_user_id};
    this.http.post('http://localhost:8000/api/deleteUser',del_data).subscribe(data => {
      this.getUsers();
      this.ngxSmartModalService.getModal('deleteModal').close();
      this.toastr.error('User deleted successfully!', 'Deleted!');
    });
  }
}
