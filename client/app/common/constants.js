import angular from 'angular';

const Constants = {
  GENDERS: {
    MALE  : 'Male',
    FEMALE: 'Female'
  },
  PETS: {
    CAT: 'Cat'
  }
};

export default angular.module('app.constants', []).constant('CONSTANTS', Constants).name;
