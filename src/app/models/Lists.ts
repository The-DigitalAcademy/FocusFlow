import { Tasks } from "./Tasks";

export interface Lists {
    id: number,
    name: string,
    category: string,
    tasksID: Tasks[]
}