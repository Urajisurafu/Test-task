import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { FirstTaskComponent } from "./first-task/first-task.component";
import { AppService } from "./services/app.service";
import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./services/auth.service";
import { LandingPageComponent } from "./first-task/landing-page/landing-page.component";
import { DashboardComponent } from "./first-task/dashboard/dashboard.component";
import { InputMessageComponent } from "./fourth-task/input-message/input-message.component";
import { ThirdTaskComponent } from "./third-task/third-task.component";
import { ChatBoxComponent } from "./sixth-task/chat-box/chat-box.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { messageReducer } from "./state/chat.reducer";
import { MaterialModule } from "./material/material.module";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { CalendarComponent } from "./todo-list/calendar/calendar.component";
import { SelectorComponent } from "./todo-list/selector/selector.component";
import { OrganizerComponent } from "./todo-list/organizer/organizer.component";
import { MomentPipe } from "./pipes/moment.pipe";

@NgModule({
  declarations: [
    AppComponent,
    FirstTaskComponent,
    LandingPageComponent,
    DashboardComponent,
    InputMessageComponent,
    ThirdTaskComponent,
    ChatBoxComponent,
    TodoListComponent,
    CalendarComponent,
    SelectorComponent,
    OrganizerComponent,
    MomentPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      messagesStore: messageReducer,
    }),
  ],
  providers: [AppService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
