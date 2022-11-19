import { configureStore } from '@reduxjs/toolkit';
import chatRoomReducer from "../features/chatRoom/chatRoomSlice";

export const store = configureStore({
  reducer: {
    chatRoom: chatRoomReducer
  },
});
