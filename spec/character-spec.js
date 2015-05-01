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
      expect(subject.alignment(), "NEUTRAL");
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

});
