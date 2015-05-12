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

    it("complains when changed to an invalid value", function() {
      expect(function() {
        subject.alignment("HAPPY")
      }).toThrow("Alignment can only be GOOD, NEUTRAL, or EVIL");
    });

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

  describe("characterClass", function() {

    it("defaults to No Class", function() {
      expect(subject.characterClass()).toBe("No Class");
    });

    it("can be changed", function() {
      subject.characterClass("Fighter");
      expect(subject.characterClass()).toBe("Fighter");
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

  describe("abilities", function() {

    it("has a strength", function() {
      expect(subject.strength().score()).toBe(10);
      expect(subject.strength().modifier()).toBe(0);
    });

    it("has a dexterity", function() {
      expect(subject.dexterity().score()).toBe(10);
      expect(subject.dexterity().modifier()).toBe(0);
    });

    it("has a constitution", function() {
      expect(subject.constitution().score()).toBe(10);
      expect(subject.constitution().modifier()).toBe(0);
    });

    it("has a intelligence", function() {
      expect(subject.intelligence().score()).toBe(10);
      expect(subject.intelligence().modifier()).toBe(0);
    });

    it("has a wisdom", function() {
      expect(subject.wisdom().score()).toBe(10);
      expect(subject.wisdom().modifier()).toBe(0);
    });

    it("has a charisma", function() {
      expect(subject.charisma().score()).toBe(10);
      expect(subject.charisma().modifier()).toBe(0);
    });

  });

  describe("armorClass", function() {

    it("defaults to 10", function() {
      expect(subject.armorClass()).toBe(10);
    });

    it("is modified by dexterity modifier", function() {
      subject.dexterity().score(14);
      expect(subject.armorClass()).toBe(12);
    });

    describe("when a War Monk", function() {

      beforeEach(function() {
        subject.characterClass("War Monk");
      });

      it("is modified by wisdom bonus", function() {
        subject.wisdom().score(16);
        expect(subject.armorClass()).toBe(13);
      });

      it("is not modified by wisdom penalty", function() {
        subject.wisdom().score(6);
        expect(subject.armorClass()).toBe(10);
      });

      it("is modified by dexterity and wisdom modifier", function() {
        subject.dexterity().score(14);
        subject.wisdom().score(16);
        expect(subject.armorClass()).toBe(15);
      });

    });

  });

  describe("maxHitPoints", function() {

    beforeEach(function() {
      subject.experiencePoints(2000);
    });

    it("defaults to 5 per level", function() {
      expect(subject.maxHitPoints()).toBe(15);
    });

    it("is modified by constitution modifier per level", function() {
      subject.constitution().score(14);
      expect(subject.maxHitPoints()).toBe(21);
    });

    it("cannot be modified below 1 per level", function() {
      subject.constitution().score(1);
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

  });

  describe("hitPoints", function() {

    it("goes down when damaged", function() {
      subject.damage(2);
      expect(subject.hitPoints()).toBe(3);
    });

  });

  describe("attackModifier", function() {

    beforeEach(function() {
      subject.experiencePoints(4000);
    });

    it("is increased by 1 for every even level", function() {
      expect(subject.attackModifier()).toBe(2);
    });

    it("has strength modifier added to it", function() {
      subject.strength().score(14);
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
          subject.strength().score(14);
        });

        it("does not have strength modifier added to it", function() {
          expect(subject.attackModifier()).toBe(2);
        });

      });

      describe("who is quick", function() {

        beforeEach(function() {
          subject.dexterity().score(14);
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

  });

  describe("attackDamage", function() {

    it("defaults to 1", function() {
      expect(subject.attackDamage()).toBe(1);
    });

    it("has strength modifier added to it", function() {
      subject.strength().score(14);
      expect(subject.attackDamage()).toBe(3);
    });

    it("is always at least 1", function() {
      subject.strength().score(8);
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

  describe("criticalDamage", function() {

    it("defaults to 2", function() {
      expect(subject.criticalDamage()).toBe(2);
    });

    it("has twice strength modifier added to it", function() {
      subject.strength().score(14);
      expect(subject.criticalDamage()).toBe(6);
    });

    it("is always at least 1", function() {
      subject.strength().score(2);
      expect(subject.criticalDamage()).toBe(1);
    });

    describe("when a Rogue", function() {

      beforeEach(function() {
        subject.characterClass("Rogue");
      });

      it("defaults to 3", function() {
        expect(subject.criticalDamage()).toBe(3);
      });

    });

    describe("when a War Monk", function() {

      beforeEach(function() {
        subject.characterClass("War Monk");
      });

      it("defaults to 6", function() {
        expect(subject.criticalDamage()).toBe(6);
      });

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
