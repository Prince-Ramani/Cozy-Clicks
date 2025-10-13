import { fetcher } from "@/lib/utils/fetcher";
import type { ApiResponse } from "@/types/normalTypes";

import type { UserGetMe } from "@/types/userTypes";

export const getMe = async (): Promise<UserGetMe> => {
  return fetcher<UserGetMe>("/api/auth/getMe");
};

export const signupAPI = async (options: RequestInit): Promise<ApiResponse> => {
  return fetcher<ApiResponse>("/api/auth/signup", options);
};
