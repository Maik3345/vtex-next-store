import { endpoints } from "@/config";
import { ProductType, buildQuery } from "@/shared";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData {
  products: ProductType[];
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { account } = req.query;
  console.log(req.query);
  const params = buildQuery(req.query);
  console.log({ params });

  if (!account || !params || params === "")
    return res.status(400).json({ products: [] });

  const { getProductsByTerm } = endpoints.vtex.search;
  const domain = `https://${account}.${endpoints.vtex.environment}`;
  const url = `${domain}${getProductsByTerm}?${params}`;
  console.log({ url });

  const response = await fetch(url, {
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}
