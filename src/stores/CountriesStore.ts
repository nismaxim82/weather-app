import { action, observable } from 'mobx';
import Country from '../models/entries/Country';
import ServicesStore from './ServicesStore';

export default class CountriesStore {
    servicesStore: ServicesStore;

    @observable filter = '';
    @observable countries: Country[] = [];

    private _fetching = false;

    constructor(servicesStore: ServicesStore) {
        this.servicesStore = servicesStore;
    }

    @action getCountryByName = async (name: string) => {
        if (this._fetching) {
            setTimeout(() => {
                this.getCountryByName(name);
            }, 100);
            return;
        }
        const enoughData = name && this.filter
            && name.startsWith(this.filter)
            && this.countries.length < this.servicesStore.countryService.limit;
        this.filter = name;
        if (this.filter) {
            if (!enoughData) {
                this._fetching = true;
                this.countries = await this.servicesStore.countryService.getCountryByName(this.filter);
                this._fetching = false;
            }
        } else {
            this.countries = [];
        }
    }
}