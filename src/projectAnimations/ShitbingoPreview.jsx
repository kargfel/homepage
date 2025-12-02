import { useState, useEffect } from 'react';

const ShitbingoPreview = () => {
  const [markedCells, setMarkedCells] = useState(new Set());

  useEffect(() => {
    // Die Gewinn-Sequenz (Diagonale von oben links nach unten rechts)
    // Wir fügen ein paar "zufällige" Felder hinzu, bevor der Gewinn passiert, damit es echter wirkt.
    const sequence = [0, 2, 4, 7, 8];
    let timeouts = [];
    
    const runAnimation = () => {
      setMarkedCells(new Set()); // Reset
      
      let currentDelay = 500; // Start nach 500ms

      sequence.forEach((cellIndex) => {
        const timeout = setTimeout(() => {
          setMarkedCells(prev => {
            const newSet = new Set(prev);
            newSet.add(cellIndex);
            return newSet;
          });
        }, currentDelay);
        
        timeouts.push(timeout);
        // Beschleunige das Tempo leicht für Dynamik
        currentDelay += 600; 
      });

      // Loop-Restart: Wenn die Sequenz durch ist + Pause
      const restartTimeout = setTimeout(() => {
        runAnimation();
      }, currentDelay + 2000); // 2 Sekunden Pause am Ende
      
      timeouts.push(restartTimeout);
    };

    runAnimation();

    // Cleanup bei Unmount
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-full bg-neutral-100 flex items-center justify-center p-6 overflow-hidden relative">
      {/* Hintergrund-Deko (optional für Tiefe) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Bingo Karte Container */}
      <div className="relative bg-white border-2 border-neutral-900 shadow-[4px_4px_0px_0px_rgba(23,23,23,1)] w-full max-w-[280px] aspect-square p-2 flex flex-col gap-2">
        
        {/* Header der Bingo Karte */}
        <div className="w-full h-8 bg-neutral-900 flex items-center justify-center">
          <span className="text-white font-bold tracking-widest uppercase text-xs">BULLSHIT BINGO</span>
        </div>

        {/* 3x3 Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-1 flex-1">
          {[...Array(9)].map((_, index) => (
            <div 
              key={index} 
              className="relative border border-neutral-200 bg-neutral-50 flex flex-col items-center justify-center p-1"
            >
              {/* Abstrakter Text (Skeleton Style) */}
              <div className="w-3/4 h-1 bg-neutral-200 rounded mb-1"></div>
              <div className="w-1/2 h-1 bg-neutral-200 rounded"></div>

              {/* Der Stempel / Das Kreuz */}
              <div 
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  markedCells.has(index) 
                    ? 'opacity-100 scale-100 rotate-0' 
                    : 'opacity-0 scale-50 -rotate-12'
                }`}
              >
                {/* Handgezeichneter Look durch SVG */}
                <svg width="40" height="40" viewBox="0 0 100 100" className="text-red-600 drop-shadow-sm">
                  <path 
                    d="M 20 20 L 80 80 M 80 20 L 20 80" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="12" 
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShitbingoPreview;