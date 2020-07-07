import express from "express";
import {
  getAverageBalance,
  getLowestBalance,
  getHighestBalance,
  setPrivateBranch,
} from "../controller/clients.js";
import accountModel from "../models/accounts.js";

export const clientsRouter = express.Router();

clientsRouter.get("/average/:agencia", async (request, response) => {
  const { agencia } = request.params;
  try {
    const accounts = await accountModel.aggregate([
      {
        $group: {
          _id: "$agencia",
          media: {
            $avg: "$balance",
          },
        },
      },
    ]);
    const account = accounts.filter((account) => account._id === +agencia);
    return response.json({ media: account[0].media });
  } catch (error) {
    return response.status(500).json({ error });
  }
});

clientsRouter.get("/lowest/:qty", async (req, res) => {
  const { qty } = parseInt(req.params.qty);
  try {
    const accounts = await accountModel
      .find({})
      .sort({ balance: 1 })
      .limit(+qty);
    return res.json(accounts);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

clientsRouter.get("/highest/:qty", async (req, res) => {
  const qty = parseInt(req.params.qty);
  try {
    const accounts = await accountModel
      .find({})
      .sort({ balance: -1 })
      .limit(+qty);
    return res.json(accounts);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

clientsRouter.patch("/private", async (_, res) => {
  try {
    const privates = await setPrivateBranch();
    res.send(privates);
  } catch (err) {
    res.status(err.statusCode).send({ error: err.message });
  }
});
