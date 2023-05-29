import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import * as moment from "moment";
import { Task, CreateResponse } from "../interfaces/tasks.interface";

@Injectable({
  providedIn: "root",
})
export class TasksService {
  static url =
    "https://todo-list-fc30c-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient) {}

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format("DD-MM-YYYY")}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          return Object.keys(tasks).map((key) => ({ ...tasks[key], id: key }));
        })
      );
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(
        map((res) => {
          return { ...task, id: res.name };
        })
      );
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(
      `${TasksService.url}/${task.date}/${task.id}.json`
    );
  }
}
