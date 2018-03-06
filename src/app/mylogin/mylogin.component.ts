import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.css']
})
export class MyloginComponent implements OnInit {
  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
    this.auth.setIsLogged(0);
    console.log(this.auth.isLogged);
  }
  login(){
    this.auth.setIsLogged(1);
    this.router.navigate(['/home']);
    console.log(this.auth.isLogged);
  }

}
