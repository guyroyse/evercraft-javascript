describe("Attack", function() {

  var subject, attacker, defender;

  beforeEach(function() {
    attacker = Evercraft.Character.create();
    defender = Evercraft.Character.create();
    subject = Evercraft.Attack.create(attacker, defender);
  });

  describe("hitting defender", function() {

    beforeEach(function() {
      spyOn(attacker, 'attackModifier').and.returnValue(2);
      spyOn(defender, 'armorClass').and.returnValue(10);
    });

    it("misses when roll plus attack modifier is less than armor class", function() {
      expect(subject.resolve(5)).toBe(false);
    });

    it("hits when roll plus attack modifier equals armor class", function() {
      expect(subject.resolve(8)).toBe(true);
    });

    it("hits when roll plus attack modifier is greater than armor class", function() {
      expect(subject.resolve(15)).toBe(true);
    });

  });

  describe("when attacking", function() {

    beforeEach(function() {
      spyOn(attacker, 'attackDamage').and.returnValue(2);
      spyOn(attacker, 'criticalDamage').and.returnValue(5);
      spyOn(defender, 'damage');
    });

    describe("and missing", function() {

      beforeEach(function() {
        subject.resolve(5);
      });

      it("doesn't damage the defender", function() {
        expect(defender.damage).not.toHaveBeenCalled();
      });

      it("doesn't grant the attacker experience points", function() {
        expect(attacker.experiencePoints()).toBe(0);
      });

    });

    describe("and hitting", function() {

      beforeEach(function() {
        subject.resolve(15);
      });

      it("damages the defender", function() {
        expect(defender.damage).toHaveBeenCalledWith(2);
      });

      it("grants the attacker 10 experience points", function() {
        expect(attacker.experiencePoints()).toBe(10);
      });

    });

    describe("and critically hitting", function() {

      beforeEach(function() {
        subject.resolve(20);
      });

      it("damages the defender with critical damage", function() {
        expect(defender.damage).toHaveBeenCalledWith(5);
      });

      it("grants the attacker 10 experience points", function() {
        expect(attacker.experiencePoints()).toBe(10);
      });

    });

  });

});
