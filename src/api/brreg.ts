import axios from "axios";
import { companiesInterface } from "./types";

export interface SearchBrregResult {
  navn: string;
  beskrivelse: string;
  organisasjonsnummer: string;
  hjemmeside?: string;
  konkurs: boolean;
  stiftelsesdato: Date;

  forretningsadresse: {
    land: string;
    kommune: string;
  };
}

const client = axios.create({
  baseURL: "https://data.brreg.no/enhetsregisteret/api/",
  headers: {
    accept: "application/json",
  },
});

/**
 * Søker i brreg, normaliserer data tidlig til et "enkelt" format resten av app-en kan konsumere
 */
export async function searchBrreg({
  query,
  searchBy,
}: {
  query: string;
  searchBy: "organisasjonsnummer" | "navn";
}): Promise<SearchBrregResult[]> {
  if (!query) return [];

  const {
    data: {
      _embedded: { enheter },
    },
  } = await client.get<companiesInterface>("enheter", {
    params: { [searchBy]: query },
  });

  return enheter.map(({ hjemmeside, ...enhet }) => ({
    ...enhet,
    beskrivelse: enhet.institusjonellSektorkode?.beskrivelse ?? "",
    hjemmeside:
      hjemmeside && !hjemmeside.includes("http")
        ? `https://${hjemmeside}`
        : hjemmeside,
  }));
}
