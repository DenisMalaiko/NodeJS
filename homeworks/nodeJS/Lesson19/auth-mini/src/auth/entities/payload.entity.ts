import { UserResponse } from "../../users/entities/user.entity";

export type Payload = {
  accessToken: string;
  refreshToken: string;
  user: UserResponse
}