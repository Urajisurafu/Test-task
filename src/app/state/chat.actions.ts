import { Action } from "@ngrx/store";

export enum ActionTypes {
  Message = "[Chat Component] Message",
}

export class Message implements Action {
  readonly type = ActionTypes.Message;

  constructor(public payload: { username: string; message: string }) {}
}
