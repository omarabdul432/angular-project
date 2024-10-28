import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { CurrentUser } from '../model/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  user: CurrentUser = {
    idToken: '',
    email: '',
    refreshToken: '',
    expiresIn: ''
  }
  userSub: Subscription = new Subscription()
  constructor(private auth: UserAuthService, private router: Router) { }


  ngOnInit(): void {
    this.auth.currentUser$.subscribe((res: any) => {
      this.user = res
    })
  }

  onlogout() {
    this.auth.logout()
    this.router.navigateByUrl('/')
  }

  ngonDestroy() {
    this.userSub.unsubscribe()
  }

}
