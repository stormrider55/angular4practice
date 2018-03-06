import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import {UserFields} from "./user-fields";
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ApiService {

  private _baseURL = "http://localhost:8000/api";

     constructor(private http: HttpClient) {
     }

     getUsers(): Observable<UserFields[]> {
         return this.http
             .get(this._baseURL+'/getUsers')
             .map((response: Response) => {
                 return response;
             })
             .catch(this.handleError);
     }

     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }

}
