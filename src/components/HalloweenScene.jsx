// Hand-drawn SVG pieces for the Halloween page: flapping bats, spiders and a party crowd silhouette.
import { useId } from 'react';

// Black widow seen from above, head down, hanging from its spinnerets.
// [attach, knee, foot] for the four right-side legs; the left side mirrors them.
const SPIDER_LEGS = [
  [[34, 40], [43, 45], [46, 57]],
  [[35, 38], [47, 38], [54, 49]],
  [[35, 36], [47, 29], [55, 33]],
  [[34, 34], [44, 22], [52, 13]],
];

export function Spider() {
  const id = useId();
  const legs = SPIDER_LEGS.flatMap((pts, i) => [
    { pts, i, side: 1 },
    { pts: pts.map(([x, y]) => [60 - x, y]), i, side: -1 },
  ]);
  return (
    <svg className="hw-spider-svg" viewBox="0 0 60 60" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-abd`} cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#6b5a80" />
          <stop offset="25%" stopColor="#241a30" />
          <stop offset="100%" stopColor="#030104" />
        </radialGradient>
        <radialGradient id={`${id}-ceph`} cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#4a3d5a" />
          <stop offset="100%" stopColor="#050208" />
        </radialGradient>
      </defs>
      {legs.map(({ pts: [a, k, f], i, side }) => (
        <g
          key={`${i}${side}`}
          className="hw-leg"
          style={{ transformOrigin: `${a[0]}px ${a[1]}px`, animationDelay: `${-(i * 0.37 + (side > 0 ? 0 : 0.6))}s` }}
        >
          <polyline points={`${a} ${k} ${f}`} />
        </g>
      ))}
      <ellipse cx="30" cy="22" rx="9.5" ry="11.5" fill={`url(#${id}-abd)`} />
      <path className="hw-hourglass" d="M27.5 17 L32.5 17 L30.6 21 L32.5 25 L27.5 25 L29.4 21 Z" />
      <ellipse cx="30" cy="37.5" rx="6" ry="6.5" fill={`url(#${id}-ceph)`} />
      <circle className="hw-spider-eye" cx="28.4" cy="42" r="0.9" />
      <circle className="hw-spider-eye" cx="31.6" cy="42" r="0.9" />
      <circle className="hw-spider-eye" cx="29.2" cy="43.6" r="0.6" />
      <circle className="hw-spider-eye" cx="30.8" cy="43.6" r="0.6" />
    </svg>
  );
}

export function Bat({ className = '' }) {
  return (
    <svg className={`hw-bat-svg ${className}`} viewBox="0 0 100 50" aria-hidden="true">
      <path
        className="hw-wing"
        d="M50 22 C44 14 34 8 22 10 C16 11 8 14 2 20 C8 20 12 22 14 27 C18 23 22 23 25 28 C29 24 34 24 37 30 C41 26 46 25 50 28 Z"
      />
      <g transform="translate(100 0) scale(-1 1)">
        <path
          className="hw-wing"
          d="M50 22 C44 14 34 8 22 10 C16 11 8 14 2 20 C8 20 12 22 14 27 C18 23 22 23 25 28 C29 24 34 24 37 30 C41 26 46 25 50 28 Z"
        />
      </g>
      <ellipse cx="50" cy="26" rx="5" ry="9" />
      <circle cx="50" cy="16" r="5" />
      <path d="M46 13 L47 6 L49 12 Z M54 13 L53 6 L51 12 Z" />
      <circle className="hw-bat-eye" cx="48" cy="16" r="1" />
      <circle className="hw-bat-eye" cx="52" cy="16" r="1" />
    </svg>
  );
}

// Small seeded RNG so the crowd looks the same on every visit.
function seeded(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WIDTH = 1600;
const GROUND = 300;

function buildRow(seed, spacing, scale) {
  const rand = seeded(seed);
  const people = [];
  for (let x = -20; x < WIDTH + 40; x += spacing * (0.7 + rand() * 0.6)) {
    const roll = rand();
    const costume = rand();
    people.push({
      x,
      s: scale * (0.82 + rand() * 0.36),
      arms: roll < 0.3 ? 0 : roll < 0.68 ? 1 : 2,
      side: rand() < 0.5 ? -1 : 1,
      angle: 8 + rand() * 26,
      bend: 4 + rand() * 12,
      wave: rand() < 0.65,
      delay: -(rand() * 2).toFixed(2),
      tilt: -6 + rand() * 12,
      hat: costume < 0.16 ? 'witch' : costume < 0.28 ? 'horns' : costume < 0.4 ? 'cat' : costume < 0.52 ? 'bun' : null,
    });
  }
  return people;
}

const BACK_ROW = buildRow(7, 66, 0.72);
const FRONT_ROW = buildRow(21, 56, 1.05);

// Arm drawn as a bent stroke (upper arm + forearm) from the shoulder, plus a hand.
function Arm({ x, y, s, angle, bend, wave, delay }) {
  const ex = x + bend * s;
  const ey = y - 46 * s;
  const hx = x + bend * 0.3 * s;
  const hy = y - 92 * s;
  return (
    <g transform={`rotate(${angle} ${x} ${y})`}>
      <g className={wave ? 'hw-arm-wave' : undefined} style={{ animationDelay: `${delay}s` }}>
        <path
          d={`M${x} ${y} L${ex} ${ey} L${hx} ${hy}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={13 * s}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={hx} cy={hy - 3 * s} r={7.5 * s} />
      </g>
    </g>
  );
}

function Headwear({ x, top, s, hat }) {
  if (hat === 'witch') {
    return (
      <>
        <ellipse cx={x} cy={top + 6 * s} rx={27 * s} ry={4.5 * s} />
        <path d={`M${x - 14 * s} ${top + 6 * s} L${x + 9 * s} ${top - 40 * s} L${x + 20 * s} ${top - 34 * s} L${x + 15 * s} ${top + 6 * s} Z`} />
      </>
    );
  }
  if (hat === 'horns') {
    return (
      <path
        d={`M${x - 9 * s} ${top + 6 * s} Q${x - 14 * s} ${top - 6 * s} ${x - 20 * s} ${top - 12 * s} Q${x - 10 * s} ${top - 9 * s} ${x - 3 * s} ${top + 3 * s} Z
            M${x + 9 * s} ${top + 6 * s} Q${x + 14 * s} ${top - 6 * s} ${x + 20 * s} ${top - 12 * s} Q${x + 10 * s} ${top - 9 * s} ${x + 3 * s} ${top + 3 * s} Z`}
      />
    );
  }
  if (hat === 'cat') {
    return (
      <path
        d={`M${x - 15 * s} ${top + 12 * s} L${x - 13 * s} ${top - 8 * s} L${x - 3 * s} ${top + 4 * s} Z
            M${x + 15 * s} ${top + 12 * s} L${x + 13 * s} ${top - 8 * s} L${x + 3 * s} ${top + 4 * s} Z`}
      />
    );
  }
  if (hat === 'bun') {
    return <circle cx={x} cy={top - 4 * s} r={8.5 * s} />;
  }
  return null;
}

function Person({ x, s, arms, side, angle, bend, wave, delay, tilt, hat }) {
  const G = GROUND;
  const shoulderY = G - 88 * s;
  const headY = G - 124 * s;
  const torso = `M${x - 11 * s} ${G - 106 * s}
    Q${x - 13 * s} ${G - 96 * s} ${x - 32 * s} ${G - 91 * s}
    Q${x - 45 * s} ${G - 87 * s} ${x - 46 * s} ${G - 66 * s}
    L${x - 50 * s} ${G + 6} L${x + 50 * s} ${G + 6}
    L${x + 46 * s} ${G - 66 * s}
    Q${x + 45 * s} ${G - 87 * s} ${x + 32 * s} ${G - 91 * s}
    Q${x + 13 * s} ${G - 96 * s} ${x + 11 * s} ${G - 106 * s} Z`;
  return (
    <g>
      {arms >= 1 && (
        <Arm x={x + side * 30 * s} y={shoulderY} s={s} angle={side * angle} bend={side * bend} wave={wave} delay={delay} />
      )}
      {arms === 2 && (
        <Arm x={x - side * 30 * s} y={shoulderY} s={s} angle={-side * angle} bend={-side * bend} wave={wave} delay={delay - 0.4} />
      )}
      <path d={torso} />
      <g transform={`rotate(${tilt} ${x} ${G - 106 * s})`}>
        <ellipse cx={x} cy={headY} rx={15 * s} ry={17.5 * s} />
        <Headwear x={x} top={headY - 17.5 * s} s={s} hat={hat} />
      </g>
    </g>
  );
}

export function Crowd() {
  return (
    <svg className="hw-crowd-svg" viewBox={`0 0 ${WIDTH} ${GROUND}`} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <g className="hw-crowd-back">
        {BACK_ROW.map((p, i) => <Person key={i} {...p} />)}
      </g>
      <g className="hw-crowd-front">
        {FRONT_ROW.map((p, i) => <Person key={i} {...p} />)}
      </g>
    </svg>
  );
}

// ---------- Jack-o'-lanterns ----------
const PUMPKIN_FACES = {
  classic: {
    eyes: 'M32 52 L43 39 L52 54 Z M88 52 L77 39 L68 54 Z',
    nose: 'M56 64 L64 64 L60 57 Z',
    mouth: 'M27 70 Q60 94 93 70 L85 74 L80 67 L74 76 L66 72 L60 79 L54 72 L46 76 L40 67 L35 74 Z',
  },
  evil: {
    eyes: 'M28 46 L51 56 L33 63 Z M92 46 L69 56 L87 63 Z',
    nose: 'M57 65 L63 65 L60 59 Z',
    mouth: 'M22 69 L33 76 L37 69 L44 79 L50 72 L60 80 L70 72 L76 79 L83 69 L87 76 L98 69 Q60 106 22 69 Z',
  },
  monster: {
    eyes: 'M30 44 Q42 48 50 58 Q38 62 30 44 Z M90 44 Q78 48 70 58 Q82 62 90 44 Z',
    nose: 'M55 66 L60 58 L65 66 L60 63 Z',
    mouth: 'M20 70 Q60 82 100 70 Q96 92 78 98 L74 88 L68 98 Q60 101 52 98 L46 88 L42 98 Q24 92 20 70 Z',
  },
};

export function Pumpkin({ face = 'classic', className = '' }) {
  const id = useId();
  const f = PUMPKIN_FACES[face];
  const lobe = `url(#${id}-body)`;
  return (
    <svg className={`hw-pk ${className}`} viewBox="0 0 120 112" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-body`} cx="42%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#ffbe5c" />
          <stop offset="40%" stopColor="#f2780f" />
          <stop offset="78%" stopColor="#a8420a" />
          <stop offset="100%" stopColor="#4a1700" />
        </radialGradient>
        <radialGradient id={`${id}-fire`} cx="50%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#fffbe0" />
          <stop offset="40%" stopColor="#ffd23f" />
          <stop offset="100%" stopColor="#ff6a00" />
        </radialGradient>
        <linearGradient id={`${id}-stem`} x1="0" x2="1">
          <stop offset="0%" stopColor="#7a5a22" />
          <stop offset="100%" stopColor="#2e1f08" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="108" rx="48" ry="4" fill="rgba(0,0,0,0.55)" />
      <ellipse cx="60" cy="64" rx="56" ry="42" fill={lobe} />
      <ellipse cx="34" cy="64" rx="27" ry="40" fill={lobe} />
      <ellipse cx="86" cy="64" rx="27" ry="40" fill={lobe} />
      <ellipse cx="60" cy="65" rx="24" ry="42" fill={lobe} />
      <path d="M57 26 C56 15 59 7 67 3 L71 6 C65 11 64 18 65 27 Z" fill={`url(#${id}-stem)`} />
      <path d="M65 20 q11 -9 17 0 q4 7 -3 9" fill="none" stroke="#3f5a1a" strokeWidth="1.6" strokeLinecap="round" />
      <g className="hw-pk-face" fill={`url(#${id}-fire)`} stroke="#6b2400" strokeWidth="1.2" strokeLinejoin="round">
        <path className="hw-pk-eyes" d={f.eyes} />
        <path d={f.nose} />
        <path className="hw-pk-mouth" d={f.mouth} />
      </g>
    </svg>
  );
}

// ---------- Realistic corner cobweb ----------
// Spokes fan out from the corner at (0,0); the spiral sags toward the corner between spokes.
const WEB_SPOKES = 9;
const WEB_RINGS = [18, 32, 48, 66, 86, 108, 132, 158, 186];

function buildWeb() {
  const angles = Array.from({ length: WEB_SPOKES }, (_, i) => (i / (WEB_SPOKES - 1)) * (Math.PI / 2));
  const spokes = angles.map((a) => `M0 0 L${(Math.cos(a) * 210).toFixed(1)} ${(Math.sin(a) * 210).toFixed(1)}`);
  const rings = [];
  const dew = [];
  WEB_RINGS.forEach((r, ri) => {
    let d = '';
    angles.forEach((a, i) => {
      const jitter = 1 + (((i * 7 + ri * 3) % 5) - 2) * 0.025;
      const x = Math.cos(a) * r * jitter;
      const y = Math.sin(a) * r * jitter;
      if (i === 0) {
        d += `M${x.toFixed(1)} ${y.toFixed(1)}`;
      } else {
        const mid = (a + angles[i - 1]) / 2;
        const sag = r * 0.86;
        d += ` Q${(Math.cos(mid) * sag).toFixed(1)} ${(Math.sin(mid) * sag).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      if ((i + ri) % 4 === 1 && ri > 1) dew.push({ x, y, delay: ((i * 0.7 + ri * 0.45) % 4).toFixed(2) });
    });
    rings.push(d);
  });
  return { spokes, rings, dew };
}

const WEB = buildWeb();

export function Cobweb({ className = '' }) {
  return (
    <svg className={`hw-cobweb ${className}`} viewBox="0 0 200 200" aria-hidden="true">
      <g className="hw-cobweb-silk">
        {WEB.spokes.map((d, i) => <path key={`s${i}`} d={d} />)}
        {WEB.rings.map((d, i) => <path key={`r${i}`} d={d} />)}
        <path d="M0 140 Q30 150 52 186" />
        <path d="M120 0 Q132 26 168 44" />
      </g>
      {WEB.dew.map((p, i) => (
        <circle key={i} className="hw-dew" cx={p.x} cy={p.y} r="1.6" style={{ animationDelay: `${p.delay}s` }} />
      ))}
    </svg>
  );
}

// ---------- Swarm of bats that bursts out of the ticket button ----------
export function BatBurst({ bats }) {
  return (
    <span className="hw-burst" aria-hidden="true">
      {bats.map((b) => (
        <span
          key={b.id}
          className="hw-burst-bat"
          style={{ '--dx': `${b.dx}px`, '--dy': `${b.dy}px`, '--rot': `${b.rot}deg`, '--s': b.scale, animationDelay: `${b.delay}s` }}
        >
          <Bat />
        </span>
      ))}
    </span>
  );
}
