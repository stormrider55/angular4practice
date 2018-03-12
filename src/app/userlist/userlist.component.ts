import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgxSmartModalService} from 'ngx-smart-modal';
import { ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {ApiService} from "../shared";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [ApiService]
})
export class UserlistComponent implements OnInit {

  public loading_list = false;
  parsed:any =[];
  editUserData: Object = {};
  data: Object = {};
  allUsers:any;
  del_user_id:string;
  profileImagePath:string;
  get_user_url:string;
  update_user_url:string;
  delete_user_url:string;

  constructor(private http: HttpClient,public ngxSmartModalService: NgxSmartModalService,public toastr: ToastsManager,vcr: ViewContainerRef,private apiSerivce: ApiService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.profileImagePath = '/app/assets/img/user.jpg';
    this.get_user_url = '/getUsers';
    this.update_user_url = '/updateUser';
    this.delete_user_url = '/deleteUser';
   }
  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.loading_list = true;
      this.apiSerivce.get_without_param(this.get_user_url)
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
    this.apiSerivce.put(this.update_user_url,this.editUserData)
    .subscribe(
       data =>{
         this.refresh();
         this.ngxSmartModalService.getModal('myModal').close();
         this.toastr.success('User data updated successfully!', 'Success!');
       },
         error => {
           console.log("Error :: " + error);
         }
    )
  }
  openDeleteModal(id){
    this.del_user_id = id;
    this.ngxSmartModalService.getModal('deleteModal').open();
  }
  deleteUser(){
    this.apiSerivce.delete(this.delete_user_url,this.del_user_id)
    .subscribe(
       data =>{
         var index = this.allUsers.findIndex(x => x.user_id==this.del_user_id);
         this.allUsers.splice(index, 1);
         this.ngxSmartModalService.getModal('deleteModal').close();
         this.toastr.error('User deleted successfully!', 'Deleted!');
       },
         error => {
           console.log("Error :: " + error);
         }
    )
  }
  refresh(){
    this.apiSerivce.get_without_param(this.get_user_url)
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
