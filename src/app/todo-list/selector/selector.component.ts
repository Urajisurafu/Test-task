import { Component } from "@angular/core";
import { TodoListService } from "../../services/todo-list.service";

@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"],
})
export class SelectorComponent {
  constructor(public todoList: TodoListService) {}

  setMonth(dir: number) {
    this.todoList.changeMonth(dir);
  }
}
