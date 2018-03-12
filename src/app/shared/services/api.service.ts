import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/Rx";
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable()
export class ApiService {

     constructor(private http: HttpClient) {
     }
     get_without_param(path: string): Observable<any> {
         return this.http
             .get(environment.api_url+path)
             .map((response: Response) => {
                 return response;
             })
             .catch(this.handleError);
     }
     get_with_param(path: string, params: HttpParams = new HttpParams()): Observable<any> {
         return this.http
             .get(environment.api_url+path+'/'+params)
             .map((response: Response) => {
                 return response;
             })
             .catch(this.handleError);
     }
     post(path: string,body: Object = {}): Observable<any> {
         return this.http
             .post(environment.api_url+path,JSON.stringify(body))
             .map((response: Response) => {
                 return response;
             })
             .catch(this.handleError);
     }
     put(path: string,body: Object = {}): Observable<any> {
         return this.http
             .put(environment.api_url+path,body)
             .map((response: Response) => {
                 return response;
             })
             .catch(this.handleError);
     }
     delete(path: string,param: string): Observable<any> {
         return this.http
             .delete(environment.api_url+path+'/'+param)
             .map((response: Response) => {
                 return response;
             })
             .catch(this.handleError);
     }
     private handleError(error: Response) {
         return Observable.throw(error.statusText);
     }

}
