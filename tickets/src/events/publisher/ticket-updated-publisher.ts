import { Publisher, Subjects, TicketUpdatedEvent } from "@deptickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
