describe("Character - Attack Modifier", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("attackModifier", function() {

    beforeEach(function() {
      subject.experiencePoints(4000);
    });

    it("is increased by 1 for every even level", function() {
      expect(subject.attackModifier()).toBe(2);
    });

    it("has strength modifier added to it", function() {
      subject.strengthScore(14);
      expect(subject.attackModifier()).toBe(4);
    });

    describe("when a Fighter", function() {

      beforeEach(function() {
        subject.characterClass("Fighter");
      });

      it("is increased by 1 for every level", function() {
        expect(subject.attackModifier()).toBe(5);
      });

    });

    describe("when a Rogue", function() {

      beforeEach(function() {
        subject.characterClass("Rogue");
      });

      describe("who is strong", function() {

        beforeEach(function() {
          subject.strengthScore(14);
        });

        it("does not have strength modifier added to it", function() {
          expect(subject.attackModifier()).toBe(2);
        });

      });

      describe("who is quick", function() {

        beforeEach(function() {
          subject.dexterityScore(14);
        });

        it("has dexterity modifier added to it", function() {
          expect(subject.attackModifier()).toBe(4);
        });

      });

    });

    describe("when a War Monk", function() {

      beforeEach(function() {
        subject.characterClass("War Monk");
      });

      it("is increased by 1 for every second and third level", function() {
        expect(subject.attackModifier()).toBe(3);
      });

    });

    describe("when a Paladin", function() {

      beforeEach(function() {
        subject.characterClass("Paladin");
      });

      it("is increased by 1 for every level", function() {
        expect(subject.attackModifier()).toBe(5);
      });

    });

  });

});
