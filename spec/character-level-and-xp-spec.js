describe("Character - Level & Experience", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("experiencePoints", function() {

    it("defaults to 0", function() {
      expect(subject.experiencePoints()).toBe(0);
    });

    it("can be changed", function() {
      subject.experiencePoints(1500);
      expect(subject.experiencePoints()).toBe(1500);
    });

  });

  describe("level", function() {

    it("defaults to 1", function() {
      expect(subject.level()).toBe(1);
    });

    it("doesn't increase for less than 1000 experience points", function() {
      subject.experiencePoints(999);
      expect(subject.level()).toBe(1);
    });

    it("increase by 1 for 1000 experience points", function() {
      subject.experiencePoints(1000);
      expect(subject.level()).toBe(2);
    });

    it("increase by 2 for 2000 experience points", function() {
      subject.experiencePoints(2000);
      expect(subject.level()).toBe(3);
    });

  });

});
