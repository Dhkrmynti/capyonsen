#!/bin/sh
# Renders every Capy Onsen ($ONSEN) X asset into ../konten-x. Run from remotion-x/.
set -e
OUT=../konten-x
mkdir -p "$OUT" out
# no ffmpeg on the Windows box: use the one Remotion ships (it has no fps filter, hence -r 20 below)
FF=ffmpeg
command -v ffmpeg >/dev/null 2>&1 || FF=$(ls node_modules/@remotion/compositor-*/ffmpeg* | head -1)
npx remotion bundle --out-dir=build-on >/dev/null
npx remotion still build-on ONLogo "$OUT/logo-x.png"
npx remotion still build-on ONBanner "$OUT/banner-x.png"
npx remotion still build-on ONPostRules "$OUT/post-3-house-rules.png"
npx remotion still build-on ONPostPools "$OUT/post-4-two-pools.png"
npx remotion still build-on ONPostBoiler "$OUT/post-5-where-the-fees-go.png"
npx remotion still build-on ONPostAttendant "$OUT/post-6-the-attendant.png"
npx remotion still build-on ONPostEmpty "$OUT/teaser-the-bath-is-empty.png"
npx remotion still build-on ONHookCold "$OUT/hook-1-sell-once-out-in-the-cold.png"
npx remotion still build-on ONHookYuzu "$OUT/hook-2-who-wears-the-yuzu.png"
gif() {
  npx remotion render build-on "$1" "out/$1.mp4" --codec=h264 --crf=1 --concurrency=1 --gl=swangle --timeout=120000
  "$FF" -loglevel error -y -i "out/$1.mp4" -vf "split[a][b];[a]palettegen=max_colors=96:stats_mode=full[p];[b][p]paletteuse=dither=sierra2_4a" -r 20 -loop 0 "$OUT/$2"
}
gif ONGif post-2-the-bath-is-open.gif
gif ONGifYuzu gif-the-yuzu-moved.gif
npx remotion render build-on ONExplainer "$OUT/post-1-how-capy-onsen-works.mp4" --codec=h264 --crf=18 --concurrency=1 --gl=swangle --timeout=120000
ls -la "$OUT"
