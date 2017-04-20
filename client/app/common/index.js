import angular from 'angular';
import ApiService from './api/api.service';
import Constants from './constants';

export default angular.module('app.common', [
  ApiService,
  Constants
]).name;
