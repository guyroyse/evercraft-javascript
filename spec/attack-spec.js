describe("Attack", function() {

  var subject, attacker, defender;

  beforeEach(function() {
    attacker = Evercraft.Character.create();
    defender = Evercraft.Character.create();
    subject = Evercraft.Attack.create(attacker, defender);
  });

  describe("hitting defender", function() {

    beforeEach(function() {
      spyOn(defender, 'armorClass').and.returnValue(10);
    });

    it("misses on a roll less than armor class", function() {
      expect(subject.resolve(5)).toBe(false);
    });

    it("hits on a roll equal to armor class", function() {
      expect(subject.resolve(10)).toBe(true);
    });

    it("hits on a roll greater than armor class", function() {
      expect(subject.resolve(15)).toBe(true);
    });

    describe("when attacker has an attack modifier", function() {

      beforeEach(function() {
        spyOn(attacker, 'attackModifier').and.returnValue(2);
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

  });

  describe("damaging defender", function() {

    beforeEach(function() {
      spyOn(defender, 'damage');
    });

    it("doesn't damage the defender on a miss", function() {
      subject.resolve(5);
      expect(defender.damage).not.toHaveBeenCalled();
    });

    it("damages the defender on a hit", function() {
      subject.resolve(15);
      expect(defender.damage).toHaveBeenCalledWith(1);
    });

    it("damages the defender doubly on a critical hit", function() {
      subject.resolve(20);
      expect(defender.damage).toHaveBeenCalledWith(2);
    });

  });

});
