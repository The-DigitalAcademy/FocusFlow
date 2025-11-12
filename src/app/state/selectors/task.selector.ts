import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TaskState } from "../models/TaskState";


export const selectListFeature = createFeatureSelector<TaskState>('task');

export const selectTaskById = (taskId: string) =>
  createSelector(
    (state: any) => state.task as TaskState,
    (taskState: TaskState) => taskState.tasks.find(t => t.id === taskId) ?? null
  );