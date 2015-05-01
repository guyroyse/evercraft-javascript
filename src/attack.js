var Evercraft = Evercraft || {};

Evercraft.Attack = {
  create: function(attacker, defender) {

    function resolve(roll) {
      defender.damage(calculateDamage(roll));
      return isHit(roll);
    }

    function calculateDamage(roll) {
      if (isCritical(roll)) return 2;
      if (isHit(roll)) return 1;
      return 0;
    }

    function isHit(roll) {
      return roll >= defender.armorClass();
    }

    function isCritical(roll) {
      return roll === 20;
    }

    return {
      resolve : resolve
    };

  }
};
