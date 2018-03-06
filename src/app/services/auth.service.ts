import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isLogged:boolean=false;
  constructor() { }
  test(): string {
    return 'working';
  }
  setIsLogged(flag){
    if(flag == 0){
      this.isLogged = false;
    }
    else{
      this.isLogged = true;
    }
  }
}
