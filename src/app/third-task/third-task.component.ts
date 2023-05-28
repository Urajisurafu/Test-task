import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-third-task",
  templateUrl: "./third-task.component.html",
  styleUrls: ["./third-task.component.scss"],
})
export class ThirdTaskComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor(public appService: AppService) {}

  ngOnInit() {
    this.subscription = this.appService.getNumber().subscribe(console.log);
  }

  ngOnDestroy() {
    console.clear();
    this.subscription.unsubscribe();
  }
}
