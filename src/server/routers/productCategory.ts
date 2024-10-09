import { router, procedure } from "@/server/trpc";
import { prisma } from "@/server/utils/prisma";
import { z } from "zod";

export const productCategoryRouter = router({
  list: procedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: { id: input.userId },
        include: { company: true },
      });
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.company) {
        throw new Error("Company not found");
      }
      if (user.company.industryId === null) {
        return null;
      }

      const productCategories = await prisma.productCategory.findMany({
        include: { products: true },
      });

      const sameIndustryCompanies = await prisma.industry.findUnique({
        where: { id: user.company.industryId },
        include: {
          companies: {
            include: { products: true },
          },
        },
      });

      const response = productCategories.map((productCategory) => {
        return {
          id: String(productCategory.id),
          name: productCategory.name,
          products: productCategory.products.map((product) => {
            return {
              id: String(product.id),
              name: product.name,
              description: product.description,
              price: product.price,
              usagePeriod: product.usagePeriod,
            };
          }),
          sameIndustryProducts: sameIndustryCompanies
            ? sameIndustryCompanies?.companies.flatMap((company) =>
                company.products.map((product) => {
                  return {
                    id: String(product.id),
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    usagePeriod: product.usagePeriod,
                  };
                }),
              )
            : [],
        };
      });

      return response;
    }),
});
