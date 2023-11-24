import prisma from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { UserType } from "@/shared";

interface ResponseData extends UserType {}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  const { accountName, email } = req.body;

  if (!email) {
    return res.status(401).json(null);
  }

  const result = await prisma.user.update({
    where: { email: email },
    data: {
      vtexAccountName: accountName,
    },
  });
  res.json(result);
}
