export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha3Code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  borders: string[];
  nativeName: string;
  currencies: Currency[];
  languages: Language[];
  flag: string;
}
