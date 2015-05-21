describe("Character - Attack Damage", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("attackDamage", function() {

    it("defaults to 1", function() {
      expect(subject.attackDamage()).toBe(1);
    });

    it("has strength modifier added to it", function() {
      subject.strengthScore(14);
      expect(subject.attackDamage()).toBe(3);
    });

    it("is always at least 1", function() {
      subject.strengthScore(8);
      expect(subject.attackDamage()).toBe(1);
    });

    describe("when a War Monk", function() {

      beforeEach(function() {
        subject.characterClass("War Monk");
      });

      it("defaults to 3", function() {
        expect(subject.attackDamage()).toBe(3);
      });

    });

  });

});
