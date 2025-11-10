import { Users } from "src/app/models/Users";

export interface UserState {
    currentUser: Users | null;
    loading: Boolean;
    error: string | null;
};

export const initialUserState: UserState = {
    currentUser: null,
    loading: false,
    error: null
};