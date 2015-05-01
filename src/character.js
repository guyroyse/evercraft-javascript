var Evercraft = Evercraft || {};

Evercraft.Character = {
  create : function() {

    var _name = "";
    var _alignment = "NEUTRAL";

    function name(val) {
      if (val !== undefined) _name = val;
      return _name;
    }

    function alignment(val) {
      if (val !== undefined) _alignment = val;
      return _alignment;
    }

    return {
      name : name,
      alignment : alignment
    };

  }
};
