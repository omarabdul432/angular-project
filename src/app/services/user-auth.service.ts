import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser, User } from '../model/user';
import { BehaviorSubject } from 'rxjs';


const baseURL = 'https://identitytoolkit.googleapis.com/v1/accounts'
const API_KEY = 'AIzaSyALRMOKo6H91KBytkPzxX3C7LHOsIH_vwg'
@Injectable({
  providedIn: 'root'
})

export class UserAuthService {

  private currentUser = new BehaviorSubject<CurrentUser | null>(null)
  currentUser$ = this.currentUser.asObservable()


  constructor(private http: HttpClient, private router: Router) { }

  register(user: User) {
    const registerModel = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    console.log(registerModel)
    this.http.post(baseURL + `:signUp?key=${API_KEY}`, registerModel).subscribe((res: any) => {
      const users = {
        idToken: res.idToken,
        email: res.email,
        refreshToken: res.refreshToken,
        expiresIn: res.expiresIn
      }
      this.currentUser.next(users)
      this.setLocalStorage(users)
      this.router.navigateByUrl('/')
      // console.log(res)
      // console.log(users)
    })
  }
  setLocalStorage(user: CurrentUser) {
    localStorage.setItem('user', JSON.stringify(user))
  }


  login(user: User) {
    const loginModel = {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    }
    console.log(loginModel)
    this.http.post(baseURL + `:signInWithPassword?key=${API_KEY}`, loginModel).subscribe((res: any) => {
      const user = {
        idToken: res.idToken,
        email: res.email,
        refreshToken: res.refreshToken,
        expiresIn: res.expiresIn
      }
      this.currentUser.next(user)
      this.localstorage(user)
      this.router.navigateByUrl('/')
    })
  }

  // autologin(){

  //   var storeduser=localStorage.getItem('login')
  //   if(storeduser){
  //     const user:CurrentUser=JSON.parse(storeduser)
  //     if(user){
  //       this.currentUser.next(user)
  //     }
  //   }
  // }

  logout() {
    alert("Are you sure?")
    this.removelocalstorage()
    this.currentUser.next(null)
  }
  localstorage(user: CurrentUser) {
    localStorage.setItem('login', JSON.stringify(user))
  }

  removelocalstorage() {
    localStorage.removeItem('login')
  }
}
