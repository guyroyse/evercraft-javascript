var Evercraft = Evercraft || {};

Evercraft.Attack = {
  create: function(attacker, defender) {

    function resolve(roll) {
      var hit = isHit(roll);
      if (hit) defender.damage(calculateDamage(roll));
      return hit;
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
