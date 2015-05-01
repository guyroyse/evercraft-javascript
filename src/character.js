var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";

    function name(val) {
      if (val !== undefined) _name = val;
      return _name;
    }

    function alignment() {
      return "NEUTRAL";
    }

    return {
      name : name,
      alignment : alignment
    };

  }
};
