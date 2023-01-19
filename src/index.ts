import {connection} from "../connection/database"
import Koa from 'koa';
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {CustomerController} from "./controllers/CustomerController";
import {AccountController} from "./controllers/AccountController";
import {BankController} from "./controllers/BankController";

const app = new Koa();
const router = new Router();
connection.initialize().then(() => console.log("connected to database"))
    .catch(err => console.error("error using data source initialize", err));

app.use(bodyParser());

const bankControllerInstance = new BankController();
router.post('/customer', CustomerController.create)
router.post('/account', AccountController.create)
router.post('/api/bank', bankControllerInstance.create)
router.put('/api/bank/:id', bankControllerInstance.update)
router.get('/api/bank', bankControllerInstance.getAllBank)
router.get('/api/bank/:id', bankControllerInstance.getBankById)
router.delete('/api/bank/:id', bankControllerInstance.deleteBankById)


app.use(router.routes()).use(router.allowedMethods());
const port = 8085;

app.listen(port, () => {
    console.log(`we are running at ${port}`)
});