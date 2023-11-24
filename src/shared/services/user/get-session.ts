import { endpoints } from "@/config";
import { UserType } from "@/shared";

export const getSessionService = async (email: string): Promise<UserType> => {
  return fetch(`${endpoints.baseUrl}/api/get-session?email=${email}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then((res) => res.json());
};
