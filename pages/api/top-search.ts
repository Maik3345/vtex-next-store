import { TopSearchType } from "@/shared";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData extends TopSearchType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { account } = req.query;

  if (!account) return res.status(400).json({ searches: [] });

  const response = await fetch(
    `https://${account}.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/top_searches?locale=en-US`,
    {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const data = await response.json().then((data) => data.searches.slice(0, 5));
  res.status(200).json({ searches: data });
}
