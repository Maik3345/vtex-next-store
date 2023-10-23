import { TopSearchType } from "@/shared";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData extends TopSearchType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { account, term } = req.query;

  if (!account || !term) return res.status(400).json({ searches: [] });

  const response = await fetch(
    `https://${account}.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/search_suggestions?query=${term}`,
    {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}
