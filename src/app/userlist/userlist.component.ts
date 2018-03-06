import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgxSmartModalService} from 'ngx-smart-modal';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {UserFields} from "./user-fields";
import {ApiService} from "./api.service";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [ApiService]
})
export class UserlistComponent implements OnInit {
  public loading_list = false;
  _postsArray: UserFields[];
  parsed:any =[];
  editUserData: Object = {};
  data: Object = {};
  allUsers:any;
  del_user_id:string;
  profileImagePath:string;
  constructor(private http: HttpClient,public ngxSmartModalService: NgxSmartModalService,public toastr: ToastsManager,vcr: ViewContainerRef,private apiSerivce: ApiService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.profileImagePath = '/app/assets/img/user.jpg';
   }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(): void {
    this.loading_list = true;
           this.apiSerivce.getUsers()
               .subscribe(
                   data =>{
                     this.allUsers = data;
                     this.loading_list = false;
                   },
                     error => {
                       console.log("Error :: " + error);
                       this.loading_list = false;
                     }
               )
       }

  openEditModal(user){
    Object.assign(this.editUserData,user);
    this.ngxSmartModalService.getModal('myModal').open();
  }
  updateUserData(){
    this.http.post('http://localhost:8000/api/updateUser',this.editUserData).subscribe(data => {
      this.refresh();
      this.ngxSmartModalService.getModal('myModal').close();
      this.toastr.success('User data updated successfully!', 'Success!');
    });
  }
  openDeleteModal(id){
    this.del_user_id = id;
    this.ngxSmartModalService.getModal('deleteModal').open();
  }
  deleteUser(){
    var del_data = {'user_id':this.del_user_id};
    this.http.post('http://localhost:8000/api/deleteUser',del_data).subscribe(data => {
      var index = this.allUsers.findIndex(x => x.user_id==this.del_user_id);
      this.allUsers.splice(index, 1);
      this.ngxSmartModalService.getModal('deleteModal').close();
      this.toastr.error('User deleted successfully!', 'Deleted!');
    });
  }
  refresh(){
    this.apiSerivce.getUsers()
        .subscribe(
            data =>{
              this.allUsers = data;
            },
              error => {
                console.log("Error :: " + error);
              }
        )
  }

}
