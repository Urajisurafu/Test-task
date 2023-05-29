import { Component, OnInit } from "@angular/core";
import { TodoListService } from "../../services/todo-list.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TasksService } from "../../services/tasks.service";
import { Task } from "../../interfaces/tasks.interface";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-organizer",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"],
})
export class ListComponent implements OnInit {
  form: FormGroup;
  tasks: Task[] = [];

  constructor(
    public todoListService: TodoListService,
    private taskService: TasksService
  ) {}

  ngOnInit() {
    this.todoListService.date
      .pipe(switchMap((value) => this.taskService.load(value)))
      .subscribe((tasks) => {
        this.tasks = tasks;
      });

    this.form = new FormGroup({
      title: new FormControl("", [Validators.required]),
    });
  }

  submit() {
    const { title } = this.form.value;

    const task: Task = {
      title,
      date: this.todoListService.date.value.format("DD-MM-YYYY"),
    };

    this.taskService.create(task).subscribe(
      (task) => {
        this.tasks.push(task);
        this.form.reset();
      },
      (err) => console.log(err)
    );
  }

  remove(task: Task) {
    this.taskService.remove(task).subscribe(
      () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
      (err) => console.error(err)
    );
  }
}
