describe("Attack", function() {

  var subject, attacker, defender;

  beforeEach(function() {
    attacker = Evercraft.Character.create();
    defender = Evercraft.Character.create();
    subject = Evercraft.Attack.create(attacker, defender);
  });

  it("hits on a roll greater than armor class", function() {
    expect(subject.resolve(15)).toBe(true);
  });

  it("hits on a roll equal to armor class", function() {
    expect(subject.resolve(10)).toBe(true);
  });

  it("misses on a roll less than armor class", function() {
    expect(subject.resolve(5)).toBe(false);
  });

});
