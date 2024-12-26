export interface ILink {
    _id: string;
    shortUrl: string;
    originalUrl: string;
}

export type LinkWithoutId = Omit<ILink, "_id">;