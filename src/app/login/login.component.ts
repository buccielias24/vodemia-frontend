import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any={};
  isLoggedIn = false;
  isLoginFailed=false;
  errorMessage='';
  roles:String[] = [];

  constructor(private authService: AuthService, private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()){
      this.isLoggedIn=true;
      this.roles=this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(){
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.headers.get("Authorization"));
        let tokenInfo=this.getDecodedAccesToken(data.headers.get("Authorization"));
        this.roles.push(tokenInfo.authorities[0].authority);
        this.tokenStorage.saveUser(tokenInfo);
        this.isLoginFailed = false;
        this.isLoggedIn=true;
        this.reloadPage();
      },
      err => {
        this.errorMessage=err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  getDecodedAccesToken(token:string):any{
    try{
      return jwt_decode(token);
    }catch(Error){
      return null;
    }
  }
  reloadPage(): void {
    window.location.reload();
}
}
