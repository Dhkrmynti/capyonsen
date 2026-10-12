/**
 * "How Capy Onsen works": the doorway, the ten in the water, the yuzu changing heads, the boiler
 * room (reward 0.02 to the ten in two pools, then treasury 0.025, then again), and the one rule:
 * sell once and you are out in the cold. No buyback, no burn. Scenes cross-dissolve.
 */
import type React from "react";
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { At, Body, DOMAIN, LooseYuzu, Mark, Mono, Mural, Noren, O, SPOTS, Sign, Soak, Steam, TEN, Water, back, ease, easeInOut, lerp, ramp } from "./ONTheme";
import { BucketArt, ChestArt, ColdCapy, Snow, Ten } from "./ONStills";

const XF = 14;

function In({ at, dur = 16, y = 26, children, style }: { at: number; dur?: number; y?: number; children: React.ReactNode; style?: React.CSSProperties }) {
  const f = useCurrentFrame();
  const t = ease(ramp(f, at, at + dur));
  return <div style={{ opacity: t, transform: `translateY(${(1 - t) * y}px)`, ...style }}>{children}</div>;
}

/** A caption on an inked paper strip, bottom left. */
function Cap({ at, children, bg = O.paperLight, color = O.ink, style }: { at: number; children: React.ReactNode; bg?: string; color?: string; style?: React.CSSProperties }) {
  return (
    <In at={at} style={{ position: "absolute", ...style }}>
      <div style={{ background: bg, border: `5px solid ${O.ink}`, padding: "16px 26px", display: "inline-block" }}>
        <Body size={40} color={color}>
          {children}
        </Body>
      </div>
    </In>
  );
}

/* 1. the doorway: the noren drops with the name */
function Door() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = spring({ frame: f - 6, fps, config: { damping: 11, mass: 0.9 } });
  return (
    <AbsoluteFill style={{ background: O.sky, overflow: "hidden" }}>
      <Mural sun={-ramp(f, 0, 110) * 30} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center", transform: `translateY(${(1 - drop) * -640}px)` }}>
        <Noren width={1240} flaps={8}>
          <Mono size={30} color={O.yuzu}>
            CAPY ONSEN · $ONSEN · ROBINHOOD CHAIN
          </Mono>
          <Sign size={150} color={O.paperLight} style={{ marginTop: 14 }}>
            Stay in the bath.
          </Sign>
          <In at={30}>
            <Body size={42} color={O.paperLight} style={{ marginTop: 18 }}>
              A capybara bathhouse where the ten biggest holders get paid in ETH.
            </Body>
          </In>
        </Noren>
      </div>
    </AbsoluteFill>
  );
}

/* 2. the bath: ten surface, the yuzu goes to No. 1 */
function Bath() {
  const f = useCurrentFrame();
  const order = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const rise = (i: number) => Math.min(1.04, back(ramp(f, 12 + order.indexOf(i) * 5, 28 + order.indexOf(i) * 5)));
  const bob = (i: number) => (ramp(f, 12 + order.indexOf(i) * 5, 28 + order.indexOf(i) * 5) >= 1 ? Math.sin((f + i * 11) / 10) * 1.6 : 0);
  const drop = ramp(f, 76, 94);
  const land = drop >= 1;
  const [x0, y0, s0] = SPOTS[0];
  return (
    <AbsoluteFill style={{ background: O.sky, overflow: "hidden" }}>
      <Mural tiles={false} style={{ height: 520 }} />
      <Water top={400}>
        <Steam x="10%" y={-170} h={220} />
        <Steam x="46%" y={-200} h={220} delay={30} />
        <Steam x="84%" y={-180} h={220} delay={70} />
        <Ten size={230} rise={(i) => Math.min(1, rise(i))} bob={bob} yuzu={land} />
        {!land && drop > 0 ? (
          <At x={x0} y={y0} z={300}>
            <LooseYuzu size={230 * s0} style={{ transform: `translateY(${-(1 - drop * drop) * 560}px) rotate(${(1 - drop) * 140}deg)`, transformOrigin: "50% 30%" }} />
          </At>
        ) : null}
      </Water>
      <Cap at={14} style={{ left: 80, top: 70 }}>
        Ten spots in the water. The ten biggest $ONSEN holders get in.
      </Cap>
      <Cap at={96} bg={O.yuzu} style={{ left: 80, top: 190 }}>
        No. 1 wears the yuzu.
      </Cap>
    </AbsoluteFill>
  );
}

/* 3. out-hold No. 1: the two wade past each other and the yuzu changes heads */
function Overtake() {
  const f = useCurrentFrame();
  const size = 230;
  const A = SPOTS[0];
  const B = SPOTS[1];
  const t = easeInOut(ramp(f, 34, 80));
  const hop = easeInOut(ramp(f, 46, 88));
  const mixS = (a: number[], b: number[], k: number) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
  const old = mixS(A, B, t);
  const neu = mixS(B, A, t);
  const yz = mixS(old, neu, hop);
  const bob = (i: number) => Math.sin((f + i * 11) / 10) * 1.6;
  const bal = 7.1 + ease(ramp(f, 6, 40)) * 3.3;
  return (
    <AbsoluteFill style={{ background: O.sky, overflow: "hidden" }}>
      <Mural tiles={false} style={{ height: 520 }} />
      <Water top={400}>
        <Steam x="10%" y={-170} h={220} delay={20} />
        <Steam x="84%" y={-180} h={220} delay={80} />
        <Ten size={size} skip={[0, 1]} bob={bob} />
        <At x={old[0]} y={old[1]}>
          <Soak traits={TEN[0]} size={size * old[2]} bob={bob(0)} />
        </At>
        <At x={neu[0]} y={neu[1]}>
          <Soak traits={hop > 0.6 ? [1, 0, 1, 1] : TEN[1]} size={size * neu[2]} bob={bob(1)} />
        </At>
        <At x={yz[0]} y={yz[1]} z={300}>
          <LooseYuzu size={size * yz[2]} style={{ transform: `translateY(${-Math.sin(hop * Math.PI) * 120 + ((hop < 1 ? bob(0) : bob(1)) * size * yz[2]) / 100}px) rotate(${Math.sin(hop * Math.PI) * 30}deg)`, transformOrigin: "50% 30%" }} />
        </At>
      </Water>
      <Cap at={8} style={{ left: 80, top: 70 }}>
        Hold more than No. 1 and the yuzu moves to your head.
      </Cap>
      <In at={8} style={{ position: "absolute", right: 80, top: 70 }}>
        <div style={{ background: O.indigo, border: `5px solid ${O.ink}`, padding: "16px 24px", textAlign: "right" }}>
          <Mono size={32} color={O.paperLight}>
            No. 1 · 9.4M
          </Mono>
          <Mono size={32} color={bal > 9.4 ? O.yuzu : O.paperLight} style={{ marginTop: 6 }}>
            challenger · {bal.toFixed(1)}M
          </Mono>
        </div>
      </In>
      <Cap at={92} bg={O.yuzu} style={{ left: 80, top: 190 }}>
        It happens live on the page.
      </Cap>
    </AbsoluteFill>
  );
}

/* 4. the boiler room: fees fill the escrow, the reward runs, then the treasury, then again */
function StationCard({ n, name, eth, lines, art, on, fill }: { n: number; name: string; eth: string; lines: React.ReactNode; art: React.ReactNode; on: number; fill: number }) {
  return (
    <div style={{ width: 800, border: `5px solid ${on > 0.5 ? O.yuzu : O.paper}`, padding: "28px 32px 30px", background: O.coal, transform: `scale(${1 + Math.sin(Math.min(1, on) * Math.PI) * 0.03})` }}>
      <div style={{ display: "flex", gap: 28 }}>
        <div style={{ width: 170, flex: "none" }}>{art}</div>
        <div>
          <Mono size={26} color={O.yuzu}>
            STEP {n}
          </Mono>
          <Sign size={64} color={O.paper} style={{ marginTop: 2 }}>
            {name}
          </Sign>
          <Mono size={46} color={O.yuzu} style={{ marginTop: 4 }}>
            {eth} ETH
          </Mono>
        </div>
      </div>
      <div style={{ height: 30, marginTop: 22, background: O.paperLight, border: `4px solid ${O.paper}` }}>
        <div style={{ height: "100%", width: `${fill * 100}%`, background: O.furnace }} />
      </div>
      <Body size={30} color={O.paper} style={{ marginTop: 18, minHeight: 82 }}>
        {lines}
      </Body>
    </div>
  );
}

function Boiler() {
  const f = useCurrentFrame();
  // escrow fills to 0.02 (reward pays), empties, fills to 0.025 (treasury), empties
  const fill1 = ramp(f, 40, 100) * (1 - ramp(f, 112, 122));
  const paid1 = ramp(f, 100, 116);
  const fill2 = ramp(f, 130, 190) * (1 - ramp(f, 202, 212));
  const paid2 = ramp(f, 190, 206);
  const pipe = ramp(f, 14, 44);
  return (
    <AbsoluteFill style={{ background: O.coal, overflow: "hidden" }}>
      <In at={4} style={{ position: "absolute", left: 100, top: 70 }}>
        <Sign size={96} color={O.paper}>
          Every trade heats the water.
        </Sign>
      </In>
      <In at={14} style={{ position: "absolute", left: 100, top: 196 }}>
        <Body size={36} color={O.paper} style={{ opacity: 0.85 }}>
          Trading fees collect in the Pons fee escrow. The engine runs two steps, over and over.
        </Body>
      </In>
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, height: 26, background: O.coal, borderTop: `4px solid ${O.paper}`, borderBottom: `4px solid ${O.paper}` }}>
        <div style={{ height: "100%", width: `${pipe * 100}%`, background: O.yuzu }} />
      </div>
      <div style={{ position: "absolute", left: 100, right: 100, top: 420, display: "flex", justifyContent: "space-between" }}>
        <In at={22}>
          <StationCard n={1} name="Reward" eth="0.02" art={<BucketArt />} on={paid1} fill={fill1} lines={<>ETH straight to the ten in the water.<br />No. 1-5 split 0.014 · No. 6-10 split 0.006</>} />
        </In>
        <In at={32}>
          <StationCard n={2} name="Treasury" eth="0.025" art={<ChestArt />} on={paid2} fill={fill2} lines={<>ETH to the treasury wallet.<br />Every transfer is in the ledger.</>} />
        </In>
      </div>
      <Water top={900}>
        {TEN.map((t, i) => (
          <At key={i} x={46 + i * 5.4} y={84}>
            <div style={{ position: "relative" }}>
              <Soak traits={t} size={i < 5 ? 112 : 92} yuzu={i === 0} bob={Math.sin((f + i * 11) / 10) * 1.6} />
              <Mono size={24} style={{ position: "absolute", left: 0, right: 0, top: -6 - paid1 * 34, textAlign: "center", opacity: Math.sin(ramp(f, 100, 150) * Math.PI) }}>
                +ETH
              </Mono>
            </div>
          </At>
        ))}
      </Water>
      <Cap at={206} bg={O.yuzu} style={{ left: 100, bottom: 44, zIndex: 400 }}>
        Then round again. No buyback, no burn.
      </Cap>
    </AbsoluteFill>
  );
}

/* 5. the one rule: sell once, out in the cold */
function Cold() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const jump = ramp(f, 10, 34);
  const gone = jump >= 1;
  const inSnow = spring({ frame: f - 40, fps, config: { damping: 12 } });
  const split = ease(ramp(f, 30, 50));
  return (
    <AbsoluteFill style={{ background: O.water, overflow: "hidden" }}>
      {/* the bath on the left, the cold on the right; the cold slides in when the seller bolts */}
      <AbsoluteFill>
        <div style={{ position: "absolute", left: 60, width: 900, top: 330, bottom: 0 }}>
          <Ten size={170} skip={[3]} bob={(i) => Math.sin((f + i * 11) / 10) * 1.6} />
          {!gone ? (
            <At x={SPOTS[3][0]} y={SPOTS[3][1]} z={300} style={{ transform: `translate(-50%, -100%) translate(${jump * 1000}px, ${-Math.sin(jump * Math.PI * 0.75) * 760}px) rotate(${jump * 70}deg)` }}>
              <Soak traits={TEN[3]} size={170 * SPOTS[3][2]} startled={jump > 0.05} ring={false} water="transparent" />
            </At>
          ) : null}
        </div>
        <Steam x={120} y={120} h={220} />
        <Steam x={620} y={90} h={220} delay={50} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 960, transform: `translateX(${(1 - split) * 960}px)`, background: O.night, borderLeft: `8px solid ${O.ink}`, overflow: "hidden" }}>
        <Snow n={36} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 170, background: O.paperLight, borderTop: `5px solid ${O.ink}` }} />
        <div style={{ position: "absolute", left: 330, bottom: 110, transform: `translateY(${(1 - inSnow) * -700}px)` }}>
          <ColdCapy size={340} traits={TEN[3]} />
        </div>
      </div>
      <Cap at={4} bg={O.furnace} color={O.paperLight} style={{ left: 56, top: 70 }}>
        One rule: no getting out.
      </Cap>
      <Cap at={54} style={{ left: 56, top: 190 }}>
        Sell once and you are out in the cold. For good.
      </Cap>
    </AbsoluteFill>
  );
}

/* 6. close */
function Close() {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: f - 4, fps, config: { damping: 10 } });
  return (
    <AbsoluteFill style={{ background: O.indigo, overflow: "hidden", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <div style={{ transform: `scale(${pop})` }}>
        <Mark size={260} />
      </div>
      <In at={14}>
        <Sign size={140} color={O.paperLight} style={{ marginTop: 34, textAlign: "center" }}>
          Stay in the bath.
        </Sign>
      </In>
      <In at={26}>
        <Body size={40} color={O.paperLight} style={{ marginTop: 16, textAlign: "center" }}>
          Hold 100,000 $ONSEN to be let in. The ten biggest share every reward, in ETH.
        </Body>
      </In>
      <In at={38}>
        <Mono size={44} color={O.yuzu} style={{ marginTop: 30, textAlign: "center" }}>
          {DOMAIN}
        </Mono>
      </In>
    </AbsoluteFill>
  );
}

const SCENES: [React.FC, number][] = [
  [Door, 110],
  [Bath, 150],
  [Overtake, 140],
  [Boiler, 260],
  [Cold, 130],
  [Close, 120],
];
export const ON_EXPLAINER_LENGTH = SCENES.reduce((n, [, d]) => n + d, 0) - XF * (SCENES.length - 1);

function Fade({ dur, first, last, children }: { dur: number; first: boolean; last: boolean; children: React.ReactNode }) {
  const f = useCurrentFrame();
  const o = Math.min(first ? 1 : ramp(f, 0, XF), last ? 1 : 1 - ramp(f, dur - XF, dur));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
}

export function ONExplainer() {
  let at = 0;
  return (
    <AbsoluteFill style={{ background: O.indigo }}>
      {SCENES.map(([Scene, dur], i) => {
        const from = at;
        at += dur - XF;
        return (
          <Sequence key={i} from={from} durationInFrames={dur}>
            <Fade dur={dur} first={i === 0} last={i === SCENES.length - 1}>
              <Scene />
            </Fade>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
