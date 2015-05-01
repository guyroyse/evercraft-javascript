var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";

    function name(val) {
      if (val !== undefined) _name = val;
      return _name;
    }

    return {
      name : name
    };

  }
};
