import { ProfileResponseType } from "..";

/**
 * The function `getProfileService` makes an API call to retrieve a random user profile and returns a
 * Promise that resolves to the response data.
 * @returns a Promise that resolves to a response of type ProfileResponseType.
 */
export const getProfileService = (): Promise<ProfileResponseType> => {
  return fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((res: ProfileResponseType) => res);
};
