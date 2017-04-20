import angular from 'angular';
import mockData from './mockData';

const PEOPLE_API_ENDPOINT = 'http://agl-developer-test.azurewebsites.net/people.json';

class ApiService {
  constructor($q, $http) {
    Object.assign(this, { $q, $http });
  }

  fetchData() {
    // TODO: cannot use given endpoint due to cross origin restrictions
    // return this.$http({ method: 'GET', url: PEOPLE_API_ENDPOINT });
     return this.$q.resolve(mockData);
  }
}

ApiService.$inject = ['$q', '$http'];

export default angular.module('app.service', []).service('api', ApiService).name;

