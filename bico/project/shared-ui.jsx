// shared-ui.jsx — BottomNav + reusable atoms

function BottomNav({ active = 'home', style: navStyle = 'icons-labels', onNav }) {
  const { tokens } = useTheme();
  const items = [
    { id: 'home', label: 'Início', icon: 'home' },
    { id: 'agenda', label: 'Agenda', icon: 'calendar' },
    { id: 'inbox', label: 'Inbox', icon: 'chat' },
    { id: 'clients', label: 'Clientes', icon: 'users' },
  ];
  if (navStyle === 'fab-centered') {
    return (
      <div style={{
        position: 'relative', flexShrink: 0, height: 72,
        borderTop: `1px solid ${tokens.borderSoft}`, background: tokens.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '0 8px',
      }}>
        {items.slice(0, 2).map((it) => <NavBtn key={it.id} item={it} active={active} onNav={onNav} compact />)}
        <button onClick={() => onNav && onNav('create')} style={{
          width: 56, height: 56, borderRadius: 28, border: 'none', background: tokens.green,
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 6px 16px ${tokens.green}55`, cursor: 'pointer',
          marginTop: -28, position: 'relative',
        }}>
          <Icon name="plus" size={26} strokeWidth={2.4} />
        </button>
        {items.slice(2).map((it) => <NavBtn key={it.id} item={it} active={active} onNav={onNav} compact />)}
      </div>
    );
  }
  return (
    <div style={{
      flexShrink: 0, borderTop: `1px solid ${tokens.borderSoft}`, background: tokens.bg,
      display: 'flex', padding: '8px 8px 4px',
    }}>
      {items.map((it) => <NavBtn key={it.id} item={it} active={active} onNav={onNav} navStyle={navStyle} />)}
    </div>
  );
}

function NavBtn({ item, active, onNav, navStyle = 'icons-labels', compact }) {
  const { tokens } = useTheme();
  const isActive = active === item.id;
  return (
    <button onClick={() => onNav && onNav(item.id)} style={{
      flex: 1, background: 'transparent', border: 'none',
      padding: compact ? '8px 4px' : '6px 4px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 3, cursor: 'pointer',
      color: isActive ? tokens.green : tokens.textMuted,
    }}>
      <Icon name={item.icon} size={22} strokeWidth={isActive ? 2.2 : 1.8} />
      {navStyle !== 'icons-only' && (
        <span style={{ fontSize: 11, fontWeight: isActive ? 600 : 500 }}>{item.label}</span>
      )}
    </button>
  );
}

function TopBar({ title, leading, trailing, subtitle, large = false }) {
  const { tokens } = useTheme();
  return (
    <div style={{
      flexShrink: 0, padding: large ? '8px 20px 4px' : '6px 16px',
      display: 'flex', alignItems: 'center', gap: 12, minHeight: 48,
      background: tokens.bg,
    }}>
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: large ? 24 : 17, fontWeight: large ? 700 : 600,
          color: tokens.text, letterSpacing: '-0.02em',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: tokens.textMuted, marginTop: 1 }}>{subtitle}</div>}
      </div>
      {trailing}
    </div>
  );
}

function Card({ children, padding = 16, style = {} }) {
  const { tokens, tweaks } = useTheme();
  const cardStyle = tweaks.cardStyle || 'soft';
  let cs = {};
  if (cardStyle === 'flat') cs = { background: tokens.bgSoft, border: 'none' };
  else if (cardStyle === 'outlined') cs = { background: tokens.bg, border: `1px solid ${tokens.border}`, boxShadow: 'none' };
  else cs = { background: tokens.bg, border: `1px solid ${tokens.borderSoft}`, boxShadow: tweaks.dark ? 'none' : '0 1px 2px rgba(15,23,42,0.04)' };
  return (
    <div style={{
      borderRadius: 14, padding, ...cs, ...style,
    }}>{children}</div>
  );
}

function Pill({ children, color = 'green', soft = true, size = 'md' }) {
  const { tokens } = useTheme();
  const map = {
    green: [tokens.green, tokens.greenSoft],
    purple: [tokens.purple, tokens.purpleSoft],
    orange: [tokens.orange, tokens.orangeSoft],
    red: [tokens.red, tokens.redSoft],
    gray: [tokens.textMuted, tokens.borderSoft],
  };
  const [fg, bg] = map[color] || map.gray;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: size === 'sm' ? '2px 7px' : '3px 9px',
      borderRadius: 999, fontSize: size === 'sm' ? 11 : 12,
      fontWeight: 600, letterSpacing: '-0.005em',
      color: soft ? fg : '#fff',
      background: soft ? bg : fg,
    }}>{children}</span>
  );
}

function Avatar({ name, color, size = 36 }) {
  const { tokens } = useTheme();
  const colors = [tokens.green, tokens.purple, tokens.orange, '#0EA5E9', '#EC4899', '#8B5CF6'];
  const initials = name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
  // Stable hash → color
  let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  const c = color || colors[Math.abs(h) % colors.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2, flexShrink: 0,
      background: c, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, letterSpacing: '-0.01em',
    }}>{initials}</div>
  );
}

function Btn({ children, variant = 'primary', size = 'md', icon, onClick, full, style = {} }) {
  const { tokens } = useTheme();
  const variants = {
    primary: { bg: tokens.green, fg: '#fff', border: 'transparent' },
    secondary: { bg: tokens.bg, fg: tokens.text, border: tokens.border },
    ghost: { bg: 'transparent', fg: tokens.text, border: 'transparent' },
    ai: { bg: tokens.orange, fg: '#fff', border: 'transparent' },
    danger: { bg: tokens.bg, fg: tokens.red, border: tokens.border },
  };
  const v = variants[variant];
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 13, height: 32 },
    md: { padding: '10px 16px', fontSize: 15, height: 44 },
    lg: { padding: '14px 20px', fontSize: 16, height: 52 },
  };
  const s = sizes[size];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      background: v.bg, color: v.fg, border: `1px solid ${v.border}`,
      borderRadius: 12, fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer',
      letterSpacing: '-0.01em', width: full ? '100%' : 'auto',
      padding: s.padding, fontSize: s.fontSize, height: s.height, ...style,
    }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
      {children}
    </button>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', icon, hint, error, trailing }) {
  const { tokens } = useTheme();
  return (
    <div>
      {label && <div style={{ fontSize: 13, fontWeight: 500, color: tokens.text, marginBottom: 6 }}>{label}</div>}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        height: 48, padding: '0 14px',
        background: tokens.bgSoft,
        border: `1px solid ${error ? tokens.red : tokens.border}`,
        borderRadius: 12,
      }}>
        {icon && <Icon name={icon} size={18} color={tokens.textMuted} />}
        <input
          type={type} value={value} placeholder={placeholder}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={!onChange}
          style={{
            flex: 1, border: 'none', outline: 'none', background: 'transparent',
            fontFamily: 'inherit', fontSize: 16, color: tokens.text,
            minWidth: 0,
          }} />
        {trailing}
      </div>
      {hint && !error && <div style={{ fontSize: 12, color: tokens.textMuted, marginTop: 5 }}>{hint}</div>}
      {error && <div style={{ fontSize: 12, color: tokens.red, marginTop: 5 }}>{error}</div>}
    </div>
  );
}

function AISparkle({ size = 14 }) {
  const { tokens } = useTheme();
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size + 6, height: size + 6, borderRadius: '50%',
      background: tokens.orangeSoft, color: tokens.orange, flexShrink: 0,
    }}>
      <Icon name="sparkle" size={size - 2} strokeWidth={2} />
    </span>
  );
}

Object.assign(window, { BottomNav, TopBar, Card, Pill, Avatar, Btn, Field, AISparkle });
