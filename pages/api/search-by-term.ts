import { ProductSearchType } from "@/shared";
import type { NextApiRequest, NextApiResponse } from "next";

interface ResponseData extends ProductSearchType {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    account,
    term,
    simulationBehavior,
    count,
    page,
    sort,
    locale,
    hideUnavailableItems,
  } = req.query;

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

  const response = await fetch(
    `https://${account}.vtexcommercestable.com.br/api/io/_v/api/intelligent-search/product_search/?query=${term}&simulationBehavior=${simulationBehavior}&count=${count}&page=${page}&sort=${sort}&locale=${locale}&hideUnavailableItems=${hideUnavailableItems}`,
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
