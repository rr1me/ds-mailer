import express from "express";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import * as process from "process";
import discordBot from "./discordBot";

dotenv.config();

const app = express();
const token = process.env.TOKEN!;
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

discordBot.initialize(token);

app.listen(port, () => {
    console.log("API running on port " + port);
});


