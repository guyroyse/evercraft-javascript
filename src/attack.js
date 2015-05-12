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
      return effectiveRoll(roll) >= effectiveArmorClass();
    }

    function isCritical(roll) {
      return roll === 20;
    }

    function effectiveRoll(roll) {
      return roll + attacker.attackModifier();
    }

    function effectiveArmorClass() {
      return attacker.characterClass() === 'Rogue' ? armorClassMinusDexBonus() : armorClass();
    }

    function armorClassMinusDexBonus() {
      return defender.armorClass() - Math.max(0, defender.dexterity().modifier());
    }

    function armorClass() {
      return defender.armorClass();
    }

    return {
      resolve : resolve
    };

  }
};
