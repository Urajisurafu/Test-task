import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-first-task",
  templateUrl: "./first-task.component.html",
  styleUrls: ["./first-task.component.scss"],
})
export class FirstTaskComponent implements OnInit, OnDestroy {
  public isUserLoggedIn: boolean;

  constructor(public appService: AppService, public authService: AuthService) {
    this.checkNetworkStatus();
  }

  ngOnInit() {
    this.authService.logOut();
    this.authService.isUserLoggedIn$.subscribe(
      (data) => (this.isUserLoggedIn = data)
    );
  }

  ngOnDestroy(): void {
    this.appService.networkStatus$.unsubscribe();
    // this.authService.isUserLoggedIn$.unsubscribe();
  }

  checkNetworkStatus() {
    this.appService.getOnlineStatus();
  }
}
