import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Pusher from "pusher-js";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-chat-box",
  templateUrl: "./chat-box.component.html",
  styleUrls: ["./chat-box.component.scss"],
})
export class ChatBoxComponent {
  username = "username";
  messages = [];

  isMyMessage: boolean;

  textFormControl = new FormControl("");
  nameFormControl = new FormControl("userName", [Validators.required]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher("88afaa8e036ee3d60cb4", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data) => {
      this.messages.push(data);
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
