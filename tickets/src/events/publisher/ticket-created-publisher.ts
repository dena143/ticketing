import { Publisher, Subjects, TicketCreatedEvent } from "@deptickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
