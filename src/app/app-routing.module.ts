import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FirstTaskComponent } from "./first-task/first-task.component";
import { DashboardComponent } from "./first-task/dashboard/dashboard.component";
import { LandingPageComponent } from "./first-task/landing-page/landing-page.component";
import { InputMessageComponent } from "./fourth-task/input-message/input-message.component";
import { ThirdTaskComponent } from "./third-task/third-task.component";
import { ChatBoxComponent } from "./sixth-task/chat-box/chat-box.component";

const itemRoutes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "dashboard", component: DashboardComponent },
];

const routes: Routes = [
  { path: "first-task", component: FirstTaskComponent, children: itemRoutes },
  { path: "third-task", component: ThirdTaskComponent },
  { path: "fourth-task", component: InputMessageComponent },
  { path: "sixth-task", component: ChatBoxComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
