var Evercraft = Evercraft || {};

Evercraft.Attack = {
  create: function(attacker, defender) {

    function resolve(roll) {
      var hit = isHit(roll);
      if (hit) {
        applyDamage(roll);
        incrementExperience();
      }
      return hit;
    }

    function applyDamage(roll) {
      defender.damage(calculateDamage(roll));
    }

    function incrementExperience() {
      attacker.experiencePoints(attacker.experiencePoints() + 10);
    }

    function calculateDamage(roll) {
      return isCritical(roll) ? attacker.criticalDamage() : attacker.attackDamage();
    }

    function isHit(roll) {
      return roll + attacker.attackModifier() >= defender.armorClass();
    }

    function isCritical(roll) {
      return roll === 20;
    }

    return {
      resolve : resolve
    };

  }
};
