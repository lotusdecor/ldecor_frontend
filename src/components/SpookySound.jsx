import { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const VOLUME = 0.35;
// A minor with a sharp 4th (the "creepy" tritone) for the music-box notes.
const NOTES = [440, 523.25, 587.33, 622.25, 659.25, 783.99, 880];

// Generated in the browser with Web Audio: a low drone, howling wind and slow music-box
// notes. No audio file to download or license. Only ever started from a click.
function startSpookyAudio() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 2);
  master.connect(ctx.destination);

  // Drone: detuned low saws through a slowly sweeping low-pass filter.
  const droneFilter = ctx.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.value = 380;
  droneFilter.connect(master);
  [55, 55.4, 82.4].forEach((freq) => {
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    const gain = ctx.createGain();
    gain.gain.value = 0.07;
    osc.connect(gain).connect(droneFilter);
    osc.start();
  });
  const sweep = ctx.createOscillator();
  sweep.frequency.value = 0.07;
  const sweepDepth = ctx.createGain();
  sweepDepth.gain.value = 220;
  sweep.connect(sweepDepth).connect(droneFilter.frequency);
  sweep.start();

  // Wind: looping noise through a band-pass filter that wanders up and down.
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  noise.loop = true;
  const windFilter = ctx.createBiquadFilter();
  windFilter.type = 'bandpass';
  windFilter.frequency.value = 650;
  windFilter.Q.value = 1.6;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.05;
  noise.connect(windFilter).connect(windGain).connect(master);
  noise.start();
  const gust = ctx.createOscillator();
  gust.frequency.value = 0.11;
  const gustDepth = ctx.createGain();
  gustDepth.gain.value = 420;
  gust.connect(gustDepth).connect(windFilter.frequency);
  gust.start();

  // Music box: soft sine notes with an echo.
  const echo = ctx.createDelay();
  echo.delayTime.value = 0.45;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.38;
  echo.connect(feedback).connect(echo);
  echo.connect(master);
  const chime = () => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = NOTES[Math.floor(Math.random() * NOTES.length)];
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
    osc.connect(gain);
    gain.connect(master);
    gain.connect(echo);
    osc.start(t);
    osc.stop(t + 2.5);
  };
  const timer = setInterval(() => { if (Math.random() < 0.65) chime(); }, 1700);

  return {
    ctx,
    stop() {
      clearInterval(timer);
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setTimeout(() => ctx.close().catch(() => {}), 600);
    },
  };
}

// Corner button that turns the generated soundtrack on and off. Off on every visit.
export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const audio = useRef(null);

  const toggle = () => {
    if (audio.current) {
      audio.current.stop();
      audio.current = null;
      setOn(false);
      return;
    }
    try {
      audio.current = startSpookyAudio();
      setOn(true);
    } catch {
      // Web Audio unavailable; leave the button off.
    }
  };

  // Go quiet while the tab is in the background, and stop for good when leaving the page.
  useEffect(() => {
    const onVisibility = () => {
      const ctx = audio.current?.ctx;
      if (!ctx) return;
      if (document.hidden) ctx.suspend().catch(() => {});
      else ctx.resume().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      audio.current?.stop();
      audio.current = null;
    };
  }, []);

  const label = on ? 'Turn off spooky sounds' : 'Play spooky sounds';
  return (
    <button
      type="button"
      className={`hw-sound-btn ${on ? 'on' : ''}`}
      onClick={toggle}
      aria-pressed={on}
      aria-label={label}
      title={label}
    >
      {on ? <FaVolumeUp aria-hidden="true" /> : <FaVolumeMute aria-hidden="true" />}
    </button>
  );
}
