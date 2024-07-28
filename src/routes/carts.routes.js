import { Router } from 'express';
import cartsManager from '../dao/mongo/Managers/carts.js';
import { HttpStatus } from '../constants/httpStatusCodes.js';

const cartsRouter = Router();
const cartService = new cartsManager();

cartsRouter.post("/", async(req, res) => {
    try {
        const { products } = req.body;
        const result = await cartService.postCart(products);
        res.status(HttpStatus.CREATED).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.get("/:cid", async(req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartService.getCartById({ _id: cid });
        if (!cart) {
            return res.status(HttpStatus.NOT_FOUND).send({ status: 'error', error: 'Cart not found' });
        }
        res.status(HttpStatus.OK).send({ status: 'success', payload: cart });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.get("/", async(req, res) => {
    try {
        const carts = await cartService.getCarts();
        res.status(HttpStatus.OK).send({ status: 'success', payload: carts });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.post("/:cid/products/:pid", async(req,res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await cartService.postCartProduct(cid, pid, quantity);
        res.status(HttpStatus.OK).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.delete("/:cid/products/:pid", async(req, res) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartService.deleleProdByCart(cid, pid);
        res.status(HttpStatus.OK).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.put("/:cid", async(req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const result = await cartService.updateAllCart(cid, products);
        res.status(HttpStatus.OK).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.put("/:cid/products/:pid", async(req, res) => { 
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await cartService.updateQuantity(cid, pid, quantity);
        res.status(HttpStatus.OK).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})

cartsRouter.delete("/:cid", async(req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartService.deleteAllProd(cid);
        res.status(HttpStatus.OK).send({ status: 'success', payload: result });
    } catch (error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ status: 'error', error: error.message });
    }
})


export default cartsRouter;