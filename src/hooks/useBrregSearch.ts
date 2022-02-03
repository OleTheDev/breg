import { useEffect, useState } from "react";
import { searchBrreg, SearchBrregResult } from "../api/brreg";

interface Params {
  query: string;
}

export function useBrregSearch({ query }: Params) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchBrregResult[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const searchBy = query.match(/^\d+$/) ? "organisasjonsnummer" : "navn";
        const res = await searchBrreg({
          query,
          searchBy,
        });

        setResult(res);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  return { result, loading };
}
