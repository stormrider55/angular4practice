import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoImagePath:string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.logoImagePath = '/app/assets/img/logo.png';
    this.auth.setIsLogged(1);
    console.log(this.auth.isLogged);
  }

}
