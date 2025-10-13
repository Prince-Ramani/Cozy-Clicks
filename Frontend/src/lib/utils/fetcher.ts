export class FetchError extends Error {
  status?: number;
  data?: any;

  constructor(status?: number, message: string, data?: any) {
    super(message);
    this.name = "FetchError";
    this.status = status;
    this.data = data;
  }
}

export const fetcher = async <T>(
  url: string,
  options?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, options);

  let data: any = {};
  try {
    data = await response.json();
  } catch (err) {
    console.warn("Failed to parse JSON: ", err);
    data = {};
  }

  if (!response.ok || "error" in data) {
    const message = data?.error || data?.message || "Request failed";
    throw new FetchError(response.status, message, data);
  }

  return data as T;
};
