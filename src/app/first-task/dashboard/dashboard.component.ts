import { Component, OnDestroy, OnInit } from "@angular/core";
import { of, Subject, Subscription } from "rxjs";
import {
  catchError,
  delay,
  mergeMap,
  repeat,
  takeUntil,
  tap,
} from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  user = {};

  subscription: Subscription;

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.authService.logOut();
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private load() {
    this.subscription = of(0)
      .pipe(
        mergeMap(() => this.appService.getData().pipe(delay(2000))),
        takeUntil(this.unsubscribe),
        tap((res) => (this.user = res)),
        catchError((err) => of(err).pipe(delay(2000))),
        repeat()
      )
      .subscribe();
  }

  public logOut() {
    this.authService.logOut();
  }
}
