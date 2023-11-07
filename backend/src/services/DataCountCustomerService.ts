import prismaClient from "../prisma";

class DataCountCustomerService {
  async execute() {
    const dataCount = await prismaClient.customer.count();
    return { count: dataCount };
  }
}
export { DataCountCustomerService };
