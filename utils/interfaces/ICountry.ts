export interface ICountryListItem {
    name: {
        common: string;
    };
    flag: string;
    population: number;
    cca3: string;
}

export interface ICountrySingle {
    name: {
        common: string;
    };
    flag: string;
    population: number;
    cca3: string;
    borders: [];
    maps: {
        googleMaps: string;
    }
}
