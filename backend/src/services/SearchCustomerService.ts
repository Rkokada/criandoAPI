import prismaClient from "../prisma";

// class SearchCustomerService {
//   //   async execute() {
//   async filterRecords(criteria: any): Promise<any[]> {
//     return await prismaClient.customer.findMany({
//       where: criteria,
//     });
//   }
// }

// export { SearchCustomerService };
export const SearchCustomerService = {
  async filterRecords(criteria: any): Promise<any[]> {
    return await prismaClient.customer.findMany({
      where: criteria,
    });
  },
};
