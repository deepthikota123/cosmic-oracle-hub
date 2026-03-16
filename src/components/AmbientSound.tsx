import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientSound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create a simple ambient oscillator using Web Audio API
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0;
    gainNode.connect(ctx.destination);

    // Create ethereal ambient tones
    const createTone = (freq: number, detune: number) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = detune;

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.03;

      // LFO for gentle volume modulation
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + Math.random() * 0.1;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.015;
      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(gainNode);
      osc.start();
      return { osc, lfo };
    };

    const tones = [
      createTone(174, 0),   // Deep cosmic hum
      createTone(261, 5),   // Gentle chime
      createTone(396, -3),  // Higher harmonic
    ];

    audioRef.current = { ctx, gainNode, tones } as any;

    return () => {
      tones.forEach(({ osc, lfo }) => { osc.stop(); lfo.stop(); });
      ctx.close();
    };
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current as any;
    if (!audio?.ctx) return;

    if (audio.ctx.state === 'suspended') {
      audio.ctx.resume();
    }

    if (isPlaying) {
      audio.gainNode.gain.setTargetAtTime(0, audio.ctx.currentTime, 0.5);
    } else {
      audio.gainNode.gain.setTargetAtTime(1, audio.ctx.currentTime, 0.5);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-6 left-6 z-50 w-10 h-10 rounded-full border border-cosmic-gold/20 bg-card/60 backdrop-blur-md flex items-center justify-center text-foreground/60 hover:text-cosmic-gold hover:border-cosmic-gold/40 transition-all"
      title={isPlaying ? 'Mute ambient sound' : 'Play cosmic ambience'}
    >
      {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
};
