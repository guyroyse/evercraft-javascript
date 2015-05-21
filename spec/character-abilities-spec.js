describe("Character - Abilities", function() {

  var subject;

  beforeEach(function() {
    subject = Evercraft.Character.create();
  });

  describe("strength", function() {

    describe("score", function() {

      it("defaults to 10", function() {
        expect(subject.strengthScore()).toBe(10);
      });

      it("can be changed", function() {
        subject.strengthScore(14);
        expect(subject.strengthScore()).toBe(14);
      });

    });

    describe("modifier", function() {

      it("defaults to 0", function() {
        expect(subject.strengthModifier()).toBe(0);
      });

      describe("when an Orc", function() {

        beforeEach(function() {
          subject.race("Orc");
        });

        it("has a +2 bonus", function() {
          expect(subject.strengthModifier()).toBe(2);
        });

      });

    });

  });

  describe("dexterity", function() {

    describe("score", function() {

      it("defaults to 10", function() {
        expect(subject.dexterityScore()).toBe(10);
      });

      it("can be changed", function() {
        subject.dexterityScore(14);
        expect(subject.dexterityScore()).toBe(14);
      });

    });

    describe("modifier", function() {

      it("defaults to 0", function() {
        expect(subject.dexterityModifier()).toBe(0);
      });

    });

  });

  describe("constitution", function() {

    describe("score", function() {

      it("defaults to 10", function() {
        expect(subject.constitutionScore()).toBe(10);
      });

      it("can be changed", function() {
        subject.constitutionScore(14);
        expect(subject.constitutionScore()).toBe(14);
      });

    });

    describe("modifier", function() {

      it("defaults to 0", function() {
        expect(subject.constitutionModifier()).toBe(0);
      });

    });

  });

  describe("intelligence", function() {

    describe("score", function() {

      it("defaults to 10", function() {
        expect(subject.intelligenceScore()).toBe(10);
      });

      it("can be changed", function() {
        subject.intelligenceScore(14);
        expect(subject.intelligenceScore()).toBe(14);
      });

    });

    describe("modifier", function() {

      it("defaults to 0", function() {
        expect(subject.intelligenceModifier()).toBe(0);
      });

      describe("when an Orc", function() {

        beforeEach(function() {
          subject.race("Orc");
        });

        it("has a -1 penalty", function() {
          expect(subject.intelligenceModifier()).toBe(-1);
        });

      });

    });

  });

  describe("wisdom", function() {

    describe("score", function() {

      it("defaults to 10", function() {
        expect(subject.wisdomScore()).toBe(10);
      });

      it("can be changed", function() {
        subject.wisdomScore(14);
        expect(subject.wisdomScore()).toBe(14);
      });

    });

    describe("modifier", function() {

      it("defaults to 0", function() {
        expect(subject.wisdomModifier()).toBe(0);
      });

      describe("when an Orc", function() {

        beforeEach(function() {
          subject.race("Orc");
        });

        it("has a -1 penalty", function() {
          expect(subject.wisdomModifier()).toBe(-1);
        });

      });

    });

  });

  describe("charisma", function() {

    describe("score", function() {

      it("defaults to 10", function() {
        expect(subject.charismaScore()).toBe(10);
      });

      it("can be changed", function() {
        subject.charismaScore(14);
        expect(subject.charismaScore()).toBe(14);
      });

    });

    describe("modifier", function() {

      it("defaults to 0", function() {
        expect(subject.charismaModifier()).toBe(0);
      });

      describe("when an Orc", function() {

        beforeEach(function() {
          subject.race("Orc");
        });

        it("has a -1 penalty", function() {
          expect(subject.charismaModifier()).toBe(-1);
        });

      });

    });

  });

});
