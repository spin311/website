import { useEffect, useState } from "react";

import { fetchJson } from "../helpers/api";

type ExtensionStats = {
  userCount?: number;
};

/**
 * Chrome Web Store user count of an extension, read through the website API.
 * Returns `fallback` until the API answers, and keeps it if the request fails.
 */
function useExtensionUsers(chromeId: string, fallback: number): number {
  const [users, setUsers] = useState(fallback);

  useEffect(() => {
    let isCurrent = true;
    fetchJson<ExtensionStats>(`/extension?id=${chromeId}`)
      .then((stats) => {
        if (isCurrent && stats.userCount) {
          setUsers(stats.userCount);
        }
      })
      .catch((error: unknown) => {
        console.error("Error fetching extension users:", error);
      });
    return () => {
      isCurrent = false;
    };
  }, [chromeId]);

  return users;
}

export default useExtensionUsers;
