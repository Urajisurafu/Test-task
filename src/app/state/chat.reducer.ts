import { ActionTypes, Message } from "./chat.actions";

export const initialState = {
  messagesStore: [],
};

export function messageReducer(state = initialState, action: Message) {
  switch (action.type) {
    case ActionTypes.Message: {
      return { messagesStore: [...state.messagesStore, action.payload] };
    }

    default:
      return state;
  }
}
