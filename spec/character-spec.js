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
