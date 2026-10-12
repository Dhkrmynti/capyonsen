/** Capy Onsen ($ONSEN): the bathhouse print. Same palette, type and capybara as the site (src/onsen). */
import type { CSSProperties, ReactNode } from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadDela } from "@remotion/google-fonts/DelaGothicOne";
import { loadFont as loadZen } from "@remotion/google-fonts/ZenKakuGothicNew";
import { loadFont as loadMono } from "@remotion/google-fonts/DMMono";
import { CapyHead, Yuzu, type Traits } from "../../src/onsen/Capy";

export const DOMAIN = "capyonsen.fun";
export const HANDLE = "@capyonsen";

export const O = {
  indigo: "#1c2d5a",
  paper: "#f3ead8",
  paperLight: "#fffaf0",
  ink: "#1a1814",
  yuzu: "#f4c430",
  water: "#9fd3cc",
  wood: "#c58b52",
  woodDark: "#8e5a2c",
  furnace: "#e4472b",
  coal: "#1b1917",
  sky: "#c5e1e6",
  fuji: "#35518f",
  night: "#14203f",
};

export const OF = {
  sign: loadDela("normal", { weights: ["400"], subsets: ["latin"] }).fontFamily,
  body: loadZen("normal", { weights: ["500", "700"], subsets: ["latin"] }).fontFamily,
  mono: loadMono("normal", { weights: ["400", "500"], subsets: ["latin"] }).fontFamily,
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], clamp);
export const ease = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const back = (t: number) => {
  const c1 = 1.7;
  const c3 = c1 + 1;
  const k = Math.min(1, Math.max(0, t)) - 1;
  return 1 + c3 * k * k * k + c1 * k * k;
};
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function Sign({ children, size = 110, color = O.ink, style }: { children: ReactNode; size?: number; color?: string; style?: CSSProperties }) {
  return <div style={{ fontFamily: OF.sign, fontSize: size, lineHeight: 1.02, letterSpacing: "-0.01em", color, ...style }}>{children}</div>;
}

export function Body({ children, size = 34, color = O.ink, style }: { children: ReactNode; size?: number; color?: string; style?: CSSProperties }) {
  return <div style={{ fontFamily: OF.body, fontWeight: 700, fontSize: size, lineHeight: 1.35, color, ...style }}>{children}</div>;
}

export function Mono({ children, size = 24, color = O.ink, style }: { children: ReactNode; size?: number; color?: string; style?: CSSProperties }) {
  return <div style={{ fontFamily: OF.mono, fontWeight: 500, fontSize: size, color, fontVariantNumeric: "tabular-nums", ...style }}>{children}</div>;
}

/** The ten in the illustrations: coat, head, extras, wall. No. 1 is drawn with the yuzu instead of its hat. */
export const TEN: Traits[] = [
  [0, 0, 0, 0],
  [1, 1, 1, 1],
  [3, 2, 3, 2],
  [2, 3, 0, 3],
  [4, 4, 2, 4],
  [1, 0, 3, 5],
  [0, 1, 2, 0],
  [3, 3, 1, 1],
  [4, 2, 0, 2],
  [2, 4, 5, 3],
];

/** Where each rank soaks, in percent of the pool, and how big: the same layout as the site's doorway. */
export const SPOTS: [number, number, number][] = [
  [50, 80, 1.25],
  [31, 76, 1.05],
  [69, 76, 1.05],
  [13, 80, 0.98],
  [87, 80, 0.98],
  [36, 40, 0.78],
  [64, 40, 0.78],
  [21, 42, 0.74],
  [79, 42, 0.74],
  [50, 30, 0.72],
];

/**
 * A capybara in the water. `rise` 0 is under, 1 is up; `bob` is a few units of drift. The box is
 * 100 wide and 130 tall with the waterline near the bottom, so place it by its bottom centre.
 */
export function Soak({ traits, size = 200, yuzu = false, startled = false, rise = 1, bob = 0, water = O.water, ring = true, style }: { traits: Traits; size?: number; yuzu?: boolean; startled?: boolean; rise?: number; bob?: number; water?: string; ring?: boolean; style?: CSSProperties }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 -30 100 130" style={{ display: "block", overflow: "hidden", ...style }}>
      {ring ? <ellipse cx="50" cy="88" rx="47" ry="9" fill="none" stroke={O.paperLight} strokeOpacity={0.7 * Math.min(1, rise * 2)} strokeWidth="2" /> : null}
      <g transform={`translate(0 ${(1 - rise) * 125 + bob})`}>
        <CapyHead traits={traits} yuzu={yuzu} startled={startled} />
      </g>
      <path d="M0 100 V88 Q12 82 25 86 T50 86 T75 86 T100 88 V100 Z" fill={water} />
      <path d="M8 87.5 Q17 83 26 86 T50 86 T74 86 T92 87.5" fill="none" stroke={O.paperLight} strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** The yuzu alone, in the same box as Soak, so it can travel between heads. */
export function LooseYuzu({ size = 200, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 -30 100 130" style={{ display: "block", overflow: "visible", ...style }}>
      <Yuzu />
    </svg>
  );
}

/** A dashed ring on the water: a spot nobody has taken. */
export function OpenSpot({ size = 200, n }: { size?: number; n: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 -30 100 130" style={{ display: "block", overflow: "visible" }}>
      <ellipse cx="50" cy="84" rx="40" ry="10" fill="none" stroke={O.paperLight} strokeWidth="2.6" strokeDasharray="7 7" />
      <text x="50" y="72" textAnchor="middle" fontFamily={OF.sign} fontSize="26" fill={O.paperLight}>
        {n}
      </text>
    </svg>
  );
}

/** Puts a child at a pool spot (percent of the parent), anchored by its bottom centre. */
export function At({ x, y, z, children, style }: { x: number; y: number; z?: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -100%)", zIndex: z ?? Math.round(y), ...style }}>{children}</div>;
}

/** The Fuji mural behind the bath, as on the site's doorway. */
export function Mural({ style, sun = 0, tiles = true }: { style?: CSSProperties; sun?: number; tiles?: boolean }) {
  return (
    <svg viewBox="0 0 1600 640" preserveAspectRatio="xMidYMax slice" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", ...style }}>
      <rect width="1600" height="640" fill={O.sky} />
      <circle cx="1210" cy={250 + sun} r="74" fill={O.furnace} />
      <path d="M330 640 L700 250 Q760 214 820 250 L1230 640 Z" fill={O.fuji} />
      <path d="M700 250 Q760 214 820 250 L890 316 L838 296 L792 336 L748 298 L700 338 L664 300 L626 328 Z" fill={O.paperLight} />
      <g fill={O.paperLight}>
        <rect x="120" y="330" width="330" height="26" rx="13" />
        <rect x="60" y="372" width="250" height="26" rx="13" />
        <rect x="1180" y="390" width="320" height="26" rx="13" />
        <rect x="1300" y="432" width="240" height="26" rx="13" />
      </g>
      {tiles ? (
        <>
          <rect y="540" width="1600" height="100" fill={O.paper} />
          <path d="M0 540 H1600 M0 590 H1600 M100 540 V640 M300 540 V640 M500 540 V640 M700 540 V640 M900 540 V640 M1100 540 V640 M1300 540 V640 M1500 540 V640 M200 590 V640 M400 590 V640 M600 590 V640 M800 590 V640 M1000 590 V640 M1200 590 V640 M1400 590 V640" stroke={O.ink} strokeOpacity="0.18" strokeWidth="2" fill="none" />
        </>
      ) : null}
    </svg>
  );
}

/** The bath: a band of water with an inked wavy edge. Children are placed inside it with <At>. */
export function Water({ top, children, color = O.water, style }: { top: number | string; children?: ReactNode; color?: string; style?: CSSProperties }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, top, background: color, ...style }}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, top: -38, width: "100%", height: 40, display: "block" }}>
        <path d="M0 40 V20 Q75 0 150 20 T300 20 T450 20 T600 20 T750 20 T900 20 T1050 20 T1200 20 V40 Z" fill={color} />
        <path d="M0 20 Q75 0 150 20 T300 20 T450 20 T600 20 T750 20 T900 20 T1050 20 T1200 20" fill="none" stroke={O.ink} strokeWidth="4" vectorEffect="non-scaling-stroke" />
      </svg>
      {children}
    </div>
  );
}

/** A curl of steam that drifts up and thins. Still frames get it at phase 0. */
export function Steam({ x, y, h = 180, delay = 0, color = O.paperLight }: { x: number | string; y: number | string; h?: number; delay?: number; color?: string }) {
  const f = useCurrentFrame();
  const t = (((f + delay) % 110) + 110) % 110 / 110;
  return (
    <svg viewBox="0 0 40 120" width={h / 3} height={h} style={{ position: "absolute", left: x, top: y, opacity: 0.25 + Math.sin(t * Math.PI) * 0.55, transform: `translateY(${-t * 40}px)`, overflow: "visible" }}>
      <path d="M20 118 C 4 96, 36 80, 20 58 C 6 38, 32 24, 20 4" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

/** The noren: indigo cloth on a wooden rod, split into flaps at the hem. */
export function Noren({ children, width, flaps = 6, style }: { children: ReactNode; width: number; flaps?: number; style?: CSSProperties }) {
  return (
    <div style={{ width, ...style }}>
      <div style={{ height: 22, background: O.wood, border: `5px solid ${O.ink}`, margin: "0 -26px" }} />
      <div style={{ background: O.indigo, border: `5px solid ${O.ink}`, borderTop: "none", borderBottom: "none", padding: "34px 44px 26px" }}>{children}</div>
      <div style={{ display: "flex", gap: 10, borderLeft: `5px solid ${O.ink}`, borderRight: `5px solid ${O.ink}`, background: "transparent" }}>
        {Array.from({ length: flaps }, (_, i) => (
          <div key={i} style={{ flex: 1, height: 54, background: O.indigo, borderBottom: `5px solid ${O.ink}`, borderLeft: i ? `5px solid ${O.ink}` : "none", borderRight: i < flaps - 1 ? `5px solid ${O.ink}` : "none" }} />
        ))}
      </div>
    </div>
  );
}

/** A wooden tag on a peg, the way the bathhouse hangs its notices. */
export function Plaque({ n, head, line, red = false, width = 336, height = 400, rotate = 0 }: { n: number | string; head: ReactNode; line: ReactNode; red?: boolean; width?: number; height?: number; rotate?: number }) {
  return (
    <div style={{ width, transformOrigin: "50% 0%", transform: `rotate(${rotate}deg)` }}>
      <div style={{ width: 6, height: 46, background: O.ink, margin: "0 auto" }} />
      <div style={{ height, background: red ? O.furnace : O.wood, border: `5px solid ${O.ink}`, padding: "26px 26px 30px", color: red ? O.paperLight : O.ink, position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", top: 12, width: 18, height: 18, marginLeft: -9, borderRadius: 9, background: O.ink }} />
        <div style={{ fontFamily: OF.mono, fontWeight: 500, fontSize: 30, marginTop: 28 }}>{n}</div>
        <div style={{ fontFamily: OF.sign, fontSize: 44, lineHeight: 1.08, marginTop: 14 }}>{head}</div>
        <div style={{ fontFamily: OF.body, fontWeight: 700, fontSize: 32, lineHeight: 1.3, marginTop: 18 }}>{line}</div>
      </div>
    </div>
  );
}

/** The escrow thermometer from the beam. `value` and `target` in ETH. */
export function Thermo({ label, value, target, width = 520, dark = false }: { label: ReactNode; value: number; target: number; width?: number; dark?: boolean }) {
  const fg = dark ? O.paper : O.ink;
  return (
    <div style={{ width }}>
      <Body size={26} color={fg}>
        {label}
      </Body>
      <div style={{ height: 30, marginTop: 10, background: O.paperLight, border: `4px solid ${dark ? O.paper : O.ink}` }}>
        <div style={{ height: "100%", width: `${Math.max(0, Math.min(1, value / target)) * 100}%`, background: O.furnace }} />
      </div>
      <Mono size={26} color={fg} style={{ marginTop: 10 }}>
        {value.toFixed(4)} / {target} ETH
      </Mono>
    </div>
  );
}

/** The mark: the bathhouse sign, a capybara under a yuzu on noren indigo. */
export function Mark({ size = 64 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ display: "block" }}>
      <rect x="3" y="3" width="114" height="114" fill={O.indigo} stroke={O.ink} strokeWidth="6" />
      <g transform="translate(16 22) scale(0.88)">
        <CapyHead traits={[0, 0, 0, 0]} yuzu />
      </g>
    </svg>
  );
}

export function Sig({ style, dark = false }: { style?: CSSProperties; dark?: boolean }) {
  return (
    <div style={{ position: "absolute", display: "flex", alignItems: "center", gap: 16, ...style }}>
      <Mark size={58} />
      <div>
        <div style={{ fontFamily: OF.sign, fontSize: 28, color: dark ? O.paper : O.ink, lineHeight: 1 }}>CAPY ONSEN</div>
        <div style={{ fontFamily: OF.mono, fontWeight: 500, fontSize: 19, color: dark ? O.yuzu : O.ink, marginTop: 6 }}>{DOMAIN}</div>
      </div>
    </div>
  );
}
