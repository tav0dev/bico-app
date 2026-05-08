// screens-1.jsx — Login, Onboarding, Dashboard, Services

// ─── 1. LOGIN ────────────────────────────────────────────────
function ScreenLogin() {
  const { tokens } = useTheme();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  const [mode, setMode] = React.useState('login'); // login | signup

  return (
    <PhoneFrame dark={useTheme().tweaks.dark}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px 24px', overflow: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 28, marginBottom: 28 }}>
          <TucoSlot size={84} mode={useTheme().tweaks.tucoMode || 'simple'} />
          <div style={{ fontSize: 28, fontWeight: 700, color: tokens.text, marginTop: 18, letterSpacing: '-0.03em' }}>
            Bem-vindo ao Bico
          </div>
          <div style={{ fontSize: 15, color: tokens.textMuted, marginTop: 6, textAlign: 'center', maxWidth: 280, lineHeight: 1.45 }}>
            O assistente do prestador de serviço autônomo
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex', background: tokens.bgSoft, borderRadius: 12, padding: 4, marginBottom: 20,
        }}>
          {['login', 'signup'].map((m) => (
            <button key={m} onClick={() => setMode(m)} style={{
              flex: 1, height: 36, border: 'none', borderRadius: 9,
              background: mode === m ? tokens.bg : 'transparent',
              color: mode === m ? tokens.text : tokens.textMuted,
              fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              boxShadow: mode === m ? '0 1px 2px rgba(15,23,42,0.06)' : 'none',
            }}>{m === 'login' ? 'Entrar' : 'Criar conta'}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="E-mail" value={email} onChange={setEmail} placeholder="seu@email.com" icon="search" />
          <Field
            label="Senha" value={password} onChange={setPassword} placeholder="••••••••"
            type={showPw ? 'text' : 'password'} icon="settings"
            trailing={
              <button onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer', color: tokens.textMuted }}>
                <Icon name={showPw ? 'eyeOff' : 'eye'} size={18} />
              </button>
            }
          />
          {mode === 'login' && (
            <button style={{
              alignSelf: 'flex-end', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500, color: tokens.green, padding: 0,
            }}>Esqueceu a senha?</button>
          )}
          <Btn full size="lg" style={{ marginTop: 4 }}>{mode === 'login' ? 'Entrar' : 'Criar minha conta'}</Btn>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
          <div style={{ flex: 1, height: 1, background: tokens.borderSoft }} />
          <span style={{ fontSize: 12, color: tokens.textFaint, fontWeight: 500 }}>ou continue com</span>
          <div style={{ flex: 1, height: 1, background: tokens.borderSoft }} />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" full><Icon name="google" size={18}/> Google</Btn>
          <Btn variant="secondary" full><Icon name="apple" size={18}/> Apple</Btn>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 20, fontSize: 12, color: tokens.textFaint, textAlign: 'center', lineHeight: 1.5 }}>
          Ao continuar você concorda com os <span style={{ color: tokens.text, fontWeight: 500 }}>Termos</span> e a <span style={{ color: tokens.text, fontWeight: 500 }}>Política de Privacidade</span>.
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── 2. ONBOARDING ────────────────────────────────────────────
function ScreenOnboarding() {
  const { tokens, tweaks } = useTheme();
  const [step, setStep] = React.useState(2); // show step 3 of 4 by default — most interesting middle state
  const total = 4;
  const [name, setName] = React.useState('Marina Silva');
  const [profession, setProfession] = React.useState('');
  const [city, setCity] = React.useState('');

  const professions = [
    'Eletricista', 'Manicure', 'Personal trainer', 'Faxineira',
    'Encanador', 'Cabeleireiro', 'Fotógrafo', 'Confeiteira',
    'Pintor', 'Designer', 'Massoterapeuta', 'Outro',
  ];
  const selectedProfs = profession ? [profession] : ['Personal trainer'];

  return (
    <PhoneFrame dark={tweaks.dark}>
      <div style={{ flexShrink: 0, padding: '12px 20px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: tokens.text }}>
            <Icon name="arrowLeft" size={22} />
          </button>
          <span style={{ fontSize: 13, color: tokens.textMuted, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
            {step + 1} de {total}
          </span>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: tokens.textMuted, fontFamily: 'inherit', fontSize: 14, fontWeight: 500 }}>
            Pular
          </button>
        </div>
        {/* Segmented progress */}
        <div style={{ display: 'flex', gap: 5 }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: i <= step ? tokens.green : tokens.borderSoft,
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </div>

      <div style={{ flex: 1, padding: '8px 24px 16px', overflow: 'auto' }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: tokens.text, letterSpacing: '-0.025em', lineHeight: 1.2 }}>
          O que você faz?
        </div>
        <div style={{ fontSize: 15, color: tokens.textMuted, marginTop: 8, lineHeight: 1.45 }}>
          Escolha uma ou mais áreas. Você pode mudar isso depois.
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
          {professions.map((p) => {
            const sel = selectedProfs.includes(p);
            return (
              <button key={p} onClick={() => setProfession(p)} style={{
                padding: '10px 14px', borderRadius: 999,
                background: sel ? tokens.green : tokens.bgSoft,
                color: sel ? '#fff' : tokens.text,
                border: `1px solid ${sel ? tokens.green : tokens.border}`,
                fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {sel && <Icon name="check" size={14} strokeWidth={2.5} />}
                {p}
              </button>
            );
          })}
        </div>

        {/* Tuco helper */}
        <div style={{
          marginTop: 28, padding: '14px 14px 14px 12px',
          background: tokens.orangeSoft, borderRadius: 12,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <TucoSlot size={36} mode={tweaks.tucoMode || 'simple'} />
          <div style={{ flex: 1, fontSize: 13, color: tokens.text, lineHeight: 1.45 }}>
            <span style={{ fontWeight: 600 }}>Dica do Tuco: </span>
            Você atende mais de uma área? Sem problema — selecione todas que fizerem sentido.
          </div>
        </div>
      </div>

      <div style={{ flexShrink: 0, padding: '12px 24px 8px', display: 'flex', gap: 10 }}>
        <Btn variant="secondary" onClick={() => setStep(Math.max(0, step - 1))}>
          <Icon name="arrowLeft" size={18} />
        </Btn>
        <Btn full size="md" onClick={() => setStep(Math.min(total - 1, step + 1))}>
          Continuar <Icon name="arrowRight" size={18} />
        </Btn>
      </div>
    </PhoneFrame>
  );
}

// ─── 3. DASHBOARD ────────────────────────────────────────────
function ScreenDashboard() {
  const { tokens, tweaks } = useTheme();
  return (
    <PhoneFrame dark={tweaks.dark}>
      <TopBar
        title="Olá, Marina"
        subtitle="Quarta, 6 de maio"
        leading={<Avatar name="Marina Silva" size={40} />}
        trailing={
          <button style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', color: tokens.text, position: 'relative' }}>
            <Icon name="bell" size={22} />
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: 4, background: tokens.orange, border: `2px solid ${tokens.bg}` }} />
          </button>
        }
      />
      <div style={{ flex: 1, overflow: 'auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Today summary */}
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: tokens.textMuted, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Hoje</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: tokens.text, marginTop: 2, letterSpacing: '-0.02em' }}>
                3 atendimentos
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: tokens.textMuted, fontWeight: 500 }}>previsão</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: tokens.green, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>R$ 380</div>
            </div>
          </div>
          <div style={{ height: 1, background: tokens.borderSoft, margin: '0 16px' }} />
          <div style={{ padding: '12px 16px', display: 'flex', gap: 24 }}>
            <Stat label="Concluídos" value="1" color={tokens.green} />
            <Stat label="Em andamento" value="1" color={tokens.orange} />
            <Stat label="Pendente" value="1" color={tokens.textMuted} />
          </div>
        </Card>

        {/* Próximo agendamento */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, padding: '0 4px' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: tokens.text, letterSpacing: '-0.015em' }}>Próximo</div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, color: tokens.green }}>
              Ver agenda
            </button>
          </div>
          <Card padding={0}>
            <div style={{ padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{
                width: 56, padding: '8px 0', borderRadius: 10, background: tokens.greenSoft,
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0,
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: tokens.green, textTransform: 'uppercase' }}>14:00</span>
                <span style={{ fontSize: 10, color: tokens.green, marginTop: -2 }}>1h30</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: tokens.text, letterSpacing: '-0.01em' }}>
                  Treino funcional • Carla M.
                </div>
                <div style={{ fontSize: 13, color: tokens.textMuted, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="mapPin" size={13} /> Studio Vila Madalena
                </div>
              </div>
              <Icon name="chevronRight" size={18} color={tokens.textMuted} />
            </div>
          </Card>
        </div>

        {/* AI suggestions card */}
        <div style={{
          padding: 16, borderRadius: 14,
          background: tweaks.dark
            ? `linear-gradient(135deg, ${tokens.orangeSoft}, ${tokens.purpleSoft})`
            : 'linear-gradient(135deg, #FFF7ED 0%, #EEF2FF 100%)',
          border: `1px solid ${tokens.orangeSoft}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <AISparkle size={14} />
            <span style={{ fontSize: 12, fontWeight: 700, color: tokens.orange, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Tuco sugere</span>
          </div>
          <div style={{ fontSize: 15, color: tokens.text, fontWeight: 500, lineHeight: 1.45, letterSpacing: '-0.01em' }}>
            João Pedro não confirmou o treino de amanhã. Quer que eu envie um lembrete?
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <Btn variant="ai" size="sm">Enviar lembrete</Btn>
            <Btn variant="ghost" size="sm">Agora não</Btn>
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: tokens.text, marginBottom: 10, padding: '0 4px', letterSpacing: '-0.015em' }}>Atalhos</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <QuickAction icon="dollar" label="Novo orçamento" tint={tokens.green} />
            <QuickAction icon="users" label="Adicionar cliente" tint={tokens.purple} />
            <QuickAction icon="image" label="Criar post" tint={tokens.orange} ai />
            <QuickAction icon="calendar" label="Bloquear horário" tint={tokens.textMuted} />
          </div>
        </div>

      </div>
      <BottomNav active="home" style={tweaks.navStyle} />
    </PhoneFrame>
  );
}

function Stat({ label, value, color }) {
  const { tokens } = useTheme();
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color, letterSpacing: '-0.01em' }}>{value}</span>
      </div>
      <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 1 }}>{label}</div>
    </div>
  );
}

function QuickAction({ icon, label, tint, ai }) {
  const { tokens } = useTheme();
  return (
    <button style={{
      display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start',
      padding: '14px 14px 16px', borderRadius: 14,
      background: tokens.bg, border: `1px solid ${tokens.borderSoft}`,
      cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      position: 'relative',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: tint + '1A', color: tint,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={18} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: tokens.text, letterSpacing: '-0.005em' }}>{label}</span>
      {ai && <div style={{ position: 'absolute', top: 12, right: 12 }}><AISparkle size={12} /></div>}
    </button>
  );
}

// ─── 4. SERVICES ────────────────────────────────────────────
function ScreenServices() {
  const { tokens, tweaks } = useTheme();
  const services = [
    { name: 'Treino personalizado', dur: '1h', price: 120, active: true, tag: 'Mais vendido' },
    { name: 'Avaliação física', dur: '45min', price: 90, active: true },
    { name: 'Plano mensal (8 sessões)', dur: '8 sessões', price: 750, active: true, tag: 'Pacote' },
    { name: 'Treino dupla', dur: '1h', price: 180, active: true },
    { name: 'Consultoria online', dur: '30min', price: 60, active: false },
  ];
  return (
    <PhoneFrame dark={tweaks.dark}>
      <TopBar
        title="Serviços"
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
      <div style={{ padding: '4px 20px 12px' }}>
        <div style={{ fontSize: 14, color: tokens.textMuted }}>
          {services.filter((s) => s.active).length} serviços ativos
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '4px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {services.map((s, i) => (
          <Card key={i} padding={0}>
            <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: s.active ? tokens.greenSoft : tokens.borderSoft,
                color: s.active ? tokens.green : tokens.textMuted,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon name={s.tag === 'Pacote' ? 'file' : 'clock'} size={20} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: tokens.text, letterSpacing: '-0.005em' }}>{s.name}</span>
                  {s.tag && <Pill color={s.tag === 'Pacote' ? 'purple' : 'orange'} size="sm">{s.tag}</Pill>}
                </div>
                <div style={{ fontSize: 13, color: tokens.textMuted, marginTop: 3, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Icon name="clock" size={12} /> {s.dur}
                  </span>
                  <span style={{ fontWeight: 600, color: tokens.text, fontVariantNumeric: 'tabular-nums' }}>R$ {s.price}</span>
                </div>
              </div>
              <Toggle on={s.active} />
            </div>
          </Card>
        ))}

        {/* Empty hint */}
        <button style={{
          marginTop: 4, padding: '14px 16px', borderRadius: 14,
          background: 'transparent', border: `1px dashed ${tokens.border}`,
          color: tokens.textMuted, fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Icon name="plus" size={16} /> Cadastrar novo serviço
        </button>
      </div>
      <BottomNav active="home" style={tweaks.navStyle} />
    </PhoneFrame>
  );
}

function Toggle({ on }) {
  const { tokens } = useTheme();
  return (
    <div style={{
      width: 36, height: 22, borderRadius: 11, padding: 2,
      background: on ? tokens.green : tokens.border, transition: 'background 0.2s',
      flexShrink: 0,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: 9, background: '#fff',
        marginLeft: on ? 14 : 0, transition: 'margin-left 0.2s',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

Object.assign(window, { ScreenLogin, ScreenOnboarding, ScreenDashboard, ScreenServices });
