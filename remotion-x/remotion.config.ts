import { existsSync } from "node:fs";
import { Config } from "@remotion/cli/config";

// The bundled headless shell hangs on the Mac; the installed Chrome works. Same on the Windows box.
const chrome = process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : "C:/Program Files/Google/Chrome/Application/chrome.exe";
if (existsSync(chrome)) {
  Config.setBrowserExecutable(chrome);
  Config.setChromeMode("chrome-for-testing");
}
