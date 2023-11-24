import prisma from "../../../../lib/prisma";

export const getHomePageContent = async () => {
  return prisma.homePage.findMany({}).then((res) => res);
};
