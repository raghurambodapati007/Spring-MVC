import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  username:string  ='RaghuRam';
  password ='';
  inValidCredentials='Invalid Credentials';
  invalidLogin = false;

  //The below way of declaring in constructor is the way to use Dependency Injection
  constructor(private router:Router,
    private hardcodedAuthenticationService : HardcodedAuthenticationService,
    private basicAuthenticationService:BasicAuthenticationService) {}

  ngOnInit(): void {
  }
  
  handleLogin() {

      if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
          this.invalidLogin = false;
          this.router.navigate(['welcome',this.username]);
      }
      else{
        this.invalidLogin=true;
      }
  }

  handleBasicAuthLogin() {

    this.basicAuthenticationService.executeBasicAuthenticationService(this.username,this.password)
      .subscribe(
        data => {
          console.log(data)
          this.invalidLogin=false;
          this.router.navigate(['welcome', this.username]);
          
        },
        error => {
          console.log(error + " Error occured");
          this.invalidLogin = true;
        }
      )
  }

  handleJWTAuthLogin() {

    this.basicAuthenticationService.executeJWTAuthenticationService(this.username,this.password)
      .subscribe(
        data => {
          console.log(data)
          this.invalidLogin=false;
          this.router.navigate(['welcome', this.username]);
          
        },
        error => {
          console.log(error + " Error occured");
          this.invalidLogin = true;
        }
      )
  }


}
