import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/bico_provider.dart';
import '../widgets/tuco_slot.dart';
import '../widgets/bico_button.dart';
import '../widgets/bico_field.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isLogin = true;
  bool _showPassword = false;
  final _emailCtrl = TextEditingController();
  final _passwordCtrl = TextEditingController();

  @override
  void dispose() {
    _emailCtrl.dispose();
    _passwordCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final tokens = context.watch<BicoNotifier>().tokens;
    return Scaffold(
      backgroundColor: tokens.bg,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(24, 20, 24, 24),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SizedBox(height: 28),
              Center(child: TucoSlot(size: 84)),
              const SizedBox(height: 18),
              Text(
                'Bem-vindo ao Bico',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w700,
                  color: tokens.text,
                  letterSpacing: -0.03,
                ),
              ),
              const SizedBox(height: 6),
              Text(
                'O assistente do prestador de serviço autônomo',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 15,
                  color: tokens.textMuted,
                  height: 1.45,
                ),
              ),
              const SizedBox(height: 28),

              // Tab switcher
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: tokens.bgSoft,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    _Tab(
                      label: 'Entrar',
                      active: _isLogin,
                      tokens: tokens,
                      onTap: () => setState(() => _isLogin = true),
                    ),
                    _Tab(
                      label: 'Criar conta',
                      active: !_isLogin,
                      tokens: tokens,
                      onTap: () => setState(() => _isLogin = false),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Fields
              BicoField(
                label: 'E-mail',
                placeholder: 'seu@email.com',
                controller: _emailCtrl,
                leadingIcon: Icons.mail_outline,
              ),
              const SizedBox(height: 14),
              BicoField(
                label: 'Senha',
                placeholder: '••••••••',
                controller: _passwordCtrl,
                obscureText: !_showPassword,
                leadingIcon: Icons.lock_outline,
                trailing: GestureDetector(
                  onTap: () => setState(() => _showPassword = !_showPassword),
                  child: Icon(
                    _showPassword ? Icons.visibility_off_outlined : Icons.visibility_outlined,
                    size: 18,
                    color: tokens.textMuted,
                  ),
                ),
              ),
              if (_isLogin) ...[
                const SizedBox(height: 8),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    style: TextButton.styleFrom(
                      padding: EdgeInsets.zero,
                      minimumSize: Size.zero,
                      tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                    ),
                    child: Text(
                      'Esqueceu a senha?',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: tokens.green,
                      ),
                    ),
                  ),
                ),
              ],
              const SizedBox(height: 16),

              BicoButton(
                variant: BtnVariant.primary,
                size: BtnSize.lg,
                full: true,
                onPressed: () => Navigator.pushReplacementNamed(context, '/onboarding'),
                child: Text(_isLogin ? 'Entrar' : 'Criar minha conta'),
              ),
              const SizedBox(height: 20),

              // Divider
              Row(
                children: [
                  Expanded(child: Divider(color: tokens.borderSoft, thickness: 1)),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 10),
                    child: Text(
                      'ou continue com',
                      style: TextStyle(
                        fontSize: 12,
                        color: tokens.textFaint,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Expanded(child: Divider(color: tokens.borderSoft, thickness: 1)),
                ],
              ),
              const SizedBox(height: 20),

              // Social buttons
              Row(
                children: [
                  Expanded(
                    child: BicoButton(
                      variant: BtnVariant.secondary,
                      full: true,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _GoogleIcon(),
                          const SizedBox(width: 8),
                          const Text('Google'),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: BicoButton(
                      variant: BtnVariant.secondary,
                      full: true,
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.apple, size: 18, color: tokens.text),
                          const SizedBox(width: 8),
                          const Text('Apple'),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 32),

              // Terms
              Text.rich(
                TextSpan(
                  style: TextStyle(
                    fontSize: 12,
                    color: tokens.textFaint,
                    height: 1.5,
                  ),
                  children: [
                    const TextSpan(text: 'Ao continuar você concorda com os '),
                    TextSpan(
                      text: 'Termos',
                      style: TextStyle(color: tokens.text, fontWeight: FontWeight.w500),
                    ),
                    const TextSpan(text: ' e a '),
                    TextSpan(
                      text: 'Política de Privacidade',
                      style: TextStyle(color: tokens.text, fontWeight: FontWeight.w500),
                    ),
                    const TextSpan(text: '.'),
                  ],
                ),
                textAlign: TextAlign.center,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Tab extends StatelessWidget {
  final String label;
  final bool active;
  final dynamic tokens;
  final VoidCallback onTap;

  const _Tab({required this.label, required this.active, required this.tokens, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 150),
          height: 36,
          decoration: BoxDecoration(
            color: active ? tokens.bg : Colors.transparent,
            borderRadius: BorderRadius.circular(9),
            boxShadow: active
                ? [BoxShadow(color: const Color(0x0F0F172A), blurRadius: 2, offset: const Offset(0, 1))]
                : null,
          ),
          alignment: Alignment.center,
          child: Text(
            label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: active ? tokens.text : tokens.textMuted,
            ),
          ),
        ),
      ),
    );
  }
}

class _GoogleIcon extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 18,
      height: 18,
      child: CustomPaint(painter: _GooglePainter()),
    );
  }
}

class _GooglePainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final s = size.width;
    // Blue
    canvas.drawArc(
      Rect.fromLTWH(0, 0, s, s),
      -0.52,
      3.14,
      false,
      Paint()..color = const Color(0xFF4285F4)..style = PaintingStyle.fill,
    );
    // Green
    canvas.drawArc(
      Rect.fromLTWH(0, 0, s, s),
      2.62,
      1.05,
      false,
      Paint()..color = const Color(0xFF34A853)..style = PaintingStyle.fill,
    );
    // Yellow
    canvas.drawArc(
      Rect.fromLTWH(0, 0, s, s),
      3.67,
      1.05,
      false,
      Paint()..color = const Color(0xFFFBBC05)..style = PaintingStyle.fill,
    );
    // Red
    canvas.drawArc(
      Rect.fromLTWH(0, 0, s, s),
      4.72,
      1.05,
      false,
      Paint()..color = const Color(0xFFEA4335)..style = PaintingStyle.fill,
    );
    // White center
    canvas.drawCircle(
      Offset(s / 2, s / 2),
      s * 0.35,
      Paint()..color = Colors.white,
    );
  }

  @override
  bool shouldRepaint(_GooglePainter _) => false;
}
