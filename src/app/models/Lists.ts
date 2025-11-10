import { Tasks } from "./Tasks";

export interface Lists {
    id: string,
    name: string,
    category: string,
    userId: string,
    tasksID: Tasks[]
}