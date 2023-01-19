import Koa from 'koa';
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {BankController} from "../controllers/BankController";

const router = new Router();
const app = new Koa();
app.use(bodyParser());

export {
    router as bankRouter
}

