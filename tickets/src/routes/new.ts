import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, validateRequest } from "@deptickets/common";

import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publisher/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { title, price } = req.body;

      const ticket = await Ticket.build({
        title,
        price,
        userId: req.currentUser!.id,
      });
      // kdfjkalsjfl;kdajsl;fja
      // jfdklajflkdjsalkfjlksadjfkldasj
      // jfdklsajflkajsdlkfjlkasjdf
      // kdjflasjdflkjklasjklfjdklfj
      await ticket.save();

      await new TicketCreatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      });

      res.status(201).send(ticket);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error" });
    }
  }
);

export { router as createTicketRouter };
