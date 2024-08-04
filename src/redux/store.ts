import { configureStore } from "@reduxjs/toolkit";
import tasksReducer, { TasksState } from "./taskSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = {
  tasks: TasksState;
};
export type AppDispatch = typeof store.dispatch;
