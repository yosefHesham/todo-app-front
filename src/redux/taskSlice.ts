import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  createTask,
  fetchTasks,
  updateTask,
  deleteTask,
  getSummary,
} from "../services/taskService";

export interface Task {
  _id: string;
  description: string;
  fromTime: Date;
  toTime: Date;
}

interface Summary {
  totalDuration: number;
  remainingHours: number;
  numOfTasks: number;
}

export interface TasksState {
  tasks: Task[];
  summary: Summary;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  summary: { totalDuration: 0, remainingHours: 0, numOfTasks: 0 },
  status: "idle",
  error: null,
};

// Async thunks
export const fetchTasksAsync = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async () => {
    const tasks = await fetchTasks();
    return tasks;
  }
);

export const createTaskAsync = createAsyncThunk<Task, Omit<Task, "_id">>(
  "tasks/createTask",
  async (taskData) => {
    const task = await createTask(taskData);
    return task;
  }
);

export const updateTaskAsync = createAsyncThunk<
  Task,
  { id: string; updates: Partial<Omit<Task, "_id">> }
>("tasks/updateTask", async ({ id, updates }) => {
  const task = await updateTask(id, updates);
  return task;
});

export const deleteTaskAsync = createAsyncThunk<Task, string>(
  "tasks/deleteTask",
  async (id) => {
    const task = await deleteTask(id);
    return task;
  }
);

export const getSummaryAsync = createAsyncThunk<Summary, string>(
  "tasks/getSummary",
  async (day) => {
    const summary = await getSummary(day);
    return summary;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTasksAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.status = "succeeded";
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error occurred";
      })
      .addCase(
        createTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.tasks.push(action.payload);
        }
      )
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          const index = state.tasks.findIndex(
            (task) => task._id === action.payload._id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      )
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.tasks = state.tasks.filter(
            (task) => task._id !== action.payload._id
          );
        }
      )
      .addCase(
        getSummaryAsync.fulfilled,
        (state, action: PayloadAction<Summary>) => {
          state.summary = action.payload;
        }
      );
  },
});

export default tasksSlice.reducer;
