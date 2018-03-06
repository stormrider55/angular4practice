import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-databind',
  templateUrl: './databind.component.html',
  styleUrls: ['./databind.component.css']
})
export class DatabindComponent implements OnInit {
hello = "Say Hello";
  constructor(private http: HttpClient) { }

  ngOnInit() {

    // This part is related to getting data from api......
    this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {
      console.log(data);
    });
//************************ends section******************
//This part is related to posting data to api.....
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
      //Section ends.............
  }
imageDisplay = "https://angular.io/assets/images/logos/angular/angular.svg";

sayHello(){
return this.hello = "Say Hi";
}

showvalue(event){
console.log(event.target.value);
}

}
