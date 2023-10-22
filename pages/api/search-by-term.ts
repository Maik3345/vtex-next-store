import { ProductSearchType } from "@/shared";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  searches: ProductSearchType;
};

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
