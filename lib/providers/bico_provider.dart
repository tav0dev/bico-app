import 'package:flutter/foundation.dart';
import 'package:flutter/painting.dart';
import '../theme/tokens.dart';

class BicoNotifier extends ChangeNotifier {
  bool isDark;
  String accent;
  String density;
  String navStyle;
  String cardStyle;
  String tucoMode;

  BicoNotifier({
    this.isDark = true,
    this.accent = 'green',
    this.density = 'comfortable',
    this.navStyle = 'icons-labels',
    this.cardStyle = 'soft',
    this.tucoMode = 'placeholder',
  });

  BicoTokens get tokens {
    final base = isDark ? BicoTokens.dark : BicoTokens.light;
    if (accent == 'purple') {
      return base.copyWith(
        green: base.purple,
        greenDark: const Color(0xFF3730A3),
        greenSoft: base.purpleSoft,
        purple: base.green,
        purpleSoft: base.greenSoft,
      );
    }
    return base;
  }

  void setDark(bool v) {
    isDark = v;
    notifyListeners();
  }

  void setAccent(String v) {
    accent = v;
    notifyListeners();
  }

  void setDensity(String v) {
    density = v;
    notifyListeners();
  }

  void setNavStyle(String v) {
    navStyle = v;
    notifyListeners();
  }

  void setCardStyle(String v) {
    cardStyle = v;
    notifyListeners();
  }

  void setTucoMode(String v) {
    tucoMode = v;
    notifyListeners();
  }
}
