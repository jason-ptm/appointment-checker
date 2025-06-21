import { createContext, useMemo, useReducer, type Dispatch } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { darkTheme } from "../theme";
import { JWT_TOKEN, USER_DATA } from "../utils/constants";
import { initialState, reducer } from "./reducer";
import type { Action, State } from "./types";

type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

const Context = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

const getInitialState = (): State => {
  const token = localStorage.getItem(JWT_TOKEN);
  const user = localStorage.getItem(USER_DATA);
  if (token) {
    return {
      ...initialState,
      data: {
        ...initialState.data,
        accessToken: token,
        user: user ? JSON.parse(user) : initialState.data.user,
      },
    };
  }
  return initialState;
};

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState());

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Context.Provider value={contextValue}>{children}</Context.Provider>
    </ThemeProvider>
  );
};

export { Context, Provider };
