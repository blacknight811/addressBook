'use strict';

describe('myApp.create module', function() {

  beforeEach(module('myApp.view2'));

  describe('create controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});