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
const bankControllerInstance = new BankController(connection);
router.post('/customer', CustomerController.create)
router.post('/account', AccountController.create)
router.post('/api/bank', (ctx)=>bankControllerInstance.createBank(ctx))
router.put('/api/bank/:id', (ctx)=>bankControllerInstance.updateById(ctx))
router.get('/api/bank', ctx => bankControllerInstance.getAllBank(ctx))
router.get('/api/bank/:id', (ctx)=>bankControllerInstance.getBankById(ctx))
router.delete('/api/bank/:id',(ctx)=> bankControllerInstance.deleteBankById(ctx))

// console.log(bankControllerInstance.uiu);
app.use(router.routes()).use(router.allowedMethods());
const port = 8085;

app.listen(port, () => {
    console.log(`we are running at ${port}`)
});