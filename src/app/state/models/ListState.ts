import { Lists } from "src/app/models/Lists";

export interface ListState {
    lists: Lists[];
    selectedListId: number | null;
    loading: boolean;
    error: string | null;
    filter: string | null;
}

export const initialState: ListState = {
    lists: [],
    selectedListId: null,
    loading: false,
    error: null,
    filter: null
};