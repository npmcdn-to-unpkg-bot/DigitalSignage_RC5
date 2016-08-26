
import {Component} from "@angular/core";
import { Router } from '@angular/router';
import {LoginService} from "./login-service";

@Component({
    selector: 'new-user'
    , template: `
<div>
            
<!--<a [routerLink]="['./sign-in']" class="btn"><span class="fa fa-user-plus"></span> Back</a>-->

            <div class="loginform">
                <div class="logo">
                    <img src="../../images/hero.png" alt="">
                </div>
                
                <div class="content">
                    <div class="panel" id="login">
                        <h3>Create Account</h3>
                        <hr>
                        <form (ngSubmit)="onSubmit(loginForm.value)" #loginForm="ngForm">                
                            <div class="form-group">
                                <md-input 
                                    placeholder="Email address" 
                                    name="username" 
                                    ngModel 
                                    required
                                    type="email" 
                                    style="width: 100%">
                                </md-input>
                            </div>
                            <div class="form-group">
                                <md-input 
                                    placeholder="Password"
                                    name="password"
                                    ngModel
                                    required
                                    minLength = "6"
                                    [type]="showPass ? 'text': 'password'" 
                                    style="width: 100%">
                                </md-input>
                            </div>                            
                            <md-checkbox [ngModelOptions]="{standalone: true}" [(ngModel)]="showPass" aria-label="Checkbox 1">
                                Show password
                            </md-checkbox>
                            <button class="btn btn-primary btn-lg btn-block" type="submit" value="New User">Create Account</button>
                        </form>
                        <a class="panel-footer" (click)="back()">Back</a>
                    </div>
                </div>
                
            </div>

</div>`

    , styles:[`

            sup.required {
                color: #D64242;
                font-size: 95%;
                top: -2px;
            }
    
    `]
})

export class NewUser{

    constructor(private router:Router, private loginService:LoginService){console.log('hello new-user!');}

    back(){
        this.router.navigate(["./sign-in"]);
    }

    onSubmit(value:any){
        console.log('onSubmit ', value);

        this.loginService.createAccount(value).subscribe((res)=>{
            console.log('onSubmit res', res);
        }, (err)=>{
            console.log('onSubmit error ', err);
            this.handleError(err); // = <any>err;
        });
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return errMsg;
    }
    
}