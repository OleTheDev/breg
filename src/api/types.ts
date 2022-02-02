// Generert kode - ikke garantert helt rett ift API, men jeg tror det er ca ok

export interface singleCompanyInterface {
  organisasjonsnummer: string;
  navn: string;
  organisasjonsform: Organisasjonsform;
  hjemmeside?: string;
  registreringsdatoEnhetsregisteret: Date;
  registrertIMvaregisteret: boolean;
  naeringskode1: InstitusjonellSektorkode;
  antallAnsatte: number;
  forretningsadresse: Forretningsadresse;
  stiftelsesdato: Date;
  institusjonellSektorkode?: InstitusjonellSektorkode;
  registrertIForetaksregisteret: boolean;
  registrertIStiftelsesregisteret: boolean;
  registrertIFrivillighetsregisteret: boolean;
  konkurs: boolean;
  underAvvikling: boolean;
  underTvangsavviklingEllerTvangsopplosning: boolean;
  maalform: string;
  _links: Links;
}

export interface companiesInterface {
  _embedded: Embedded;
  _links: Links;
  page: Page;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Forretningsadresse {
  land: string;
  landkode: string;
  postnummer: string;
  poststed: string;
  adresse: string[];
  kommune: string;
  kommunenummer: string;
}

export interface InstitusjonellSektorkode {
  kode: string;
  beskrivelse: string;
}

export interface Organisasjonsform {
  kode: string;
  beskrivelse: string;
  _links: Links;
}

export interface Embedded {
  enheter: singleCompanyInterface[];
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}
