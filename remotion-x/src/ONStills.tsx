/** Capy Onsen stills for X: avatar, header, the posts and the hooks, and the two GIFs. */
import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CapyHead, FUR, Yuzu, type Traits } from "../../src/onsen/Capy";
import { At, Body, DOMAIN, LooseYuzu, Mono, Mural, Noren, O, OF, OpenSpot, Plaque, SPOTS, Sig, Sign, Soak, Steam, TEN, Thermo, Water, back, ease, easeInOut, lerp, ramp } from "./ONTheme";

/** The ten in the water, each at its spot. `rise(i)` lets a scene bring them up one by one. */
export function Ten({ size, rise = () => 1, bob = () => 0, skip = [], yuzu = true }: { size: number; rise?: (i: number) => number; bob?: (i: number) => number; skip?: number[]; yuzu?: boolean }) {
  return (
    <>
      {SPOTS.map(([x, y, s], i) =>
        skip.includes(i) ? null : (
          <At key={i} x={x} y={y}>
            <Soak traits={TEN[i]} size={size * s} yuzu={yuzu && i === 0} rise={rise(i)} bob={bob(i)} />
          </At>
        ),
      )}
    </>
  );
}

/* ───────── avatar: the capybara under its yuzu, centred for X's round crop ───────── */
export function ONLogo() {
  return (
    <AbsoluteFill style={{ background: O.indigo, overflow: "hidden" }}>
      <svg viewBox="0 0 1080 1080" style={{ position: "absolute", inset: 0 }}>
        <g transform="translate(205 215) scale(6.7)">
          <CapyHead traits={[0, 0, 0, 0]} yuzu />
        </g>
        <path d="M0 1080 V800 Q90 760 180 800 T360 800 T540 800 T720 800 T900 800 T1080 800 V1080 Z" fill={O.water} />
        <path d="M0 800 Q90 760 180 800 T360 800 T540 800 T720 800 T900 800 T1080 800" fill="none" stroke={O.ink} strokeWidth="14" />
        <path d="M250 880 Q330 850 410 880 T570 880 M640 950 Q720 920 800 950" fill="none" stroke={O.paperLight} strokeWidth="12" strokeLinecap="round" />
      </svg>
    </AbsoluteFill>
  );
}

/* ───────── header: 1500x500, the avatar covers the lower left ───────── */
export function ONBanner() {
  return (
    <AbsoluteFill style={{ background: O.sky, overflow: "hidden" }}>
      <Mural tiles={false} style={{ height: 420 }} />
      <Water top={330}>
        {[
          [34, 96, 1.1, 0],
          [46, 92, 0.9, 1],
          [57, 98, 1.0, 2],
          [68, 90, 0.86, 3],
          [79, 98, 1.05, 4],
          [91, 92, 0.9, 5],
        ].map(([x, y, s, i]) => (
          <At key={i} x={x} y={y}>
            <Soak traits={TEN[i]} size={150 * s} yuzu={i === 0} />
          </At>
        ))}
      </Water>
      <Noren width={760} flaps={7} style={{ position: "absolute", left: 600, top: 0 }}>
        <Sign size={74} color={O.paperLight}>
          Stay in the bath.
        </Sign>
        <Body size={25} color={O.paperLight} style={{ marginTop: 12 }}>
          Ten spots in the water for the ten biggest $ONSEN holders, paid in ETH from trading fees.
        </Body>
        <Mono size={20} color={O.yuzu} style={{ marginTop: 12 }}>
          {DOMAIN.toUpperCase()} · ROBINHOOD CHAIN
        </Mono>
      </Noren>
    </AbsoluteFill>
  );
}

/* ───────── post: house rules, four tags on a rail ───────── */
export function ONPostRules() {
  return (
    <AbsoluteFill style={{ background: O.paper, overflow: "hidden" }}>
      <Sign size={96} style={{ position: "absolute", left: 90, top: 56 }}>
        House rules
      </Sign>
      <div style={{ position: "absolute", left: 0, right: 0, top: 206, height: 20, background: O.woodDark, borderTop: `5px solid ${O.ink}`, borderBottom: `5px solid ${O.ink}` }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 226, display: "flex", justifyContent: "space-between" }}>
        <Plaque n="1" rotate={-2} head="Hold 100,000 $ONSEN" line="to be let into the bathhouse." />
        <Plaque n="2" rotate={1.5} head="The biggest holder" line="wears the yuzu." />
        <Plaque n="3" rotate={-1} head="The ten in the water" line="share every reward, in ETH." />
        <Plaque n="4" rotate={2.5} red head="No getting out" line="Sell once and you are out in the cold. For good." />
      </div>
      <Sig style={{ left: 90, bottom: 44 }} />
      <Body size={24} style={{ position: "absolute", right: 90, bottom: 60, opacity: 0.75 }}>
        Moving between your own wallets is not a sale.
      </Body>
    </AbsoluteFill>
  );
}

/* ───────── post: before launch, the bath is empty and all ten spots are open ───────── */
export function ONPostEmpty() {
  return (
    <AbsoluteFill style={{ background: O.sky, overflow: "hidden" }}>
      <Mural tiles={false} style={{ height: 560 }} />
      <Water top={470}>
        {SPOTS.map(([x, y, s], i) => (
          <At key={i} x={x} y={y + 14}>
            <OpenSpot size={150 * s} n={i + 1} />
          </At>
        ))}
      </Water>
      <Noren width={900} flaps={7} style={{ position: "absolute", left: 90, top: 0 }}>
        <Sign size={92} color={O.paperLight}>
          The bath is empty.
        </Sign>
        <Body size={31} color={O.paperLight} style={{ marginTop: 14 }}>
          The first holder of 100,000 $ONSEN gets in, and gets the yuzu.
        </Body>
        <Mono size={24} color={O.yuzu} style={{ marginTop: 12 }}>
          {DOMAIN.toUpperCase()} · ROBINHOOD CHAIN
        </Mono>
      </Noren>
      <div style={{ position: "absolute", right: 80, top: 268, background: O.wood, border: `5px solid ${O.ink}`, padding: "22px 26px" }}>
        <Thermo label="Heating up the first reward" value={0} target={0.02} width={420} />
      </div>
    </AbsoluteFill>
  );
}

/* ───────── post: the two pools, who shares what ───────── */
export function ONPostPools() {
  return (
    <AbsoluteFill style={{ background: O.water, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 190, background: O.indigo, borderBottom: `5px solid ${O.ink}` }} />
      <Sign size={74} color={O.paperLight} style={{ position: "absolute", left: 80, top: 26 }}>
        Ten in the water. Two pools.
      </Sign>
      <Body size={28} color={O.paperLight} style={{ position: "absolute", left: 80, top: 124 }}>
        Every 0.02 ETH of trading fees goes to them, split by balance inside each pool. No. 1 wears the yuzu.
      </Body>
      <div style={{ position: "absolute", left: 60, right: 60, top: 210, bottom: 150 }}>
        <Ten size={185} />
        <Steam x="6%" y="6%" />
        <Steam x="92%" y="2%" delay={40} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 140, background: O.paper, borderTop: `5px solid ${O.ink}` }} />
      <div style={{ position: "absolute", left: 80, bottom: 30, background: O.furnace, border: `5px solid ${O.ink}`, padding: "14px 20px" }}>
        <Sign size={30} color={O.paperLight}>
          Hot pool · No. 1-5
        </Sign>
        <Mono size={26} color={O.paperLight} style={{ marginTop: 6 }}>
          share 0.014 ETH
        </Mono>
      </div>
      <div style={{ position: "absolute", left: 500, bottom: 30, background: O.paperLight, border: `5px solid ${O.ink}`, padding: "14px 20px" }}>
        <Sign size={30}>Warm pool · No. 6-10</Sign>
        <Mono size={26} style={{ marginTop: 6 }}>
          share 0.006 ETH
        </Mono>
      </div>
      <Sig style={{ right: 70, bottom: 40 }} />
    </AbsoluteFill>
  );
}

/* ───────── post: the boiler room, where the fees go ───────── */
function Station({ n, name, eth, children, art }: { n: number; name: string; eth: string; children: ReactNode; art: ReactNode }) {
  return (
    <div style={{ width: 640, position: "relative" }}>
      <div style={{ position: "absolute", left: 40, top: -62, width: 44, height: 44, borderRadius: 22, background: O.furnace, border: `5px solid ${O.paper}` }} />
      <div style={{ border: `4px solid ${O.paper}`, padding: "26px 30px 30px", display: "flex", gap: 26 }}>
        <div style={{ width: 170, flex: "none" }}>{art}</div>
        <div>
          <Mono size={24} color={O.yuzu}>
            STEP {n}
          </Mono>
          <Sign size={54} color={O.paper} style={{ marginTop: 4 }}>
            {name}
          </Sign>
          <Mono size={40} color={O.yuzu} style={{ marginTop: 6 }}>
            {eth} ETH
          </Mono>
          <Body size={25} color={O.paper} style={{ marginTop: 12 }}>
            {children}
          </Body>
        </div>
      </div>
    </div>
  );
}

const P = O.paper;
const art = { stroke: P, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
export function BucketArt() {
  return (
    <svg viewBox="0 0 160 120" width="170">
      <path d="M38 52 L48 108 H112 L122 52 Z" fill={O.wood} {...art} />
      <path d="M41 70 H119 M45 92 H115" fill="none" {...art} strokeWidth={2} />
      <path d="M38 52 Q80 16 122 52" fill="none" {...art} />
      <path d="M66 22 l12 -16 l12 16 l-12 16 Z" fill={O.yuzu} {...art} strokeWidth={2.4} />
      <path d="M100 34 l8 -11 l8 11 l-8 11 Z" fill={O.yuzu} {...art} strokeWidth={2.4} />
      <path d="M40 38 l7 -9 l7 9 l-7 9 Z" fill={O.yuzu} {...art} strokeWidth={2.4} />
    </svg>
  );
}
export function ChestArt() {
  return (
    <svg viewBox="0 0 160 120" width="170">
      <rect x="30" y="44" width="100" height="64" fill={O.wood} {...art} />
      <path d="M30 62 H130" fill="none" {...art} strokeWidth={2} />
      <rect x="62" y="30" width="36" height="14" fill={O.woodDark} {...art} />
      <path d="M70 37 H90" fill="none" {...art} strokeWidth={2.4} />
      <rect x="70" y="74" width="20" height="18" fill={O.yuzu} {...art} strokeWidth={2.4} />
      <path d="M74 74 V68 a6 6 0 0 1 12 0 V74" fill="none" {...art} strokeWidth={2.4} />
    </svg>
  );
}

export function ONPostBoiler() {
  return (
    <AbsoluteFill style={{ background: O.coal, overflow: "hidden" }}>
      <Sign size={80} color={O.paper} style={{ position: "absolute", left: 90, top: 54 }}>
        Every trade heats the water.
      </Sign>
      <Body size={29} color={O.paper} style={{ position: "absolute", left: 90, top: 162, width: 1300, opacity: 0.85 }}>
        Each trade's creator fee builds up in the Pons fee escrow. When it reaches the next level, the engine collects it and runs that step.
      </Body>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, height: 22, background: O.yuzu, borderTop: `4px solid ${O.paper}`, borderBottom: `4px solid ${O.paper}` }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 392, display: "flex", justifyContent: "space-between" }}>
        <Station n={1} name="Reward" eth="0.02" art={<BucketArt />}>
          Straight to the ten in the water. No. 1-5 split 0.014, No. 6-10 split 0.006.
        </Station>
        <Station n={2} name="Treasury" eth="0.025" art={<ChestArt />}>
          To the treasury wallet. Every transfer is in the ledger on the site.
        </Station>
      </div>
      <Mono size={25} color={O.paper} style={{ position: "absolute", left: 90, bottom: 122 }}>
        Then round again. Over one full loop: 44% to the ten in the bath, 56% to the treasury.
      </Mono>
      <Body size={25} color={O.yuzu} style={{ position: "absolute", left: 90, bottom: 74 }}>
        No buyback and no burn: the engine never buys, sells or destroys $ONSEN.
      </Body>
      <Sig dark style={{ right: 80, bottom: 44 }} />
    </AbsoluteFill>
  );
}

/* ───────── hook: sell once and you are out in the cold ───────── */
export function Snow({ n = 46 }: { n?: number }) {
  return (
    <>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: `${(i * 37 + 11) % 100}%`, top: `${(i * 53 + 7) % 92}%`, width: 6 + (i % 3) * 4, height: 6 + (i % 3) * 4, borderRadius: 10, background: O.paperLight, opacity: 0.5 + (i % 4) * 0.12 }} />
      ))}
    </>
  );
}

/** The capybara that sold: on its feet in the snow, towel on its head, wide awake. */
export function ColdCapy({ size = 360, traits = [0, 1, 0, 0] }: { size?: number; traits?: Traits }) {
  return (
    <svg viewBox="0 -10 100 150" width={size} height={size * 1.5} style={{ display: "block", overflow: "visible" }}>
      <path d="M24 84 C 14 100, 14 124, 24 132 H76 C 86 124, 86 100, 76 84 Z" fill={FUR[traits[0]]} stroke={O.ink} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M22 104 H78 V134 H22 Z" fill={O.paperLight} stroke={O.ink} strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M22 114 H78" stroke={O.indigo} strokeWidth="3" />
      <ellipse cx="34" cy="136" rx="10" ry="5" fill="#6d4b35" stroke={O.ink} strokeWidth="2.4" />
      <ellipse cx="66" cy="136" rx="10" ry="5" fill="#6d4b35" stroke={O.ink} strokeWidth="2.4" />
      <CapyHead traits={traits} startled />
      <path d="M8 60 l-7 -3 M8 70 l-8 1 M92 60 l7 -3 M92 70 l8 1" stroke={O.paperLight} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function ONHookCold() {
  return (
    <AbsoluteFill style={{ background: O.night, overflow: "hidden" }}>
      <Snow />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: O.paperLight, borderTop: `5px solid ${O.ink}` }} />
      <div style={{ position: "absolute", right: 150, bottom: 96 }}>
        <ColdCapy size={380} />
      </div>
      {/* the window back into the bath */}
      <div style={{ position: "absolute", right: 640, bottom: 150, width: 300, height: 250, background: O.water, border: `8px solid ${O.woodDark}`, outline: `5px solid ${O.ink}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 120, background: O.yuzu, opacity: 0.9 }} />
        <At x={32} y={104}>
          <Soak traits={TEN[1]} size={120} />
        </At>
        <At x={72} y={100}>
          <Soak traits={TEN[2]} size={100} />
        </At>
        <Steam x={130} y={10} h={110} />
      </div>
      <Sign size={128} color={O.paperLight} style={{ position: "absolute", left: 90, top: 70 }}>
        Sell once.
      </Sign>
      <Sign size={128} color={O.yuzu} style={{ position: "absolute", left: 90, top: 206 }}>
        Out in the cold.
      </Sign>
      <Body size={36} color={O.paperLight} style={{ position: "absolute", left: 90, top: 372, width: 620 }}>
        One sale and your spot in the water is gone. For good. Buying back does not get you in again.
      </Body>
      <Sig style={{ left: 90, bottom: 44 }} />
    </AbsoluteFill>
  );
}

/* ───────── hook: who wears the yuzu? ───────── */
export function ONHookYuzu() {
  return (
    <AbsoluteFill style={{ background: O.yuzu, overflow: "hidden" }}>
      <Water top={640} />
      <div style={{ position: "absolute", right: 170, top: 96 }}>
        <svg viewBox="0 -30 100 130" width={440} height={572} style={{ display: "block", overflow: "visible" }}>
          <path d="M30 22 C 40 15, 60 15, 70 22 C 81 29, 85 46, 85 60 C 85 79, 72 89, 50 89 C 28 89, 15 79, 15 60 C 15 46, 19 29, 30 22 Z" fill="none" stroke={O.ink} strokeWidth="2.6" strokeDasharray="5 5" />
          <text x="50" y="68" textAnchor="middle" fontFamily={OF.sign} fontSize="40" fill={O.ink}>
            ?
          </text>
          <g transform="rotate(-10 50 -6)">
            <circle cx="50" cy="-6" r="17" fill={O.paperLight} stroke={O.ink} strokeWidth="2.6" />
            <Yuzu x={50} y={-6} r={12} />
          </g>
        </svg>
      </div>
      <Sign size={132} style={{ position: "absolute", left: 90, top: 80, width: 900 }}>
        Who wears the yuzu?
      </Sign>
      <div style={{ position: "absolute", left: 90, top: 400, background: O.indigo, border: `5px solid ${O.ink}`, padding: "20px 26px", width: 760 }}>
        <Body size={34} color={O.paperLight}>
          The biggest $ONSEN holder does. Out-hold them and it moves to your head, live on the page.
        </Body>
      </div>
      <Sig style={{ left: 90, bottom: 44 }} />
    </AbsoluteFill>
  );
}

/* ───────── post: the dev wallet is the attendant ───────── */
export function ONPostAttendant() {
  return (
    <AbsoluteFill style={{ background: O.indigo, overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 110, bottom: 150 }}>
        <svg viewBox="0 0 120 100" width={600} height={500} style={{ display: "block" }}>
          <g transform="translate(22 -4) scale(0.76)">
            <CapyHead traits={[3, 0, 1, 0]} />
            <path d="M17 34 Q50 22 83 34 L83 41 Q50 30 17 41 Z" fill={O.paperLight} stroke={O.ink} strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M40 30.5 L44 37 M52 29.5 L55 36" stroke={O.indigo} strokeWidth="3" strokeLinecap="round" />
          </g>
          <rect x="6" y="58" width="108" height="42" fill={O.wood} stroke={O.ink} strokeWidth="3" />
          <path d="M6 72 H114 M42 58 V100 M78 58 V100" stroke={O.ink} strokeOpacity="0.35" strokeWidth="2" />
        </svg>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 150, background: O.paper, borderTop: `5px solid ${O.ink}` }} />
      <Sign size={88} color={O.paperLight} style={{ position: "absolute", left: 90, top: 70, width: 800 }}>
        The attendant never gets in.
      </Sign>
      <Body size={35} color={O.paperLight} style={{ position: "absolute", left: 90, top: 290, width: 760 }}>
        The dev wallet stands at the counter where everyone can see it. It is never in the water and never paid a reward.
      </Body>
      <div style={{ position: "absolute", left: 90, top: 500, background: O.yuzu, border: `5px solid ${O.ink}`, padding: "14px 22px" }}>
        <Mono size={26}>Rewards go to the top ten who never sold.</Mono>
      </div>
      <Sig style={{ left: 90, bottom: 44 }} />
    </AbsoluteFill>
  );
}

/* ───────── GIF: the bath opens. Ten surface, the yuzu lands on No. 1 ───────── */
export const ON_GIF_LENGTH = 150;
export function ONGif() {
  const f = useCurrentFrame();
  const order = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const rise = (i: number) => back(ramp(f, 10 + order.indexOf(i) * 6, 26 + order.indexOf(i) * 6));
  const bob = (i: number) => Math.sin((f + i * 11) / 9) * 1.6;
  const drop = ramp(f, 78, 96);
  const land = drop >= 1;
  const squash = land ? Math.sin(ramp(f, 96, 108) * Math.PI) * 5 : 0;
  const sign = back(ramp(f, 100, 114));
  const fade = Math.min(ramp(f, 0, 6), 1 - ramp(f, 142, 150));
  const [x0, y0, s0] = SPOTS[0];
  const size = 150;
  return (
    <AbsoluteFill style={{ background: O.sky, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Mural tiles={false} style={{ height: 330 }} />
        <Water top={250}>
          <Steam x="14%" y={-120} h={150} />
          <Steam x="78%" y={-130} h={150} delay={45} />
          {SPOTS.map(([x, y, s], i) => (
            <At key={i} x={x} y={y + 6}>
              <Soak traits={TEN[i]} size={size * s} yuzu={i === 0 && land} rise={Math.min(1, rise(i))} bob={(i === 0 ? squash : 0) + (rise(i) >= 1 ? bob(i) : 0)} />
            </At>
          ))}
          {!land && drop > 0 ? (
            <At x={x0} y={y0 + 6} z={300}>
              <LooseYuzu size={size * s0} style={{ transform: `translateY(${-(1 - drop * drop) * 420}px) rotate(${(1 - drop) * 140}deg)`, transformOrigin: "50% 30%" }} />
            </At>
          ) : null}
        </Water>
        <div style={{ position: "absolute", left: 0, right: 0, top: 36, display: "flex", justifyContent: "center", transform: `scale(${0.5 + sign * 0.5})`, opacity: Math.min(1, sign) }}>
          <div style={{ background: O.indigo, border: `5px solid ${O.ink}`, padding: "12px 26px" }}>
            <Sign size={50} color={O.paperLight}>
              The bath is open.
            </Sign>
          </div>
        </div>
        <Mono size={22} style={{ position: "absolute", left: 28, bottom: 22 }}>
          $ONSEN · {DOMAIN}
        </Mono>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

/* ───────── GIF: No. 2 out-holds No. 1, they trade spots and the yuzu changes heads ───────── */
export const ON_YUZU_LENGTH = 150;
export function ONGifYuzu() {
  const f = useCurrentFrame();
  const size = 230;
  const A: [number, number, number] = [36, 92, 1.2];
  const B: [number, number, number] = [72, 62, 0.86];
  const t = easeInOut(ramp(f, 34, 78));
  const hop = easeInOut(ramp(f, 46, 86));
  const done = hop >= 1;
  const old = [lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)];
  const neu = [lerp(B[0], A[0], t), lerp(B[1], A[1], t), lerp(B[2], A[2], t)];
  const yz = [lerp(old[0], neu[0], hop), lerp(old[1], neu[1], hop), lerp(old[2], neu[2], hop)];
  const shout = back(ramp(f, 88, 102)) * (1 - ramp(f, 132, 142));
  const fade = Math.min(ramp(f, 0, 6), 1 - ramp(f, 142, 150));
  const bob = (k: number) => Math.sin((f + k) / 9) * 1.5;
  const bal = 7.1 + ease(ramp(f, 8, 40)) * 3.3;
  return (
    <AbsoluteFill style={{ background: O.water, overflow: "hidden" }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 150, background: O.indigo, borderBottom: `5px solid ${O.ink}` }} />
        <Sign size={50} color={O.paperLight} style={{ position: "absolute", left: 30, top: 44 }}>
          {done ? "New yuzu." : "Race for the yuzu"}
        </Sign>
        <div style={{ position: "absolute", left: 0, right: 0, top: 150, bottom: 0 }}>
          <Steam x="8%" y="4%" h={150} />
          <Steam x="88%" y="30%" h={150} delay={50} />
          <At x={old[0]} y={old[1]}>
            <Soak traits={TEN[0]} size={size * old[2]} bob={bob(0)} />
          </At>
          <At x={neu[0]} y={neu[1]}>
            <Soak traits={[4, 0, 2, 4]} size={size * neu[2]} bob={bob(30)} />
          </At>
          <At x={yz[0]} y={yz[1]} z={300}>
            <LooseYuzu size={size * yz[2]} style={{ transform: `translateY(${-Math.sin(hop * Math.PI) * 90 + (hop < 1 ? bob(0) : bob(30)) * (size * yz[2]) / 100}px) rotate(${Math.sin(hop * Math.PI) * 30}deg)`, transformOrigin: "50% 30%" }} />
          </At>
        </div>
        <div style={{ position: "absolute", right: 24, bottom: 18, background: O.paperLight, border: `5px solid ${O.ink}`, padding: "10px 16px", textAlign: "right" }}>
          <Mono size={22}>@soakwhale · 9.4M</Mono>
          <Mono size={22} color={bal > 9.4 ? O.furnace : O.ink} style={{ marginTop: 4 }}>
            0x2f8c…6a9f · {bal.toFixed(1)}M
          </Mono>
        </div>
        <div style={{ position: "absolute", left: 30, top: 172, opacity: Math.min(1, shout), transform: `scale(${0.6 + shout * 0.4}) rotate(-6deg)`, transformOrigin: "0 0" }}>
          <div style={{ background: O.yuzu, border: `5px solid ${O.ink}`, padding: "8px 18px" }}>
            <Sign size={40}>The yuzu moved.</Sign>
          </div>
        </div>
        <Mono size={22} style={{ position: "absolute", left: 28, bottom: 22 }}>
          $ONSEN · {DOMAIN}
        </Mono>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
