import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    roomId: null
}

const chatRoomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        setRoomId: (state, action) => {
            state.roomId = action.payload.roomId;
        }
    }
});

export const { setRoomId } = chatRoomSlice.actions

export const selectRoomId = state => state.chatRoom.roomId;

export default chatRoomSlice.reducer