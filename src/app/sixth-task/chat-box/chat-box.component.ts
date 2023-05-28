import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Pusher from "pusher-js";
import { FormControl, Validators } from "@angular/forms";
import { Message } from "../../state/chat.actions";
import { select, Store } from "@ngrx/store";

@Component({
  selector: "app-chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.scss"],
})
export class ChatBoxComponent {
  username = "username";
  messages = [];

  textFormControl = new FormControl("");
  nameFormControl = new FormControl("userName", [Validators.required]);

  constructor(
    private http: HttpClient,
    private store: Store<{ count: number; messagesStore: any }>
  ) {
    store.pipe(select("messagesStore")).subscribe((data) => {
      this.messages = data.messagesStore;
    });
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher("88afaa8e036ee3d60cb4", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      this.store.dispatch(
        new Message({
          username: data.username,
          message: data.message,
        })
      );
    });
  }

  submit(): void {
    if (this.nameFormControl.value && this.textFormControl.value) {
      this.http
        .post("http://localhost:8000/app/messages", {
          username: this.nameFormControl.value,
          message: this.textFormControl.value,
        })
        .subscribe();
    }
  }
}
