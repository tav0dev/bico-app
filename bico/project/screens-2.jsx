// screens-2.jsx — Agenda, Inbox, CreatePost, Clients

// ─── 5. AGENDA ──────────────────────────────────────────────
function ScreenAgenda() {
  const { tokens, tweaks } = useTheme();
  const days = [
    { d: 'SEG', n: 4 },
    { d: 'TER', n: 5 },
    { d: 'QUA', n: 6, today: true },
    { d: 'QUI', n: 7 },
    { d: 'SEX', n: 8 },
    { d: 'SÁB', n: 9 },
    { d: 'DOM', n: 10 },
  ];
  const events = [
    { time: '08:00', dur: 1, title: 'Treino — Carla M.', type: 'personal', color: tokens.green },
    { time: '10:00', dur: 1, title: 'Avaliação — João P.', type: 'eval', color: tokens.purple },
    { time: '12:30', dur: 0.5, title: 'Almoço', type: 'block', color: tokens.textMuted },
    { time: '14:00', dur: 1.5, title: 'Treino dupla — Lia + Tom', type: 'personal', color: tokens.green, ai: true },
    { time: '17:00', dur: 1, title: 'Treino — Pedro R.', type: 'personal', color: tokens.green },
  ];
  // hours 7..20
  const hours = Array.from({ length: 14 }).map((_, i) => 7 + i);

  return (
    <PhoneFrame dark={tweaks.dark}>
      <TopBar
        title="Maio 2026"
        leading={
          <button style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: tokens.text }}>
            <Icon name="chevronLeft" size={22} />
          </button>
        }
        trailing={
          <button style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: tokens.text }}>
            <Icon name="plus" size={22} strokeWidth={2.2} />
          </button>
        }
      />
      {/* Week strip */}
      <div style={{ padding: '4px 12px 14px', display: 'flex', gap: 4, flexShrink: 0 }}>
        {days.map((day) => (
          <button key={day.n} style={{
            flex: 1, padding: '8px 0 10px', borderRadius: 12, border: 'none', cursor: 'pointer',
            background: day.today ? tokens.green : 'transparent',
            color: day.today ? '#fff' : tokens.text,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            fontFamily: 'inherit',
          }}>
            <span style={{ fontSize: 10, fontWeight: 600, opacity: day.today ? 0.9 : 0.5, letterSpacing: '0.04em' }}>{day.d}</span>
            <span style={{ fontSize: 17, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{day.n}</span>
            {!day.today && day.n === 6 && <div style={{ width: 4, height: 4, borderRadius: 2, background: tokens.green }} />}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', position: 'relative', padding: '0 12px 12px' }}>
        <div style={{ position: 'relative', paddingLeft: 44 }}>
          {hours.map((h, i) => (
            <div key={h} style={{ height: 56, position: 'relative', borderTop: i > 0 ? `1px solid ${tokens.borderSoft}` : 'none' }}>
              <span style={{
                position: 'absolute', left: -44, top: -7, width: 38, textAlign: 'right',
                fontSize: 11, color: tokens.textFaint, fontWeight: 500, fontVariantNumeric: 'tabular-nums',
              }}>{String(h).padStart(2, '0')}:00</span>
            </div>
          ))}

          {/* Now line at 14:00 */}
          <div style={{
            position: 'absolute', left: -8, right: 0, top: (14 - 7) * 56 + 30,
            display: 'flex', alignItems: 'center', pointerEvents: 'none', zIndex: 5,
          }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: tokens.red, marginLeft: -4 }} />
            <div style={{ flex: 1, height: 1.5, background: tokens.red }} />
          </div>

          {/* Events overlay */}
          {events.map((e, i) => {
            const [h, m] = e.time.split(':').map(Number);
            const top = (h - 7) * 56 + (m / 60) * 56;
            const height = e.dur * 56 - 4;
            const isBlock = e.type === 'block';
            return (
              <div key={i} style={{
                position: 'absolute', left: 4, right: 4,
                top, height,
                background: isBlock ? `repeating-linear-gradient(135deg, ${tokens.borderSoft}, ${tokens.borderSoft} 6px, transparent 6px, transparent 12px)` : e.color + '1A',
                borderLeft: `3px solid ${e.color}`,
                borderRadius: 8, padding: '6px 10px',
                display: 'flex', flexDirection: 'column', justifyContent: e.dur > 0.5 ? 'flex-start' : 'center',
                gap: 2, overflow: 'hidden',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontSize: 13, fontWeight: 600, color: tokens.text, letterSpacing: '-0.005em',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1,
                  }}>{e.title}</span>
                  {e.ai && <AISparkle size={10} />}
                </div>
                {e.dur > 0.5 && !isBlock && (
                  <span style={{ fontSize: 11, color: tokens.textMuted, fontWeight: 500 }}>
                    {e.time} • {e.dur}h
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BottomNav active="agenda" style={tweaks.navStyle} />
    </PhoneFrame>
  );
}

// ─── 6. INBOX ────────────────────────────────────────────────
function ScreenInbox() {
  const { tokens, tweaks } = useTheme();
  const messages = [
    { name: 'Carla Mendes', preview: 'Posso remarcar pra quinta às 16h?', time: '14:32', unread: 2, channel: 'wpp', online: true },
    { name: 'João Pedro', preview: 'Confirmado para amanhã 👍', time: '11:08', unread: 0, channel: 'wpp' },
    { name: 'Lia Faria', preview: 'Você: enviei o orçamento, qualquer dúvida...', time: '10:14', unread: 0, channel: 'instagram', sent: true },
    { name: 'Pedro Rocha', preview: 'Bom dia! Quanto custa um pacote mensal?', time: 'Ontem', unread: 1, channel: 'wpp', aiSuggest: true },
    { name: 'Beatriz Lima', preview: 'Obrigada pela sessão de hoje!', time: 'Ontem', unread: 0, channel: 'wpp' },
    { name: '+55 11 9 8123-4567', preview: 'Olá, vi seu perfil no Instagram...', time: 'seg', unread: 1, channel: 'wpp', aiSuggest: true, isNew: true },
    { name: 'Tomás Andrade', preview: 'Beleza, te aviso semana que vem', time: 'seg', unread: 0, channel: 'instagram' },
  ];

  return (
    <PhoneFrame dark={tweaks.dark}>
      <TopBar
        title="Mensagens"
        large
        trailing={
          <button style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: tokens.text }}>
            <Icon name="search" size={20} />
          </button>
        }
      />
      {/* Filter chips */}
      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 6, flexShrink: 0, overflowX: 'auto' }}>
        {['Tudo (3)', 'Não lidas', 'WhatsApp', 'Instagram'].map((c, i) => (
          <button key={c} style={{
            padding: '6px 12px', borderRadius: 999, flexShrink: 0,
            background: i === 0 ? tokens.text : tokens.bgSoft,
            color: i === 0 ? tokens.bg : tokens.textMuted,
            border: 'none', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>{c}</button>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, padding: '10px 16px',
            borderTop: i === 0 ? `1px solid ${tokens.borderSoft}` : 'none',
            borderBottom: `1px solid ${tokens.borderSoft}`,
            background: m.unread > 0 ? tokens.bg : 'transparent',
          }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <Avatar name={m.name} size={44} />
              {m.online && (
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: 11, height: 11, borderRadius: 6, background: tokens.green, border: `2px solid ${tokens.bg}` }} />
              )}
              <div style={{
                position: 'absolute', bottom: -2, right: -2, width: 16, height: 16, borderRadius: 8,
                background: m.channel === 'wpp' ? '#25D366' : 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF)',
                border: `2px solid ${tokens.bg}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 8, fontWeight: 700,
              }}>{m.channel === 'wpp' ? 'W' : 'IG'}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  <span style={{ fontSize: 15, fontWeight: m.unread ? 700 : 600, color: tokens.text, letterSpacing: '-0.005em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {m.name}
                  </span>
                  {m.isNew && <Pill color="purple" size="sm">novo</Pill>}
                </div>
                <span style={{ fontSize: 12, color: m.unread ? tokens.green : tokens.textFaint, fontWeight: m.unread ? 600 : 500, flexShrink: 0 }}>
                  {m.time}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                <div style={{
                  flex: 1, fontSize: 13, color: m.unread ? tokens.text : tokens.textMuted,
                  fontWeight: m.unread ? 500 : 400,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {m.sent && <Icon name="check" size={12} />}
                  {m.preview}
                </div>
                {m.aiSuggest && <AISparkle size={11} />}
                {m.unread > 0 && (
                  <span style={{
                    minWidth: 18, height: 18, padding: '0 6px', borderRadius: 9,
                    background: tokens.green, color: '#fff',
                    fontSize: 11, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>{m.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="inbox" style={tweaks.navStyle} />
    </PhoneFrame>
  );
}

// ─── 6b. INBOX THREAD (alternate / drill-in) ─────────────────
function ScreenInboxThread() {
  const { tokens, tweaks } = useTheme();
  const [showSuggestions, setShowSuggestions] = React.useState(true);
  const messages = [
    { from: 'them', text: 'Oi Marina! Vi seu trabalho no Instagram', time: '14:20' },
    { from: 'them', text: 'Você atende perto da Vila Madalena? Quanto custa um pacote mensal?', time: '14:20' },
    { from: 'me', text: 'Oi Carla! Atendo sim 😊 Tenho dois pacotes:\n\n• 8 sessões/mês — R$ 750\n• 12 sessões/mês — R$ 1.080', time: '14:25' },
    { from: 'them', text: 'Perfeito! Posso começar quinta-feira?', time: '14:30' },
    { from: 'them', text: 'Posso remarcar pra quinta às 16h?', time: '14:32' },
  ];
  const suggestions = [
    'Posso sim! Quinta às 16h tá confirmado ✅',
    'Quinta tenho 16h ou 18h. Qual prefere?',
    'Hoje não consigo às 16h. E às 17h30?',
  ];
  return (
    <PhoneFrame dark={tweaks.dark}>
      <div style={{
        flexShrink: 0, padding: '8px 12px 10px', borderBottom: `1px solid ${tokens.borderSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: tokens.text }}>
          <Icon name="chevronLeft" size={22} />
        </button>
        <Avatar name="Carla Mendes" size={36} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: tokens.text, letterSpacing: '-0.005em' }}>Carla Mendes</div>
          <div style={{ fontSize: 11, color: tokens.green, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: tokens.green }} /> online · WhatsApp
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: tokens.text }}>
          <Icon name="moreVert" size={20} />
        </button>
      </div>

      {/* AI context strip */}
      <div style={{
        flexShrink: 0, padding: '10px 14px',
        background: tokens.purpleSoft,
        borderBottom: `1px solid ${tokens.borderSoft}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <AISparkle size={13} />
        <div style={{ flex: 1, fontSize: 12, color: tokens.text, lineHeight: 1.4 }}>
          <span style={{ fontWeight: 600 }}>Cliente desde mar/2026 · </span>
          <span style={{ color: tokens.textMuted }}>Pacote 8 sessões · próximo: hoje 14:00</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.from === 'me' ? 'flex-end' : 'flex-start',
            maxWidth: '78%',
            background: msg.from === 'me' ? tokens.green : tokens.bgSoft,
            color: msg.from === 'me' ? '#fff' : tokens.text,
            padding: '8px 12px', borderRadius: 16,
            borderBottomRightRadius: msg.from === 'me' ? 4 : 16,
            borderBottomLeftRadius: msg.from === 'them' ? 4 : 16,
            fontSize: 14, lineHeight: 1.4, whiteSpace: 'pre-wrap',
            letterSpacing: '-0.005em',
          }}>
            {msg.text}
            <div style={{ fontSize: 10, marginTop: 3, opacity: 0.7, textAlign: 'right' }}>{msg.time}</div>
          </div>
        ))}
      </div>

      {showSuggestions && (
        <div style={{
          flexShrink: 0, padding: '10px 12px 8px',
          borderTop: `1px solid ${tokens.borderSoft}`, background: tokens.bgSoft,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <AISparkle size={11} />
              <span style={{ fontSize: 11, fontWeight: 700, color: tokens.orange, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Sugestões do Tuco
              </span>
            </div>
            <button onClick={() => setShowSuggestions(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: tokens.textMuted, padding: 0 }}>
              <Icon name="close" size={16} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {suggestions.map((s, i) => (
              <button key={i} style={{
                textAlign: 'left', padding: '8px 12px', borderRadius: 10,
                background: tokens.bg, border: `1px solid ${tokens.border}`,
                color: tokens.text, fontFamily: 'inherit', fontSize: 13, lineHeight: 1.35, cursor: 'pointer',
              }}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{
        flexShrink: 0, padding: '8px 12px',
        borderTop: `1px solid ${tokens.borderSoft}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <button style={{ background: 'none', border: 'none', padding: 6, cursor: 'pointer', color: tokens.textMuted }}>
          <Icon name="paperclip" size={20} />
        </button>
        <div style={{
          flex: 1, height: 38, padding: '0 14px', borderRadius: 19,
          background: tokens.bgSoft, color: tokens.textMuted,
          display: 'flex', alignItems: 'center', fontSize: 14,
        }}>Mensagem…</div>
        <button style={{
          width: 38, height: 38, borderRadius: 19, border: 'none',
          background: tokens.green, color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="send" size={18} />
        </button>
      </div>
    </PhoneFrame>
  );
}

// ─── 7. CREATE POST (with AI typing) ─────────────────────────
function ScreenCreatePost() {
  const { tokens, tweaks } = useTheme();
  const fullCaption = "Quer começar a treinar mas não sabe por onde? 💪\n\nMonte sua avaliação física comigo: a gente analisa postura, condicionamento e seus objetivos. Depois eu monto um plano feito pra sua rotina.\n\n📍 Vila Madalena · Online também\n👉 Reserva pelo link na bio";
  const [typed, setTyped] = React.useState(fullCaption);
  const [hashtags] = React.useState(['#personaltrainer', '#vilamadalena', '#treinofuncional', '#saúde']);
  const [generating, setGenerating] = React.useState(false);

  // Simulated typing animation
  React.useEffect(() => {
    if (!generating) return;
    setTyped('');
    let i = 0;
    const id = setInterval(() => {
      i += Math.ceil(Math.random() * 3) + 1;
      if (i >= fullCaption.length) {
        setTyped(fullCaption);
        setGenerating(false);
        clearInterval(id);
      } else {
        setTyped(fullCaption.slice(0, i));
      }
    }, 20);
    return () => clearInterval(id);
  }, [generating]);

  return (
    <PhoneFrame dark={tweaks.dark}>
      <TopBar
        title="Criar post"
        leading={
          <button style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: tokens.text }}>
            <Icon name="close" size={22} />
          </button>
        }
        trailing={
          <button style={{
            padding: '7px 14px', borderRadius: 10, border: 'none',
            background: tokens.green, color: '#fff', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 600,
          }}>Publicar</button>
        }
      />

      <div style={{ flex: 1, overflow: 'auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* Photo */}
        <div style={{
          aspectRatio: '4/5', borderRadius: 14,
          background: `repeating-linear-gradient(45deg, ${tokens.bgSoft}, ${tokens.bgSoft} 10px, ${tokens.borderSoft} 10px, ${tokens.borderSoft} 20px)`,
          border: `1px solid ${tokens.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: 8, position: 'relative',
        }}>
          <Icon name="image" size={36} color={tokens.textFaint} />
          <span style={{ fontSize: 13, color: tokens.textMuted, fontWeight: 500, fontFamily: 'ui-monospace, monospace' }}>
            foto do treino.jpg
          </span>
          <button style={{
            position: 'absolute', bottom: 12, right: 12,
            padding: '8px 12px', borderRadius: 999, border: 'none',
            background: 'rgba(15,23,42,0.85)', color: '#fff', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name="edit" size={14} /> Trocar
          </button>
        </div>

        {/* AI generate row */}
        <div style={{
          padding: '12px 14px', borderRadius: 12,
          background: tokens.orangeSoft,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <AISparkle size={14} />
          <div style={{ flex: 1, fontSize: 13, color: tokens.text, fontWeight: 500, lineHeight: 1.4 }}>
            Tuco escreveu uma legenda baseada na sua foto e perfil
          </div>
          <button onClick={() => setGenerating(true)} style={{
            padding: '7px 12px', borderRadius: 8, border: 'none',
            background: tokens.orange, color: '#fff', cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <Icon name="refresh" size={13} /> Gerar
          </button>
        </div>

        {/* Caption */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: tokens.text }}>Legenda</span>
            <span style={{ fontSize: 12, color: tokens.textFaint, fontVariantNumeric: 'tabular-nums' }}>{typed.length}/2200</span>
          </div>
          <div style={{
            padding: 14, borderRadius: 12,
            background: tokens.bgSoft, border: `1px solid ${tokens.border}`,
            fontSize: 14, lineHeight: 1.5, color: tokens.text,
            whiteSpace: 'pre-wrap', minHeight: 120,
            letterSpacing: '-0.005em',
          }}>
            {typed}
            {generating && <span style={{ display: 'inline-block', width: 2, height: 14, background: tokens.orange, marginLeft: 1, verticalAlign: 'text-bottom', animation: 'bicoblink 1s infinite' }} />}
          </div>
          <style>{'@keyframes bicoblink { 0%, 50% { opacity: 1 } 51%, 100% { opacity: 0 } }'}</style>
        </div>

        {/* Hashtags */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            Hashtags <AISparkle size={11} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {hashtags.map((h) => (
              <span key={h} style={{
                padding: '5px 10px', borderRadius: 999,
                background: tokens.purpleSoft, color: tokens.purple,
                fontSize: 13, fontWeight: 500,
              }}>{h}</span>
            ))}
            <button style={{
              padding: '5px 10px', borderRadius: 999, border: `1px dashed ${tokens.border}`,
              background: 'transparent', color: tokens.textMuted, cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
            }}>+ adicionar</button>
          </div>
        </div>

        {/* Channels */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text, marginBottom: 8 }}>Publicar em</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <ChannelChip label="Instagram" active />
            <ChannelChip label="WhatsApp Status" active />
            <ChannelChip label="Facebook" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ChannelChip({ label, active }) {
  const { tokens } = useTheme();
  return (
    <button style={{
      flex: 1, padding: '10px 8px', borderRadius: 10, cursor: 'pointer',
      background: active ? tokens.greenSoft : tokens.bgSoft,
      border: `1px solid ${active ? tokens.green : tokens.border}`,
      color: active ? tokens.green : tokens.textMuted,
      fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
    }}>
      {active && <Icon name="check" size={13} strokeWidth={2.5} />}
      {label}
    </button>
  );
}

// ─── 8. CLIENTS ──────────────────────────────────────────────
function ScreenClients() {
  const { tokens, tweaks } = useTheme();
  const clients = [
    { name: 'Carla Mendes', tag: 'Pacote', last: 'hoje', value: 'R$ 750/mês', recent: true },
    { name: 'João Pedro', tag: 'Avulso', last: 'amanhã', value: '8 sessões' },
    { name: 'Lia Faria', tag: 'Pacote', last: 'ontem', value: 'R$ 1.080/mês' },
    { name: 'Pedro Rocha', tag: 'Novo', last: 'há 3 dias', value: '—', isNew: true },
    { name: 'Beatriz Lima', tag: 'Pacote', last: 'há 5 dias', value: 'R$ 750/mês' },
    { name: 'Tomás Andrade', tag: 'Pausado', last: 'há 2 sem', value: '—', paused: true },
    { name: 'Renata Costa', tag: 'Avulso', last: 'há 1 mês', value: '3 sessões' },
  ];
  const groups = {
    'Hoje': clients.filter((c) => c.recent),
    'Esta semana': clients.filter((c) => !c.recent && !c.paused).slice(0, 4),
    'Inativos': clients.filter((c) => c.paused),
  };

  return (
    <PhoneFrame dark={tweaks.dark}>
      <TopBar
        title="Clientes"
        large
        trailing={
          <button style={{
            width: 40, height: 40, borderRadius: 12, border: 'none',
            background: tokens.green, color: '#fff', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="plus" size={20} strokeWidth={2.4} />
          </button>
        }
      />

      <div style={{ padding: '4px 16px 12px', flexShrink: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, height: 42, padding: '0 14px',
          background: tokens.bgSoft, borderRadius: 12,
        }}>
          <Icon name="search" size={18} color={tokens.textMuted} />
          <span style={{ flex: 1, fontSize: 14, color: tokens.textMuted }}>Buscar cliente…</span>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: tokens.text }}>
            <Icon name="filter" size={16} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 16px 8px', display: 'flex', gap: 10, flexShrink: 0, overflowX: 'auto' }}>
        <Stat2 value="24" label="ativos" tint={tokens.green} />
        <Stat2 value="3" label="novos" tint={tokens.purple} />
        <Stat2 value="R$ 6.4k" label="recorrente" tint={tokens.orange} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '4px 0 8px' }}>
        {Object.entries(groups).map(([title, list]) => (
          <div key={title} style={{ marginBottom: 4 }}>
            <div style={{
              padding: '14px 20px 6px', fontSize: 11, fontWeight: 700, color: tokens.textMuted,
              textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>{title}</div>
            {list.map((c, i) => (
              <div key={c.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 16px',
                borderTop: i === 0 ? `1px solid ${tokens.borderSoft}` : 'none',
                borderBottom: `1px solid ${tokens.borderSoft}`,
                opacity: c.paused ? 0.6 : 1,
              }}>
                <Avatar name={c.name} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: tokens.text, letterSpacing: '-0.005em' }}>{c.name}</span>
                    {c.isNew && <Pill color="purple" size="sm">novo</Pill>}
                  </div>
                  <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 2 }}>
                    {c.tag} • último contato {c.last}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.005em' }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ padding: '20px 16px', textAlign: 'center', color: tokens.textFaint, fontSize: 13 }}>
          24 clientes no total
        </div>
      </div>
      <BottomNav active="clients" style={tweaks.navStyle} />
    </PhoneFrame>
  );
}

function Stat2({ value, label, tint }) {
  const { tokens } = useTheme();
  return (
    <div style={{
      flex: 1, padding: '10px 12px', borderRadius: 10,
      background: tokens.bgSoft, border: `1px solid ${tokens.borderSoft}`,
      minWidth: 90,
    }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: tint, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontSize: 11, color: tokens.textMuted, fontWeight: 500, marginTop: 1 }}>{label}</div>
    </div>
  );
}

Object.assign(window, { ScreenAgenda, ScreenInbox, ScreenInboxThread, ScreenCreatePost, ScreenClients });
