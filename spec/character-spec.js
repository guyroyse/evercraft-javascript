describe("Character", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("name", function() {

    it("defaults to empty string", function() {
      expect(subject.name()).toBe("");
    });

    it("can be changed", function() {
      subject.name("Bob");
      expect(subject.name()).toBe("Bob");
    });

  });

  describe("alignment", function() {

    it("defaults to NEUTRAL", function() {
      expect(subject.alignment()).toBe("NEUTRAL");
    });

    it("can be changed to GOOD", function() {
      subject.alignment("GOOD");
      expect(subject.alignment()).toBe("GOOD");
    });

    it("can be changed to NEUTRAL", function() {
      subject.alignment("NEUTRAL");
      expect(subject.alignment()).toBe("NEUTRAL");
    });

    it("can be changed to EVIL", function() {
      subject.alignment("EVIL");
      expect(subject.alignment()).toBe("EVIL");
    });

    it("complains when changed to in invalid value", function() {
      expect(function() {
        subject.alignment("HAPPY")
      }).toThrow("Alignment can only be GOOD, NEUTRAL, or EVIL");
    });

  });

  describe("armorClass", function() {

    it("defaults to 10", function() {
      expect(subject.armorClass()).toBe(10);
    });

  });

  describe("hitPoints", function() {

    it("defaults to 5", function() {
      expect(subject.hitPoints()).toBe(5);
    });

    it("goes down when damaged", function() {
      subject.damage(2);
      expect(subject.hitPoints()).toBe(3);
    });

  });

  describe("alive", function() {

    it("defaults to alive", function() {
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
