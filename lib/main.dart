import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'providers/bico_provider.dart';
import 'screens/login_screen.dart';
import 'screens/onboarding_screen.dart';
import 'screens/main_shell.dart';
import 'screens/inbox_thread_screen.dart';
import 'screens/services_screen.dart';
import 'screens/create_post_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
  ));
  runApp(
    ChangeNotifierProvider(
      create: (_) => BicoNotifier(),
      child: const BicoApp(),
    ),
  );
}

class BicoApp extends StatelessWidget {
  const BicoApp({super.key});

  @override
  Widget build(BuildContext context) {
    final notifier = context.watch<BicoNotifier>();
    final tokens = notifier.tokens;

    return MaterialApp(
      title: 'Bico',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme(
          brightness: notifier.isDark ? Brightness.dark : Brightness.light,
          primary: tokens.green,
          onPrimary: Colors.white,
          secondary: tokens.purple,
          onSecondary: Colors.white,
          error: tokens.red,
          onError: Colors.white,
          surface: tokens.bg,
          onSurface: tokens.text,
        ),
        scaffoldBackgroundColor: tokens.bg,
        textTheme: GoogleFonts.interTextTheme(
          ThemeData(brightness: notifier.isDark ? Brightness.dark : Brightness.light).textTheme,
        ).apply(
          bodyColor: tokens.text,
          displayColor: tokens.text,
        ),
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
        appBarTheme: AppBarTheme(
          backgroundColor: tokens.bg,
          foregroundColor: tokens.text,
          elevation: 0,
        ),
      ),
      initialRoute: '/login',
      routes: {
        '/login': (_) => const LoginScreen(),
        '/onboarding': (_) => const OnboardingScreen(),
        '/main': (_) => const MainShell(),
        '/inbox-thread': (_) => const InboxThreadScreen(),
        '/services': (_) => const ServicesScreen(),
        '/create-post': (_) => const CreatePostScreen(),
      },
    );
  }
}
