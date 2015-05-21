describe("Character - Armor Class", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("armorClass", function() {

    it("defaults to 10", function() {
      expect(subject.armorClass()).toBe(10);
    });

    it("is modified by dexterity modifier", function() {
      subject.dexterityScore(14);
      expect(subject.armorClass()).toBe(12);
    });

    describe("when a War Monk", function() {

      beforeEach(function() {
        subject.characterClass("War Monk");
      });

      it("is modified by wisdom bonus", function() {
        subject.wisdomScore(16);
        expect(subject.armorClass()).toBe(13);
      });

      it("is not modified by wisdom penalty", function() {
        subject.wisdomScore(6);
        expect(subject.armorClass()).toBe(10);
      });

      it("is modified by dexterity and wisdom modifier", function() {
        subject.dexterityScore(14);
        subject.wisdomScore(16);
        expect(subject.armorClass()).toBe(15);
      });

    });

  });

});
