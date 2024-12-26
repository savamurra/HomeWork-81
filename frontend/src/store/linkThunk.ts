import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILink, LinkWithoutId} from "../types";
import axiosApi from "../axiosApi.ts";


export const createLink = createAsyncThunk<ILink, LinkWithoutId>(
    "link/createLink",
    async (link) => {
        const response = await axiosApi.post<ILink>("/link", link);
        return response.data || [];
    },
);


export const fetchLinkByUrl = createAsyncThunk<void, string>(
    "link/fetchLinkByUrl",
    async (url) => {
       return  await axiosApi(`/link/${url}`);
    },
);

