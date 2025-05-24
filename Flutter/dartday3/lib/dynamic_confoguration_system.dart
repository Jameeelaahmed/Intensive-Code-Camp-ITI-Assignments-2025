abstract class Configurable {
  Map<String, dynamic> config = {};

  void applyConfig();
  void resetConfig();
}

mixin NetworkConfig on Configurable {
  void applyNetworkConfig() {
    config['network'] = {'ip': '192.168.1.1', 'port': 8080};
  }

  void resetNetworkConfig() {
    config.remove('network');
  }
}
mixin DataBaseConfig on Configurable {
  void applyDatabaseConfig() {
    config['database'] = {
      'engine': 'PostgreSQL',
      'host': 'localhost',
      'port': 5432,
    };
  }

  void resetDatabaseConfig() {
    config.remove('database');
  }
}

mixin UIConfig on Configurable {
  void applyUIConfig() {
    config['ui'] = {'theme': 'dark', 'language': 'en-US'};
  }

  void resetUIConfig() {
    config.remove('ui');
  }
}

class AppConfig extends Configurable with NetworkConfig, UIConfig {
  @override
  void applyConfig() {
    applyUIConfig();
    applyNetworkConfig();
  }

  @override
  void resetConfig() {
    resetNetworkConfig();
    resetUIConfig();
  }
}

class ServerConfig extends Configurable with DataBaseConfig, NetworkConfig {
  @override
  void applyConfig() {
    applyDatabaseConfig();
    applyNetworkConfig();
  }

  @override
  void resetConfig() {
    resetNetworkConfig();
    resetDatabaseConfig();
  }
}

class UserConfig extends Configurable with UIConfig {
  @override
  void applyConfig() {
    applyUIConfig();
  }

  @override
  void resetConfig() {
    resetUIConfig();
  }
}

void applyAllConfigs(List<Configurable> configs) {
  for (var config in configs) {
    config.applyConfig();
    print(config.runtimeType);
    print(config.config);
    print('---------------------------');
  }
}
