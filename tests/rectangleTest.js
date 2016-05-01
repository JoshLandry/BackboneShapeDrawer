describe('Rectangle', function () {
  var testRectangle;

  beforeEach(function () {
      testRectangle = new rectApp.Rectangle();
      // testRectangle = new Rectangle();
  });

  describe('with length 7 and width 4', function () {
    beforeEach(function () {
        testRectangle.set({
            height: 7,
            width: 4
        });
    });

    it('should have an area of 28', function() {
        expect(testRectangle.area()).toBe(28);  
    });
    it('should have a perimeter of 22', function() {
        expect(testRectangle.perimeter()).toBe(22);
    });

  });
});