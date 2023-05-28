import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
} from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable()
export class AppService {
  private isAuthenticated: boolean;

  networkStatus: boolean = false;
  networkStatus$: Subscription = Subscription.EMPTY;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getData() {
    this.authService.isUserLoggedIn$.subscribe(
      (data) => (this.isAuthenticated = data)
    );
    if (this.networkStatus && this.isAuthenticated)
      return this.http.get("https://random-data-api.com/api/v2/users");
  }

  getOnlineStatus() {
    this.networkStatus = navigator.onLine;
    this.networkStatus$ = merge(
      of(null),
      fromEvent(window, "online"),
      fromEvent(window, "offline")
    )
      .pipe(map(() => navigator.onLine))
      .subscribe((status) => {
        this.networkStatus = status;
      });
  }

  getNumber(): Observable<number[]> {
    const myNumber$: Subject<number> = new Subject<number>();

    let resultArray = [];

    myNumber$
      .pipe(switchMap((val) => interval(500).pipe(map(() => val))))
      .subscribe((val) => {
        myNumber$.next(Math.round(Math.random() * 100));
        resultArray.push(val);
      });

    myNumber$.next(Math.round(Math.random() * 100));

    return new Observable((subscriber) => {
      setInterval(() => subscriber.next(resultArray), 2000);
    });
  }
}
