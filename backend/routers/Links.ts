import express from "express";
import Link from "../models/Link";
import {DatabaseWithoutId} from "../types";

const linksRouter = express.Router();

const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};


linksRouter.get("/:url", async (req, res,next) => {
   const url = req.params.url;

    try {
        const result = await Link.findOne({shortUrl: url});
        if (result) {
            res.status(301).redirect(result.originalUrl);
            return;
        } else {
            res.status(404).send("link not found!");
            return;
        }
    } catch (e) {
        next(e)
    }
})

linksRouter.post("/", async (req, res,next) => {
    if (!req.body.originalUrl) {
        res.sendStatus(400).send({error: "Invalid URL"});
        return;
    }

    const newLink: DatabaseWithoutId = {
        originalUrl: req.body.originalUrl,
        shortUrl: generateRandomString(6)
    }

    try {
        const link = new Link(newLink);
        await link.save();
        res.send(link);
    } catch (e) {
        next(e)
    }
})

export default linksRouter;