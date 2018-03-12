import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {ApiService} from "../shared";
@Component({
  selector: 'app-infinitescroll',
  templateUrl: './infinitescroll.component.html',
  styleUrls: ['./infinitescroll.component.css'],
  providers: [ApiService]
})
export class InfinitescrollComponent implements OnInit {
  public loading_list = false;
  allUsers:any = [];
  limit:any;
  offset:any;
  count:any;
  data: Object = {};
  public show:boolean = false;
  userDetails:Object = {};
  api_user_details:Object = {};
  filteredData:any;
  public filerFlag:boolean = false;
  selected_data:number=0;
  filter_data:any=0;
  load_moreLoading: boolean = false;
  get_user_url: string;
  pagination_url: string;
  constructor(
    private http: HttpClient,
    private apiSerivce: ApiService
  ) {
    this.get_user_url = '/getUserDetails';
    this.pagination_url = '/getUsersPagination';
   }
  ngOnInit() {
    this.loading_list = true;
    this.limit = 10;
    this.offset = 0;
    var data = {'limit':this.limit,'offset':this.offset};
    this.getUsers(data);
  }
  loadMore () {
    this.load_moreLoading = true;
    this.limit = 10;
    this.offset += this.limit;
    var data = {'limit':this.limit,'offset':this.offset};
    this.getUsers(data);
      setTimeout(()=>{
        this.load_moreLoading = false;
      },400);
	}
  getUsers(param){
    console.log(param);
    this.apiSerivce.post(this.pagination_url,param)
    .subscribe(data => {
      this.allUsers = this.allUsers.concat(data["users"]);
      this.count = data["count"];
      this.loading_list = false;
      this.onFilterChange(this.filter_data);
    },
      error => {
        console.log("Error :: " + error);
      }
    )
  }
  showUserDetails(user){
    this.show = true;
    this.userDetails = user;
    this.apiSerivce.get_with_param(this.get_user_url,user.user_id)
    .subscribe(
       data =>{
         this.api_user_details = data;
       },
         error => {
           console.log("Error :: " + error);
         }
    )
  }
  closeDetails(){
    this.show = false;
  }
  onFilterChange(role_id){
    this.filter_data = role_id;
    if(this.filter_data != "0"){
      this.filerFlag = true;
      this.filteredData = this.allUsers.filter(x => x.role_id == this.filter_data);
    }
    else{
      this.filerFlag = false;
    }
  }

}
