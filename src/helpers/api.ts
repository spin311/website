// Base URL of the Go API in websiteApi/. Empty in development, where requests go
// to the dev server and fail, so callers must keep a fallback value.
const API_HOST = import.meta.env.VITE_API_HOST ?? "";

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_HOST}${path}`);
  if (!response.ok) {
    throw new Error(`GET ${path} failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}
