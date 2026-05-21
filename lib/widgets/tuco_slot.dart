import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/bico_provider.dart';

class TucoSlot extends StatelessWidget {
  final double size;
  final String? mode;

  const TucoSlot({super.key, this.size = 96, this.mode});

  @override
  Widget build(BuildContext context) {
    final notifier = context.watch<BicoNotifier>();
    final tokens = notifier.tokens;
    final effectiveMode = mode ?? notifier.tucoMode;

    if (effectiveMode == 'hidden') return const SizedBox.shrink();

    // Se o modo for placeholder ou simple, agora mostramos a imagem real do Tuco
    return ClipRRect(
      borderRadius: BorderRadius.circular(size * 0.2), // Bordas arredondadas suaves
      child: Image.asset(
        'assets/images/tuco.png',
        width: size,
        height: size,
        fit: BoxFit.cover,
        // Caso a imagem ainda não exista ou dê erro, mostra um círculo de cor
        errorBuilder: (context, error, stackTrace) {
          return Container(
            width: size,
            height: size,
            decoration: BoxDecoration(
              color: tokens.purpleSoft,
              shape: BoxShape.circle,
              border: Border.all(color: tokens.border),
            ),
            child: Icon(Icons.pets, size: size * 0.4, color: tokens.purple),
          );
        },
      ),
    );
  }
}
