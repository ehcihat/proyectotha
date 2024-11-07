import { createSlice } from '@redux/toolkit'

export interface AuthState {
    isAuthenticated: boolean;
    userName: string;
    userRole: string;
}

const initialAuthState: AuthState = {
    isAuthenticated: false,
    userName: '',
    userRole: '',
}

const authSlice: createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload
            state.isAuthenticated = true
            state.userName = userData.name
            state.userRole = userData.role
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userName = '';
            state.userRole = '';
        },
        logout: (state) => {
            state = initialAuthState
    }


}
})
export const authActions = authSlice.actions 

export default authSlice.reducer