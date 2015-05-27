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
      var damage = attacker.attackDamage();
      if (attackerIsPaladinVsEvil()) damage += 2;
      if (attackerIsDwarfVsOrc()) damage += 2;
      return damage;
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
      return roll >= criticalThreshold();
    }

    function criticalThreshold() {
      return attackerIsElf() ? 19 : 20;
    }

    function effectiveRoll(roll) {
      return roll + attackModifier();
    }

    function attackModifier() {
      var modifier = attacker.attackModifier();
      if (attackerIsPaladinVsEvil()) modifier += 2;
      if (attackerIsDwarfVsOrc()) modifier += 2;
      if (attackerIsOrcVsElf()) modifier -= 2;
      return modifier;
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

    function attackerIsDwarf() {
      return attacker.race() === 'Dwarf';
    }

    function attackerIsElf() {
      return attacker.race() === 'Elf';
    }

    function attackerIsOrc() {
      return attacker.race() === 'Orc';
    }

    function defenderIsEvil() {
      return defender.alignment() === 'EVIL';
    }

    function defenderIsOrc() {
      return defender.race() === 'Orc';
    }

    function defenderIsElf() {
      return defender.race() === 'Elf';
    }

    function attackerIsPaladinVsEvil() {
      return attackerIsPaladin() && defenderIsEvil();
    }

    function attackerIsDwarfVsOrc() {
      return attackerIsDwarf() && defenderIsOrc();
    }

    function attackerIsOrcVsElf() {
      return attackerIsOrc() && defenderIsElf();
    }

    return {
      resolve : resolve
    };

  }
};
