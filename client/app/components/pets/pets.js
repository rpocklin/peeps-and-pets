import angular from 'angular';
import uiRouter from 'angular-ui-router';
import petComponent from './pets.component';
import common from '../../common';

const petModule = angular.module('pets', [
  uiRouter,
  common
])
.config(($stateProvider, $urlRouterProvider) => {
  "ngInject";

  $urlRouterProvider.otherwise('/pets');

  $stateProvider
    .state('pets', {
      url: '/pets',
      component: 'pets'
    });
})
.component('pets', petComponent)
.name;

export default petModule;
