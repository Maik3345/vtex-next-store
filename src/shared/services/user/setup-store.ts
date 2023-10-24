import { endpoints } from "@/config";
import { UserType } from "@/shared";

export const setupStoreService = async (
  accountName: string,
  email: string
): Promise<UserType> => {
  // call a fetch with post method
  return fetch(`${endpoints.baseUrl}/api/setup-store`, {
    method: "post",
    body: JSON.stringify({ accountName, email }),
    headers: {
      credentials: "include",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
