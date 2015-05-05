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

  });

  describe("maxHitPoints", function() {

    it("defaults to 5", function() {
      expect(subject.maxHitPoints()).toBe(5);
    });

    it("is modified by constitution modifier", function() {
      subject.constitution().score(14);
      expect(subject.maxHitPoints()).toBe(7);
    });

    it("cannot be modified below 1", function() {
      subject.constitution().score(1);
      expect(subject.maxHitPoints()).toBe(1);
    });

    it("is multiplied by level", function() {
      subject.experiencePoints(2000);
      expect(subject.maxHitPoints()).toBe(15);
    });

    it("is at least 1 point per level", function() {
      subject.experiencePoints(2000);
      subject.constitution().score(1);
      expect(subject.maxHitPoints()).toBe(3);
    });

  });

  describe("hitPoints", function() {

    it("goes down when damaged", function() {
      subject.damage(2);
      expect(subject.hitPoints()).toBe(3);
    });

  });

  describe("attackModifier", function() {

    it("defaults to 0", function() {
      expect(subject.attackModifier()).toBe(0);
    });

    it("has strength modifier added to it", function() {
      subject.strength().score(14);
      expect(subject.attackModifier()).toBe(2);
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
      subject.strength().score(8);
      expect(subject.criticalDamage()).toBe(1);
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
