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
      return isCritical(roll) ? criticalDamage() : attackDamage();
    }

    function attackDamage() {
      return attackerIsPaladinVsEvil() ? attacker.attackDamage() + 2 : attacker.attackDamage();
    }

    function criticalDamage() {
      return attackDamage() * criticalMultiplier();
    }

    function criticalMultiplier() {
      return attackerIsRogue() || attackerIsPaladinVsEvil() ? 3 : 2;
    }

    function isHit(roll) {
      return effectiveRoll(roll) >= effectiveArmorClass();
    }

    function isCritical(roll) {
      return roll === 20;
    }

    function effectiveRoll(roll) {
      return roll + effectiveAttackModifier();
    }

    function effectiveAttackModifier() {
      return attackerIsPaladinVsEvil() ? attackModifier() + 2 : attackModifier();
    }

    function attackModifier() {
      return attacker.attackModifier();
    }

    function effectiveArmorClass() {
      return attackerIsRogue() ? armorClassMinusDexBonus() : armorClass();
    }

    function armorClass() {
      return defender.armorClass();
    }

    function armorClassMinusDexBonus() {
      return defender.armorClass() - Math.max(0, defender.dexterityModifier());
    }

    function attackerIsRogue() {
      return attacker.characterClass() === 'Rogue';
    }

    function attackerIsPaladin() {
      return attacker.characterClass() === 'Paladin';
    }

    function defenderIsEvil() {
      return defender.alignment() === 'EVIL';
    }

    function attackerIsPaladinVsEvil() {
      return attackerIsPaladin() && defenderIsEvil();
    }

    return {
      resolve : resolve
    };

  }
};
