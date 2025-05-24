abstract class Character {
  String? name;
  Character(this.name);
  void attack();
  void defend();
  void heal();
}

mixin Attacker {
  void attack() {
    print("Attacker");
  }
}
mixin Defender {
  void defend() {
    print("Defender");
  }
}

mixin Healer {
  void heal() {
    print("Healer");
  }
}

class Warrior extends Character with Attacker, Defender {
  Warrior(String name) : super(name = name);

  @override
  void attack() {
    print("Worrior named:$name can attack");
  }

  @override
  void defend() {
    print("Worrior named:$name can defend");
  }

  @override
  void heal() {
    print("Worrior named:$name can't heal");
  }
}

class Mage extends Character with Attacker, Healer {
  Mage(String name) : super(name = name);

  @override
  void attack() {
    print("Mage named:$name can attack");
  }

  @override
  void heal() {
    print("Mage named:$name can heal");
  }

  @override
  void defend() {
    print("Mage named:$name can't defend");
  }
}

class Archer extends Character with Attacker, Defender {
  Archer(String name) : super(name = name);

  @override
  void attack() {
    print("Archer named:$name can attack");
  }

  @override
  void defend() {
    print("Archer named:$name can defend");
  }

  @override
  void heal() {
    print("Archer named:$name can't heal");
  }
}
