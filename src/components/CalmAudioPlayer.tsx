import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';

export const CalmAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleSound = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          oscillatorRef.current?.stop();
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
        }, 1000);
      }
      setIsPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Soft warm 432Hz ambient chord tone (A4)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime); // Calming 432Hz frequency

        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft gentle fade-in

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;

        setIsPlaying(true);
      } catch (err) {
        console.log('Audio playback initialized:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className={`px-4 py-3 rounded-full shadow-2xl border transition-all flex items-center gap-2 text-xs font-bold ${
          isPlaying
            ? 'bg-gradient-to-r from-[#DFBE6F] to-[#C5A059] text-[#0A2920] border-[#FDF0CA] ring-2 ring-[#C5A059]/50 animate-pulse'
            : 'bg-[#0A2920]/90 text-[#E8D39E] border-[#C5A059]/40 hover:border-[#C5A059] backdrop-blur-md'
        }`}
        title={isPlaying ? 'Mute Peaceful Ambient Tone' : 'Play Soothing Ambient Tone (432Hz)'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#0A2920]" />
            <span className="hidden sm:inline">Calm Soundscape Active</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#C5A059]" />
            <span className="hidden sm:inline">Calm Soundscape</span>
          </>
        )}
      </button>
    </div>
  );
};
