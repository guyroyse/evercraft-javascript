describe("Attack", function() {

  var subject, attacker, defender;

  beforeEach(function() {
    attacker = Evercraft.Character.create();
    defender = Evercraft.Character.create();
    subject = Evercraft.Attack.create(attacker, defender);
  });

  describe("hitting defender", function() {

    it("misses on a roll less than armor class", function() {
      expect(subject.resolve(5)).toBe(false);
    });

    it("hits on a roll equal to armor class", function() {
      expect(subject.resolve(10)).toBe(true);
    });

    it("hits on a roll greater than armor class", function() {
      expect(subject.resolve(15)).toBe(true);
    });

  });

  describe("damaging defender", function() {

    it("doesn't damages the defender on a miss", function() {
      subject.resolve(5);
      expect(defender.hitPoints()).toBe(5);
    });

    it("damages the defender on a hit", function() {
      subject.resolve(15);
      expect(defender.hitPoints()).toBe(4);
    });

    it("damages the defender on a hit", function() {
      subject.resolve(20);
      expect(defender.hitPoints()).toBe(3);
    });
    
  });

});
