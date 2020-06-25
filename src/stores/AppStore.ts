import { observable } from 'mobx';
import * as AppJson from '../../package.json';

export default class AppStore {
    version = AppJson.version;

    // NOTE: when application is change version, cache will be cleared
    @observable enableCache = true;
    @observable loading = true;
}