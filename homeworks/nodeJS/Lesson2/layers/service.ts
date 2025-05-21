import { getUser } from "./model.ts";

export const getUserService = () => {
  const user = getUser();

  return {
    message: `Hello ${user.name}`,
    time: new Date().toDateString()
  }
}