import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, timer } from "rxjs";

@Injectable()
export class AuthService {
  public isUserLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {}

  logIn(): void {
    this.isUserLoggedIn$.next(true);
    timer(400)
      .pipe()
      .subscribe(() => {
        this.router.navigate(["./first-task/dashboard"]);
      });
  }

  logOut(): void {
    this.isUserLoggedIn$.next(false);
    this.router.navigate(["./first-task"]);
  }
}
