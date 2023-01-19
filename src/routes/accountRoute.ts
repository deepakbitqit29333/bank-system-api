import Koa from 'koa';
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {CustomerController} from '../controllers/CustomerController'
import {AccountController} from '../controllers/AccountController'

const router = new Router();
const app = new Koa();
app.use(bodyParser());


export {
    router as accountRouter
}

