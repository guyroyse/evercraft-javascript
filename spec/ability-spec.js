describe("Ability", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Ability.create();
  });

  describe("score", function() {

    it("defaults to 10", function() {
      expect(subject.score()).toBe(10);
    });

    it("can be changed", function() {
      subject.score(15);
      expect(subject.score()).toBe(15);
    });

    it("complains when set beyond 20", function() {
      expect(function() {
        subject.score(21);
      }).toThrow("Score must be between 1 and 20");
    });

    it("complains when set below 1", function() {
      expect(function() {
        subject.score(0);
      }).toThrow("Score must be between 1 and 20");
    });

  });

  describe("modifier", function() {

    it("defaults modifier to 0", function() {
      expect(subject.modifier()).toBe(0);
    });

    it("adds +1 to modifier for every 2 points beyond default", function() {
      subject.score(12);
      expect(subject.modifier()).toBe(1);
      subject.score(14);
      expect(subject.modifier()).toBe(2);
      subject.score(16);
      expect(subject.modifier()).toBe(3);
    });

    it("adds -1 to modifier for every 2 points below default", function() {
      subject.score(8);
      expect(subject.modifier()).toBe(-1);
      subject.score(6);
      expect(subject.modifier()).toBe(-2);
      subject.score(4);
      expect(subject.modifier()).toBe(-3);
    });

    it("rounds modifier for odd numbers down", function() {
      subject.score(1);
      expect(subject.modifier()).toBe(-5);
      subject.score(3);
      expect(subject.modifier()).toBe(-4);
      subject.score(17);
      expect(subject.modifier()).toBe(3);
      subject.score(19);
      expect(subject.modifier()).toBe(4);
    });

  });

});
