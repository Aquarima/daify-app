import {User} from "./user";

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
}
