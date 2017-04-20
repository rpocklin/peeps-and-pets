import PetsModule from './pets'
import $ from 'jquery';

describe('Pets', () => {
  let $rootScope, $state, $location, $controller, $compile, $q,
      apiService, CONSTANTS, fetchDataCalled;

  beforeEach(window.module(PetsModule));

  const ownersAndPets = [
    {
      "name"  : "John Doe",
      "gender": "Male",
      "age"   : 23,
      "pets"  : [
        {
          "name": "Male cat 1",
          "type": "Cat"
        },
        {
          "name": "Male dog 1",
          "type": "Dog"
        },
        {
          "name": "Male cat 2",
          "type": "Cat"
        }
      ]
    },
    {
      "name"  : "Jane Doe",
      "gender": "Female",
      "age"   : 18,
      "pets"  : [
        {
          "name": "Female cat 1",
          "type": "Cat"
        }
      ]
    }
  ];

  beforeEach(inject(($injector) => {
    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    $state = $injector.get('$state');
    $location = $injector.get('$location');
    $compile = $injector.get('$compile');
    $q = $injector.get('$q');
    apiService = $injector.get('api');
    CONSTANTS = $injector.get('CONSTANTS');

    fetchDataCalled = false;

    apiService.fetchData = () => {
      fetchDataCalled = true;
      return $q.resolve(ownersAndPets);
    }
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
    it('default component should be pets', () => {
      $location.url('/pets');
      $rootScope.$digest();
      expect($state.current.component).to.eq('pets');
    });
  });

  describe('Controller', () => {
    // controller specs
    let template, scope, controller;
    let allPets, allCats;

    beforeEach(() => {

      scope = $rootScope.$new();
      template = $compile('<pets></pets>')(scope);
      scope.$apply();

      controller = template.controller('pets');

      allPets = ownersAndPets.reduce((memo, owners) => memo.concat(owners.pets), []);
      allCats = _.filter(allPets, (pet) => pet.type === CONSTANTS.PETS.CAT);
    });

    describe('filterByGender', () => {
      it('assigns correct pets to male owners', () => {
        expect(controller.filterByGender(ownersAndPets, CONSTANTS.GENDERS.MALE)).to.eql([ownersAndPets[0]]);
      });

      it('assigns correct pets to female owners', () => {
        expect(controller.filterByGender(ownersAndPets, CONSTANTS.GENDERS.FEMALE)).to.eql([ownersAndPets[1]]);
      });
    });

    describe('groupPetsFrom', () => {
      it('groups pets correctly', () => {
        expect(controller.groupPetsFrom(ownersAndPets)).to.eql(allPets);
      });
    });

    describe('filterByPetType', () => {
      it('filters cats correctly', () => {
        expect(controller.filterByPetType(allPets, CONSTANTS.PETS.CAT)).to.eql(allCats);
      });
    });

    describe('sortByPetName', () => {
      it('sorts by pet name correctly', () => {

        const expectedPetNameList = ['Female cat 1', 'Male cat 1', 'Male cat 2', 'Male dog 1'];
        const result = controller.sortByPetName(allPets).map((pet) => pet.name);

        expect(result).to.eql(expectedPetNameList);
      });
    });

    describe('$onInit', () => {
      it('should call fetchData', () => {
        expect(fetchDataCalled).to.be.true;
      });
      it('should have property cats', () => {
        expect(controller).to.have.property('cats');
      });
      it('should have property cats.maleOwner', () => {
        expect(controller.cats).to.have.property('maleOwner');
      });
      it('should have property cats.femaleOwner', () => {
        expect(controller.cats).to.have.property('femaleOwner');
      });
    });
  });

  describe('View', () => {
    // view layer specs.
    let scope, template;

    beforeEach(() => {
      scope = $rootScope.$new();
      template = $compile('<pets></pets>')(scope);
      scope.$apply();
    });

    it('has correct heading in template', () => {
      expect(template.find('h1').text()).to.contain('Peeps with Cats');
    });

    it('renders the male owner cats', () => {
      expect($(template).find('.male-owner-cats ul:first').html()).to.contain('Male cat 1');
      expect($(template).find('.male-owner-cats ul:last').html()).to.contain('Male cat 2');
    });

    it('renders the female owner cats', () => {
      expect($(template).find('.female-owner-cats ul:first').html()).to.contain('Female cat 1');
      expect($(template).find('.female-owner-cats ul:last').html()).to.contain('Female cat 1');
    });
  });
});
