import Country from '../models/entries/Country';
import QueryBaseService from './QueryBaseService';

export default class CountryService extends QueryBaseService {
  private limit = 10;
  // NOTE: free plan allow max limit 10 &limit=10
  private api =
    'http://geodb-free-service.wirefreethought.com/v1/geo/countries';

  // eslint-disable-next-line class-methods-use-this
  public async getCountryByName(name: string) {
    const result: Country[] = [];
    const url = this.api;
    const params = new Map<string, any>();
    params.set('limit', this.limit);
    params.set('namePrefix', name);
    const data = await this.get({ url, params });
    console.log(data);
    return result;
  }
}
