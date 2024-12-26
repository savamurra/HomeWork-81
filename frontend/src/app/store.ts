import { configureStore } from "@reduxjs/toolkit";
import {linksReducer} from "../store/linkSlice.ts";


export const store = configureStore({
    reducer: {
        links: linksReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
