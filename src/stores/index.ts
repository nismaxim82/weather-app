import CacheService from "../services/CacheService";
import CountryService from "../services/CountryService";
import AppStore from "./AppStore";
import CountriesStore from "./CountriesStore";
import ServicesStore from "./ServicesStore";

const appStore = new AppStore();
const countryService = new CountryService();
const cacheService = new CacheService(appStore);
const servicesStore = new ServicesStore(cacheService, countryService);
const countriesStore = new CountriesStore(servicesStore);

const stores = {
    appStore,
    servicesStore,
    countriesStore,
};

export default stores;