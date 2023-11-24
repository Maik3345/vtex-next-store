"use server";

import { cookies } from "next/headers";

export async function setCookieShop(vtexAccountName: string) {
  cookies().set("vtex_account", vtexAccountName);
}
