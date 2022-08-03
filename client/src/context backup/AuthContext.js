import {createContext, useReducer} from "react"
import AuthReducer from "./AuthReducer"

const INIT_STATE = {
    user: null,
    isFetching: false,
    error: false
}

export const AuthContext = createContext(INIT_STATE)

export const AuthContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE)
    return(
        <AuthContext.Provider 
            value = {{
                user:state.user, 
                isFetching:state.isFetching, 
                error:state.error,
                dispatch
            }}
        >
            {children}

        </AuthContext.Provider>
    )
}