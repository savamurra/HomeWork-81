import {createSlice} from "@reduxjs/toolkit";
import {createLink, fetchLinkByUrl,} from "./linkThunk.ts";
import {ILink} from "../types";
import {RootState} from "../app/store.ts";

interface Link {
    oneLink: ILink | null;
    createLoading: boolean;
    oneFetching: boolean;
}

const initialState: Link = {
    oneLink: null,
    createLoading: false,
    oneFetching: false,
}

export const url = (state: RootState) => state.links.oneLink;
export const isCreat = (state: RootState) => state.links.createLoading;

const linkSlice = createSlice({
    name: "link",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLinkByUrl.pending, (state) => {
                state.oneFetching = true;
            })
            .addCase(fetchLinkByUrl.fulfilled, (state) => {
                state.oneFetching = false;
            })
            .addCase(fetchLinkByUrl.rejected, (state) => {
                state.oneFetching = false;
            })
            .addCase(createLink.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createLink.fulfilled, (state,{payload: oneLink}) => {
                state.createLoading = false;
                state.oneLink = oneLink
            })
            .addCase(createLink.rejected, (state) => {
                state.createLoading = false;
            });
    }
});

export const linksReducer = linkSlice.reducer;