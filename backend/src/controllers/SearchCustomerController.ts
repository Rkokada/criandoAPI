import { FastifyReply, FastifyRequest } from "fastify";
import { SearchCustomerService } from "../services/SearchCustomerService";

class SearchCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    try {
      const criteria = request.query;

      if (Object.keys("").length === 0) {
        throw new Error("Nenhum critério de filtro fornecido.");
      }

      const filteredRecords = await SearchCustomerService.filterRecords(
        criteria
      );
      return filteredRecords;
    } catch (error) {
      console.error("Erro ao filtrar registros:", error);
      throw new Error("NErro ao filtra registro.");
    }
  }
}
export { SearchCustomerController };

// class SearchCustomerController {
//     async handle(request: FastifyRequest, reply: FastifyReply) {

//         try {
//           const criteria = request.query;

//           if (Object.keys(criteria).length === 0) {
//             throw new Error('Nenhum critério de filtro fornecido.');
//           }

//           const filteredRecords = await SearchCustomerService.filterRecords(criteria);
//           return filteredRecords;
//         } catch (error) {
//           console.error('Erro ao filtrar registros:', error);
//           throw new Error('Nenhum critério de filtro fornecido.');
//         }
//       };

// //     const searchCustomerService = new SearchCustomerService();
// //     const customers = await searchCustomerService.execute();

// //     reply.send(customers);
// //   }
// }

// export { SearchCustomerController };
