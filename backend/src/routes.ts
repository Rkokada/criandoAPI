import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { CreateCustomerController } from "./controllers/CreateCustomerController";
import { DataCountCustomerController } from "./controllers/DataCountCustomerController";
import { DeleteCustomerController } from "./controllers/DeleteCustomerController";
import { ListCustomersControler } from "./controllers/ListCustomersControler";
import { SearchCustomerController } from "./controllers/SearchCustomerController";

export async function routes(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastify.get(
    "/teste",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return { ok: true };
    }
  );
  fastify.post(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateCustomerController().handle(request, reply);
    }
  );
  fastify.get(
    "/customers",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new ListCustomersControler().handle(request, reply);
    }
  );
  fastify.delete(
    "/customer",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteCustomerController().handle(request, reply);
    }
  );
  fastify.get(
    "/customer/data-count",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DataCountCustomerController().handle(request, reply);
    }
  );
  fastify.get(
    "/customer/filter?campo=${searchTerm}",
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new SearchCustomerController().handle(request, reply);
    }
  );
}
