export interface Database {
    _id: string;
    shortUrl: string;
    originalUrl: string;
}

export type DatabaseWithoutId = Omit<Database, '_id'>