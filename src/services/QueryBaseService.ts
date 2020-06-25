export default abstract class QueryBaseService {
  private worker: any;

  constructor() {
    // window.Worker
    // if (appConfig.WEB) {
    //     this.worker = new Worker(`${appConfig.BASE_URL}/fetch-worker.js`)
    // } else {
    this.worker = {
      postMessage: async (url: string) => {
        const response = await fetch(url);
        // const response = await fetch(url, {
        //     mode: 'no-cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        const json = await response.json();
        this.worker.onmessage({ data: { json } });
      },
    };
    // }
  }

  // TODO: add switch case for the different types conversion to string
  public static serialize(model: any, params: Map<string, string>) {
    const paramsResult = new Map<string, string>(params);
    Object.keys(model).forEach((k) => {
      if (model[k] !== undefined) {
        paramsResult.set(k, model[k]);
      }
    });
    return paramsResult;
  }

  // eslint-disable-next-line class-methods-use-this
  private parseQueryParams({ queryParams }: any) {
    let queryString = '';
    if (!queryParams) {
      return queryString;
    }
    queryParams.forEach((value: string, key: string) => {
      queryString += `&${key}=${value}`;
    });
    return queryString;
  }

  // eslint-disable-next-line class-methods-use-this
  private parsePostQueryParams({ queryParams }: any) {
    const body = new FormData();
    if (!queryParams) {
      return body;
    }
    queryParams.forEach((value: string, key: string) => {
      body.append(key, value);
    });
    return body;
  }

  public get<T>({ url, queryParams }: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const queryString = this.parseQueryParams({ queryParams });
      this.worker.onmessage = ({ data }: any) => {
        resolve(data.json);
      };
      try {
        console.log(`GET: ${url}?${queryString}`);
        this.worker.postMessage(`${url}?${queryString}`);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }

  public post<T>({ url, queryParams }: any): Promise<T> {
    throw new Error('Not realized yet');
    // eslint-disable-next-line no-unreachable
    const body = this.parsePostQueryParams({ queryParams });
    // eslint-disable-next-line no-unused-vars
    return new Promise<T>((resolve, reject) => {
      const request = async () => {
        const response = await fetch(url, {
          method: 'POST',
          // headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/x-www-form-urlencoded'
          // },
          mode: 'no-cors',
          body,
          // body: JSON.stringify(body)
        });
        // const json = await response.json()
        console.log(response);
      };
      request();
    });
  }
}
