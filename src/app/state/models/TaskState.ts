import { Tasks } from "src/app/models/Tasks";

export interface TaskState {
    tasks: Tasks[];
    selectedTaskId: string | null;
    loading: boolean;
    error: string | null;
}

export const initialState: TaskState = {
    tasks: [],
    selectedTaskId: null,
    loading: false,
    error: null
};