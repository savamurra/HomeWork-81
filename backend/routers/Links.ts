import express from "express";
import Link from "../models/Link";
import {DatabaseWithoutId} from "../types";
const Vigenere = require('caesar-salad').Vigenere;

const linksRouter = express.Router();

linksRouter.get("/", async (req, res,next) => {
    try {
        const result = await Link.find();
        res.send(result);
    } catch (e) {
        next(e)
    }
})

linksRouter.post("/", async (req, res,next) => {
    if (!req.body.originalUrl) {
        res.sendStatus(400).send({error: "Invalid URL"});
        return;
    }

    const shortedLink = Vigenere.Cipher('password').crypt(req.body.originalUrl).replace(/[^a-zA-Z0-9]/g, '').slice(0,7)


    const newLink: DatabaseWithoutId = {
        originalUrl: req.body.originalUrl,
        shortUrl: shortedLink,
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