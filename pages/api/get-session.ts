import { UserType } from "@/shared";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../lib/prisma";

interface ResponseData extends UserType {}

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | null>
) {
  const { email } = req.query;
  const session = await getSession({ req });

  console.log({ email, session });

  if (!email) {
    return res.status(401).json(null);
  }

  const user = await prisma.user.findFirst({
    where: { email: email as string },
  });
  console.log({ user });

  res.json(user);
}
