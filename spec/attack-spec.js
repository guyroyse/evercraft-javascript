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

});
