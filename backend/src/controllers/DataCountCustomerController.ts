import { FastifyReply, FastifyRequest } from "fastify";
import { DataCountCustomerService } from "../services/DataCountCustomerService";

class DataCountCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const dataCountCustomerService = new DataCountCustomerService();
    const customers = await dataCountCustomerService.execute();

    reply.send(customers);
  }
}

export { DataCountCustomerController };
