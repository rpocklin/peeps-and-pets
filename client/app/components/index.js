import angular from 'angular';
import Pets from './pets/pets';

let componentModule = angular.module('app.components', [
  Pets
])
.name;

export default componentModule;
