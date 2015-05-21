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

  describe("characterClass", function() {

    it("defaults to No Class", function() {
      expect(subject.characterClass()).toBe("No Class");
    });

    it("can be changed", function() {
      subject.characterClass("Fighter");
      expect(subject.characterClass()).toBe("Fighter");
    });

  });

  describe("race", function() {

    it("defaults to Human", function() {
      expect(subject.race()).toBe("Human");
    });

    it("can be changed", function() {
      subject.race("Orc");
      expect(subject.race()).toBe("Orc");
    });

  });

});
