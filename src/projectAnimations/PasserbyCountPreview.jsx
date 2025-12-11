import  { useState, useEffect, useRef, useCallback } from 'react';

// Wir definieren die Keyframes global, um Tailwind-Config-Probleme zu umgehen.
// cqw = Container Query Width (sorgt dafür, dass es in jeder Container-Größe passt)
const styleSheet = `
@keyframes runAcross {
  0% { transform: translateX(-50px); }
  100% { transform: translateX(calc(100cqw + 50px)); }
}
`;

const PasserbyCountPreview = () => {
  const [count, setCount] = useState(1428);
  const [gateActive, setGateActive] = useState(false);

  // State für die rendering-relevanten Daten (Visuals)
  const [passersby, setPassersby] = useState([]);

  // Refs für die Logik (Performance & Mutable Data)
  const itemsRef = useRef([]);
  const animationFrameRef = useRef();
  const gateTimeoutRef = useRef();

  // --- ZÄHLER LOGIK ---
  const triggerGate = useCallback(() => {
    setCount(c => c + 1);
    setGateActive(true);

    // Reset des Leucht-Effekts
    if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
    gateTimeoutRef.current = setTimeout(() => setGateActive(false), 150);
  }, []);

  // --- DER GAME LOOP (Logik & Spawning) ---
  useEffect(() => {
    let lastSpawnTime = 0;
    let nextSpawnDelay = 0;

    const loop = () => { // Timestamp Parameter entfernt
      const now = Date.now();

      // 1. SPAWNING LOGIK
      // Ist es Zeit für einen neuen Passanten?
      if (now - lastSpawnTime > nextSpawnDelay) {
        const id = now + Math.random();
        const duration = 1500 + Math.random() * 1500; // Speed: 1.5s - 3s
        const top = 20 + Math.random() * 60; // Höhe: 20% - 80%

        const newItem = {
          id,
          startTime: now,
          duration,
          top,
          counted: false
        };

        // Zum React State hinzufügen (fürs Rendern)
        setPassersby(prev => [...prev, newItem]);
        // Zur Ref hinzufügen (für die Berechnung im Loop)
        itemsRef.current.push(newItem);

        lastSpawnTime = now;
        nextSpawnDelay = 800 + Math.random() * 1200; // Nächster in 0.8s - 2s
      }

      // 2. LOGIK-UPDATE (Zählen & Aufräumen)
      // Wir iterieren durch alle aktiven Items in der Ref
      itemsRef.current = itemsRef.current.filter(item => {
        const elapsed = now - item.startTime;
        const progress = elapsed / item.duration;

        // CHECK: Mitte erreicht? (Progress > 0.5)
        if (progress >= 0.5 && !item.counted) {
          triggerGate();
          item.counted = true; // Markieren, damit nicht doppelt gezählt wird
        }

        // CHECK: Ende erreicht? (Progress >= 1)
        if (progress >= 1) {
          // Aus dem React State entfernen (asynchron via ID)
          setPassersby(prev => prev.filter(p => p.id !== item.id));
          return false; // Aus der Ref entfernen (filter false)
        }

        return true; // Item behalten
      });

      // Nächsten Frame anfordern
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    // Loop starten
    animationFrameRef.current = requestAnimationFrame(loop);

    // Cleanup bei Unmount
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (gateTimeoutRef.current) clearTimeout(gateTimeoutRef.current);
    };
  }, [triggerGate]);

  return (
    <div className="w-full h-full bg-slate-900 flex flex-col overflow-hidden relative font-mono select-none border border-slate-800 rounded-xl @container">
      <style>{styleSheet}</style>

      {/* --- Header --- */}
      <div className="absolute top-4 left-0 right-0 z-30 flex flex-col items-center pointer-events-none">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
          Hystreet Sensor / WÜ
        </span>
        <div className="flex items-baseline gap-2">
          {/* Live Indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {/* Zähler */}
          <span className={`text-3xl font-bold transition-all duration-75 ${gateActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'text-emerald-400'}`}>
            {count.toLocaleString()}
          </span>
        </div>
      </div>

      {/* --- Hintergrund Grid --- */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* --- Szene --- */}
      <div className="flex-1 relative w-full h-full">

        {/* Die Lichtschranke (Mitte) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px flex items-center justify-center z-20">
          <div className="absolute inset-y-0 w-px bg-slate-800"></div>

          {/* Aktiver Laser */}
          <div
            className={`absolute inset-y-8 w-[2px] bg-emerald-400 shadow-[0_0_20px_3px_rgba(52,211,153,0.8)] transition-opacity duration-75 will-change-[opacity] ${
              gateActive ? 'opacity-100' : 'opacity-0'
            }`}
          ></div>

          {/* Boden-Reflexion */}
          <div className={`absolute bottom-8 w-16 h-1 bg-emerald-500/50 blur-md rounded-full transition-opacity duration-100 ${gateActive ? 'opacity-100' : 'opacity-10'}`}></div>
        </div>

        {/* --- Passanten --- */}
        <div className="absolute inset-0 pointer-events-none">
          {passersby.map((p) => (
            <div
              key={p.id}
              className="absolute left-0 w-4 h-4 z-10 will-change-transform"
              style={{
                top: `${p.top}%`,
                // CSS Animation wird hier mit den JS-Werten gefüttert
                animationName: 'runAcross',
                animationDuration: `${p.duration}ms`,
                animationTimingFunction: 'linear',
                animationFillMode: 'forwards',
              }}
            >
              {/* Punkt Visual */}
              <div className="w-full h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] relative">
                {/* Schweif */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-1.5 bg-gradient-to-l from-white/40 to-transparent blur-[1px] rounded-l-full -z-10 translate-x-2"></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50"></div>
    </div>
  );
};

export default PasserbyCountPreview;