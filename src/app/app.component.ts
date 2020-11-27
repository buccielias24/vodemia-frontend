import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  isLoggedIn=false;
  showAdminBoard=false;
  username:string;
  title = 'Angular8JwtAuth';

  constructor(private tokenStorageService: TokenStorageService){}

  ngOnInit(){
    this.isLoggedIn=!!this.tokenStorageService.getToken();

    if(this.isLoggedIn){
      const user=this.tokenStorageService.getUser();
      this.roles=user.authorities[0].authority;

      this.showAdminBoard=this.roles.includes('ROLE_ADMIN');

      this.username=user.username;
    }
  }
  logout(){
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}