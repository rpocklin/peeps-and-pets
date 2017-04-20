import ApiService from './api.service'
import mockData from './mockData';

describe('ApiService', () => {
  let $rootScope;
  let service;

  beforeEach(window.module(ApiService));

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    service = $injector.get('api');
  }));

  describe('ApiService', () => {
    describe('fetchData', () => {

      it('returns the mockData', (done) => {
        service.fetchData().then((data) => {
          expect(data).to.equal(mockData);
          done();
        });

        $rootScope.$digest();
      });
    });
  });
});
