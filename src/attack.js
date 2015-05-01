var Evercraft = Evercraft || {};

Evercraft.Attack = {
  create: function(attacker, defender) {

    function resolve(roll) {
      return roll >= defender.armorClass();
    }

    return {
      resolve : resolve
    };

  }
};
