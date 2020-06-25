import { observable } from 'mobx';
import CountryService from '../services/CountryService';
import CacheService from '../services/CacheService';

export default class ServicesStore {
    @observable cache: CacheService;
    @observable countryService: CountryService;

    constructor(cache: CacheService,
        countryService: CountryService) {
        this.cache = cache;
        this.countryService = countryService;
    }
}