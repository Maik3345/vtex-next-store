import { endpoints } from "@/config";
import { ProductSearchType, objectToQueryString } from "@/shared";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData extends ProductSearchType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { account } = req.query;

  const params = objectToQueryString(req.query, ["account"]);

  if (!account)
    return res.status(400).json({
      products: [],
      recordsFiltered: 0,
      correction: null,
      fuzzy: "",
      operator: "",
      translated: false,
      pagination: null,
    });

  const { searchProductsByTerm } = endpoints.vtex.search;
  const domain = `https://${account}.${endpoints.vtex.environment}`;

  const response = await fetch(`${domain}${searchProductsByTerm}?${params}`, {
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  res.status(200).json(data);
}
