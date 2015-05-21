describe("Character - Hit Points", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("maxHitPoints", function() {

    beforeEach(function() {
      subject.experiencePoints(2000);
    });

    it("defaults to 5 per level", function() {
      expect(subject.maxHitPoints()).toBe(15);
    });

    it("is modified by constitution modifier per level", function() {
      subject.constitutionScore(14);
      expect(subject.maxHitPoints()).toBe(21);
    });

    it("cannot be modified below 1 per level", function() {
      subject.constitutionScore(1);
      expect(subject.maxHitPoints()).toBe(3);
    });

    describe("when a Fighter", function() {

      beforeEach(function() {
        subject.characterClass("Fighter");
      });

      it("defaults to 10 per level", function() {
        expect(subject.maxHitPoints()).toBe(30);
      });

    });

    describe("when a War Monk", function() {

      beforeEach(function() {
        subject.characterClass("War Monk");
      });

      it("defaults to 6 per level", function() {
        expect(subject.maxHitPoints()).toBe(18);
      });

    });

    describe("when a Paladin", function() {

      beforeEach(function() {
        subject.characterClass("Paladin");
      });

      it("defaults to 8 per level", function() {
        expect(subject.maxHitPoints()).toBe(24);
      });

    });

  });

  describe("hitPoints", function() {

    it("goes down when damaged", function() {
      subject.damage(2);
      expect(subject.hitPoints()).toBe(3);
    });

  });

  describe("alive", function() {

    it("defaults to true", function() {
      expect(subject.alive()).toBe(true);
    });

    it("is true when damaged", function() {
      subject.damage(2);
      expect(subject.alive()).toBe(true);
    });

    it("is false when damaged to zero hit points", function() {
      subject.damage(5);
      expect(subject.alive()).toBe(false);
    });

    it("is false when damaged below zero hit points", function() {
      subject.damage(10);
      expect(subject.alive()).toBe(false);
    });

  });

});
