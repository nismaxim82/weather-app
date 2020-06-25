import Country from '../models/entries/Country';
import QueryBaseService from './QueryBaseService';

export default class CountryService extends QueryBaseService {
  // NOTE: free plan allow max limit 10 &limit=10
  public limit = 10;
  private api =
    'http://geodb-free-service.wirefreethought.com/v1/geo/countries';

  // eslint-disable-next-line class-methods-use-this
  public async getCountryByName(name: string) {
    let result: Country[];
    const url = this.api;
    const queryParams = new Map<string, any>();
    queryParams.set('limit', this.limit);
    queryParams.set('namePrefix', name);
    const response: any = await this.get({ url, queryParams });
    result = response.data;
    return result;
  }
}
