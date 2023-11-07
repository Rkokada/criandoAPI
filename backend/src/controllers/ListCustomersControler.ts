import { FastifyReply, FastifyRequest } from "fastify";
import { ListCustomersService } from "../services/ListCustomersService";

class ListCustomersControler {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listCustomerService = new ListCustomersService();
    const customers = await listCustomerService.execute();

    reply.send(customers);
  }
}

export { ListCustomersControler };
