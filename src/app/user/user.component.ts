import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../model/user';
import { CommonModule } from '@angular/common';
import { UserAuthService } from '../services/user-auth.service';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

export class UserComponent {
  constructor(private auth:UserAuthService){}
  isRegister:boolean=false
  user:User={
    email:'',
    password:''
  }

  onRegister(){
    this.isRegister=!this.isRegister
  }

  onSubmit(form:NgForm){
    this.user.email=form.value.email
    this.user.password=form.value.password
    // console.log(this.user)
    form.reset()
    if(this.isRegister){
      this.auth.register(this.user)
    }else{
      this.auth.login(this.user)
    }
  }

 
}
