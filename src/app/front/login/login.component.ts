import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth/auth.service';
import { UserService } from 'src/app/shared/_services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
      let returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.subscription = this.auth.user$.subscribe(user => {
        if (user) {
          userService.save(user);
          
          router.navigateByUrl(returnUrl);
        }
      });
  }

  login() {
    this.auth.login();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
