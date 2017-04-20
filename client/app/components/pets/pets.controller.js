import _ from 'lodash';

class PetsController {

  constructor(api, CONSTANTS) {
    Object.assign(this, {
      api,
      CONSTANTS
    });
  }

  $onInit() {
    const apiPromise = this.api.fetchData();
    apiPromise.then((data) => {

      this.cats = {};

      this.cats.maleOwner = this.sortByPetName(this.filterByPetType(this.groupPetsFrom(
        this.filterByGender(data, this.CONSTANTS.GENDERS.MALE)), this.CONSTANTS.PETS.CAT));

      this.cats.femaleOwner = this.sortByPetName(this.filterByPetType(
        this.groupPetsFrom(this.filterByGender(data, this.CONSTANTS.GENDERS.FEMALE)),
        this.CONSTANTS.PETS.CAT));
    });
  }

  filterByGender(owners, gender) {
    return _.filter(owners, (owner) => owner.gender === gender);
  }

  groupPetsFrom(owners) {
    return _.reduce(owners, (memo, owner) => {
      const pets = owner.pets || [];
      memo = memo.concat(pets);
      return memo;
    }, []);
  }

  filterByPetType(pets, petType) {
    return _.filter(pets, (pet) => pet.type === petType);
  }

  sortByPetName(pets) {
    return _.sortBy(pets, (pet) => pet.name);
  }
}

PetsController.$inject = [
  'api',
  'CONSTANTS'
]

export default PetsController;
