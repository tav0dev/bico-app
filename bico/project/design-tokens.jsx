// design-tokens.jsx — Bico brand tokens + shared helpers
// Reads tweaks via React context provider so screens stay tidy.

const BICO = {
  green: '#16A34A',
  greenDark: '#15803D',
  greenSoft: '#DCFCE7',
  purple: '#4338CA',
  purpleSoft: '#EEF2FF',
  orange: '#F97316',
  orangeSoft: '#FFEDD5',
  navy: '#1E293B',
  text: '#0F172A',
  textMuted: '#64748B',
  textFaint: '#94A3B8',
  bg: '#FFFFFF',
  bgSoft: '#F8FAFC',
  border: '#E2E8F0',
  borderSoft: '#F1F5F9',
  red: '#DC2626',
  redSoft: '#FEE2E2',
};

const BICO_DARK = {
  green: '#22C55E',
  greenDark: '#16A34A',
  greenSoft: 'rgba(34,197,94,0.15)',
  purple: '#818CF8',
  purpleSoft: 'rgba(129,140,248,0.15)',
  orange: '#FB923C',
  orangeSoft: 'rgba(251,146,60,0.15)',
  navy: '#1E293B',
  text: '#F1F5F9',
  textMuted: '#94A3B8',
  textFaint: '#64748B',
  bg: '#0B1220',
  bgSoft: '#0F172A',
  border: '#1E293B',
  borderSoft: '#1E293B',
  red: '#F87171',
  redSoft: 'rgba(220,38,38,0.18)',
};

const ThemeCtx = React.createContext({ tokens: BICO, tweaks: {} });

function ThemeProvider({ tweaks, children }) {
  const tokens = React.useMemo(() => {
    const base = tweaks.dark ? BICO_DARK : BICO;
    // Accent leader swap: when 'purple' chosen, promote purple as primary
    if (tweaks.accent === 'purple') {
      return { ...base, green: base.purple, greenDark: '#3730A3', greenSoft: base.purpleSoft, purple: base.green, purpleSoft: base.greenSoft };
    }
    return base;
  }, [tweaks.dark, tweaks.accent]);
  return <ThemeCtx.Provider value={{ tokens, tweaks }}>{children}</ThemeCtx.Provider>;
}

function useTheme() { return React.useContext(ThemeCtx); }

// Tuco placeholder — toucan slot. Renders an abstract circle with a beak triangle accent
// using brand colors when 'simple' style is selected; an empty dashed slot when 'placeholder';
// and an initial-T mark when 'hidden' (icon-only nav cases).
function TucoSlot({ size = 96, mode = 'simple', label = 'Tuco' }) {
  const { tokens } = useTheme();
  if (mode === 'hidden') return null;
  if (mode === 'placeholder') {
    return (
      <div style={{
        width: size, height: size, borderRadius: size / 2,
        border: `1.5px dashed ${tokens.border}`,
        background: tokens.bgSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'ui-monospace, SFMono-Regular, monospace',
        fontSize: Math.max(9, size * 0.11),
        color: tokens.textFaint, textAlign: 'center', lineHeight: 1.2, padding: 8,
      }}>
        Tuco<br/>illustration
      </div>
    );
  }
  // 'simple' — geometric stand-in
  return (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {/* body — purple */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        background: tokens.purple,
      }} />
      {/* navy macacão band */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, height: '38%',
        background: BICO.navy, borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%',
      }} />
      {/* eye */}
      <div style={{
        position: 'absolute', top: '28%', left: '32%',
        width: size * 0.13, height: size * 0.13, borderRadius: '50%', background: '#fff',
      }}>
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: '60%', height: '60%', borderRadius: '50%', background: BICO.navy }} />
      </div>
      {/* beak — orange */}
      <div style={{
        position: 'absolute', top: '36%', left: '54%',
        width: 0, height: 0,
        borderTop: `${size * 0.08}px solid transparent`,
        borderBottom: `${size * 0.08}px solid transparent`,
        borderLeft: `${size * 0.28}px solid ${tokens.orange}`,
        transformOrigin: 'left center',
      }} />
    </div>
  );
}

// Generic icons used across screens — minimal stroke set
function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    home: <><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
    chat: <><path d="M21 12a8 8 0 11-3.5-6.6L21 4l-1 4.5A8 8 0 0121 12z"/></>,
    users: <><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M21 19c0-2.2-1.5-4-3.5-4.4"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    sparkle: <><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 15l.7 1.8L21.5 17.5l-1.8.7L19 20l-.7-1.8L16.5 17.5l1.8-.7z"/></>,
    bell: <><path d="M6 8a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6"/><path d="M10 20a2 2 0 004 0"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>,
    chevronRight: <path d="M9 6l6 6-6 6"/>,
    chevronLeft: <path d="M15 6l-6 6 6 6"/>,
    chevronDown: <path d="M6 9l6 6 6-6"/>,
    arrowRight: <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    arrowLeft: <><path d="M19 12H5M11 5l-7 7 7 7"/></>,
    check: <path d="M5 12l5 5L20 7"/>,
    close: <path d="M6 6l12 12M18 6l-12 12"/>,
    camera: <><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></>,
    image: <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M3 17l5-5 5 5 3-3 5 5"/></>,
    mapPin: <><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></>,
    dollar: <><path d="M12 3v18"/><path d="M17 7H9.5a3 3 0 100 6h5a3 3 0 110 6H6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    edit: <><path d="M14 4l6 6-11 11H3v-6z"/><path d="M14 4l6 6"/></>,
    trash: <><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></>,
    whatsapp: <><path d="M3 21l1.5-5A8 8 0 1119 18a8 8 0 01-9-1z"/><path d="M9 9c0-.5.5-1 1-1h.5c.4 0 .7.2.8.5l.5 1.5c.1.3 0 .6-.2.8l-.5.5c.5 1 1.4 1.9 2.4 2.4l.5-.5c.2-.2.5-.3.8-.2l1.5.5c.3.1.5.4.5.8V14c0 .5-.5 1-1 1-3.3 0-6-2.7-6-6z"/></>,
    paperclip: <path d="M21 11l-9 9a5 5 0 11-7-7l9-9a3.5 3.5 0 115 5l-9 9a2 2 0 11-3-3l8-8"/>,
    send: <><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></>,
    mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></>,
    moreVert: <><circle cx="12" cy="5" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="12" cy="19" r="1.3"/></>,
    moreHoriz: <><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></>,
    file: <><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/></>,
    refresh: <><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
    filter: <path d="M3 5h18l-7 9v6l-4-2v-4z"/>,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
    eyeOff: <><path d="M3 3l18 18"/><path d="M10.5 6.2A10 10 0 0112 6c6 0 10 7 10 6"/><path d="M6.5 6.5C3.5 8.5 2 12 2 12s4 7 10 7c1.6 0 3-.5 4.3-1.2"/><circle cx="12" cy="12" r="3"/></>,
    google: <><path d="M21.5 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 01-2 3v2.5h3.3a9.6 9.6 0 002.8-7.3z" stroke="none" fill="#4285F4"/><path d="M12 22a9.4 9.4 0 006.5-2.4l-3.2-2.5c-.9.6-2 1-3.3 1a4.7 4.7 0 01-4.4-3.2H4.3v2.5A9.6 9.6 0 0012 22z" stroke="none" fill="#34A853"/><path d="M7.6 14.9a4.7 4.7 0 010-2.9V9.5H4.3a9.6 9.6 0 000 8.4l3.3-2.5z" stroke="none" fill="#FBBC05"/><path d="M12 6.4c1.3 0 2.5.5 3.4 1.4l2.6-2.6A9.5 9.5 0 0012 2 9.6 9.6 0 004.3 6.6l3.3 2.5A4.6 4.6 0 0112 6.4z" stroke="none" fill="#EA4335"/></>,
    apple: <><path d="M16 13c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.3-2.3-1.8-.2-3.5 1.1-4.4 1.1-.9 0-2.3-1-3.8-1-2 0-3.8 1.2-4.8 3-2 3.6-.5 8.8 1.5 11.7 1 1.4 2.1 3 3.6 3 1.4 0 2-.9 3.7-.9 1.8 0 2.2.9 3.7.9 1.6 0 2.6-1.4 3.5-2.8.6-1 1.1-2 1.4-3.2-.1 0-2.7-1-2.6-4z" fill="currentColor" stroke="none"/><path d="M14 4.6c.8-1 1.3-2.3 1.2-3.6-1.1.1-2.4.7-3.1 1.7-.7.8-1.3 2.1-1.2 3.4 1.2.1 2.4-.5 3.1-1.5z" fill="currentColor" stroke="none"/></>,
  };
  return <svg {...props}>{paths[name] || null}</svg>;
}

Object.assign(window, { BICO, ThemeProvider, useTheme, TucoSlot, Icon, ThemeCtx });
