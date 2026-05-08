import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/bico_provider.dart';
import '../widgets/top_bar.dart';
import '../widgets/bottom_nav.dart';
import '../widgets/ai_sparkle.dart';

class AgendaScreen extends StatefulWidget {
  final ValueChanged<NavTab>? onNavTap;

  const AgendaScreen({super.key, this.onNavTap});

  @override
  State<AgendaScreen> createState() => _AgendaScreenState();
}

class _AgendaScreenState extends State<AgendaScreen> {
  int _selectedDay = 2; // QUA (index 2)

  static const _days = [
    (d: 'SEG', n: 4),
    (d: 'TER', n: 5),
    (d: 'QUA', n: 6),
    (d: 'QUI', n: 7),
    (d: 'SEX', n: 8),
    (d: 'SÁB', n: 9),
    (d: 'DOM', n: 10),
  ];

  static const _hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  static const _hourHeight = 56.0;

  @override
  Widget build(BuildContext context) {
    final notifier = context.watch<BicoNotifier>();
    final tokens = notifier.tokens;

    final events = [
      (time: '08:00', dur: 1.0, title: 'Treino — Carla M.', type: 'personal', color: tokens.green, ai: false),
      (time: '10:00', dur: 1.0, title: 'Avaliação — João P.', type: 'eval', color: tokens.purple, ai: false),
      (time: '12:30', dur: 0.5, title: 'Almoço', type: 'block', color: tokens.textMuted, ai: false),
      (time: '14:00', dur: 1.5, title: 'Treino dupla — Lia + Tom', type: 'personal', color: tokens.green, ai: true),
      (time: '17:00', dur: 1.0, title: 'Treino — Pedro R.', type: 'personal', color: tokens.green, ai: false),
    ];

    return Scaffold(
      backgroundColor: tokens.bg,
      body: Column(
        children: [
          SafeArea(
            bottom: false,
            child: BicoTopBar(
              title: 'Maio 2026',
              leading: IconButton(
                onPressed: () {},
                icon: Icon(Icons.chevron_left, size: 22, color: tokens.text),
                padding: const EdgeInsets.all(4),
                constraints: const BoxConstraints(),
              ),
              trailing: IconButton(
                onPressed: () {},
                icon: Icon(Icons.add, size: 22, color: tokens.text),
                padding: const EdgeInsets.all(4),
                constraints: const BoxConstraints(),
              ),
            ),
          ),

          // Week strip
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 4, 12, 14),
            child: Row(
              children: List.generate(_days.length, (i) {
                final day = _days[i];
                final isSelected = i == _selectedDay;
                return Expanded(
                  child: GestureDetector(
                    onTap: () => setState(() => _selectedDay = i),
                    child: Container(
                      padding: const EdgeInsets.fromLTRB(0, 8, 0, 10),
                      decoration: BoxDecoration(
                        color: isSelected ? tokens.green : Colors.transparent,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Column(
                        children: [
                          Text(
                            day.d,
                            style: TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w600,
                              color: isSelected ? Colors.white.withAlpha(230) : tokens.text.withAlpha(128),
                              letterSpacing: 0.04,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${day.n}',
                            style: TextStyle(
                              fontSize: 17,
                              fontWeight: FontWeight.w600,
                              color: isSelected ? Colors.white : tokens.text,
                            ),
                          ),
                          if (!isSelected && day.n == 6) ...[
                            const SizedBox(height: 2),
                            Container(
                              width: 4,
                              height: 4,
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: tokens.green,
                              ),
                            ),
                          ] else
                            const SizedBox(height: 6),
                        ],
                      ),
                    ),
                  ),
                );
              }),
            ),
          ),

          // Time grid
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.fromLTRB(12, 0, 12, 12),
              child: Padding(
                padding: const EdgeInsets.only(left: 44),
                child: SizedBox(
                  height: _hours.length * _hourHeight,
                  child: Stack(
                    clipBehavior: Clip.none,
                    children: [
                      // Hour lines
                      ...List.generate(_hours.length, (i) {
                        return Positioned(
                          top: i * _hourHeight,
                          left: 0,
                          right: 0,
                          child: Row(
                            children: [
                              Expanded(
                                child: Container(
                                  height: _hourHeight,
                                  decoration: i > 0
                                      ? BoxDecoration(
                                          border: Border(
                                            top: BorderSide(color: tokens.borderSoft, width: 1),
                                          ),
                                        )
                                      : null,
                                ),
                              ),
                            ],
                          ),
                        );
                      }),

                      // Hour labels (outside the 44px padding — positioned absolutely to left)
                      ...List.generate(_hours.length, (i) {
                        final h = _hours[i];
                        return Positioned(
                          top: i * _hourHeight - 7,
                          left: -44,
                          width: 38,
                          child: Text(
                            '${h.toString().padLeft(2, '0')}:00',
                            textAlign: TextAlign.right,
                            style: TextStyle(
                              fontSize: 11,
                              color: tokens.textFaint,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        );
                      }),

                      // Now line at 14:00
                      Positioned(
                        top: (14 - 7) * _hourHeight + 30,
                        left: -8,
                        right: 0,
                        child: Row(
                          children: [
                            Container(
                              width: 8,
                              height: 8,
                              margin: const EdgeInsets.only(left: -4),
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: tokens.red,
                              ),
                            ),
                            Expanded(
                              child: Container(
                                height: 1.5,
                                color: tokens.red,
                              ),
                            ),
                          ],
                        ),
                      ),

                      // Events
                      ...events.map((e) {
                        final parts = e.time.split(':');
                        final h = int.parse(parts[0]);
                        final m = int.parse(parts[1]);
                        final top = (h - 7) * _hourHeight + (m / 60.0) * _hourHeight;
                        final height = e.dur * _hourHeight - 4;
                        final isBlock = e.type == 'block';

                        return Positioned(
                          top: top,
                          left: 4,
                          right: 4,
                          height: height,
                          child: Container(
                            decoration: BoxDecoration(
                              color: isBlock ? tokens.borderSoft.withAlpha(128) : e.color.withAlpha(0x1A),
                              border: Border(
                                left: BorderSide(color: e.color, width: 3),
                              ),
                              borderRadius: const BorderRadius.only(
                                topRight: Radius.circular(8),
                                bottomRight: Radius.circular(8),
                              ),
                            ),
                            padding: const EdgeInsets.fromLTRB(10, 6, 10, 6),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              mainAxisAlignment: e.dur > 0.5 ? MainAxisAlignment.start : MainAxisAlignment.center,
                              children: [
                                Row(
                                  children: [
                                    Expanded(
                                      child: Text(
                                        e.title,
                                        style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w600,
                                          color: tokens.text,
                                          letterSpacing: -0.005,
                                        ),
                                        overflow: TextOverflow.ellipsis,
                                      ),
                                    ),
                                    if (e.ai) const AISparkle(size: 10),
                                  ],
                                ),
                                if (e.dur > 0.5 && !isBlock) ...[
                                  const SizedBox(height: 2),
                                  Text(
                                    '${e.time} • ${e.dur}h',
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: tokens.textMuted,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                        );
                      }),
                    ],
                  ),
                ),
              ),
            ),
          ),

          SafeArea(
            top: false,
            child: BicoBottomNav(active: NavTab.agenda, onTap: widget.onNavTap),
          ),
        ],
      ),
    );
  }
}
