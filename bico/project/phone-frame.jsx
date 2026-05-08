// PhoneFrame.jsx — clean, abstract phone-shaped frame (no iOS/Android branding)
// Pure CSS shell with status bar + home indicator + optional bottom nav slot.

function PhoneFrame({ children, statusBar = true, dark = false, density = 'comfortable' }) {
  const bg = dark ? '#0F172A' : '#FFFFFF';
  const fg = dark ? '#F8FAFC' : '#0F172A';
  return (
    <div style={{
      width: 360,
      height: 760,
      background: bg,
      color: fg,
      borderRadius: 36,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: 16,
      fontWeight: 400,
      letterSpacing: '-0.01em',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {statusBar && <StatusBar dark={dark} />}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, position: 'relative' }}>
        {children}
      </div>
      <HomeIndicator dark={dark} />
    </div>
  );
}

function StatusBar({ dark }) {
  const fg = dark ? '#F8FAFC' : '#0F172A';
  return (
    <div style={{
      height: 44,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      fontSize: 14,
      fontWeight: 600,
      color: fg,
      letterSpacing: '-0.01em',
    }}>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* signal */}
        <svg width="16" height="10" viewBox="0 0 16 10" fill={fg}>
          <rect x="0" y="7" width="3" height="3" rx="0.5"/>
          <rect x="4.5" y="5" width="3" height="5" rx="0.5"/>
          <rect x="9" y="2.5" width="3" height="7.5" rx="0.5"/>
          <rect x="13.5" y="0" width="3" height="10" rx="0.5"/>
        </svg>
        {/* wifi */}
        <svg width="14" height="10" viewBox="0 0 14 10" fill={fg}>
          <path d="M7 9.5a1 1 0 110-2 1 1 0 010 2zm-3.5-3a4.5 4.5 0 017 0l-1 1a3 3 0 00-5 0l-1-1zm-2-2a7 7 0 0111 0l-1 1a5.5 5.5 0 00-9 0l-1-1z"/>
        </svg>
        {/* battery */}
        <svg width="24" height="10" viewBox="0 0 24 10" fill="none">
          <rect x="0.5" y="0.5" width="20" height="9" rx="2" stroke={fg} strokeOpacity="0.5"/>
          <rect x="2" y="2" width="17" height="6" rx="1" fill={fg}/>
          <rect x="21.5" y="3.5" width="1.5" height="3" rx="0.5" fill={fg} fillOpacity="0.5"/>
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator({ dark }) {
  return (
    <div style={{
      height: 28,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 8,
    }}>
      <div style={{
        width: 134, height: 5, borderRadius: 3,
        background: dark ? '#F8FAFC' : '#0F172A',
        opacity: 0.9,
      }} />
    </div>
  );
}

Object.assign(window, { PhoneFrame, StatusBar, HomeIndicator });
