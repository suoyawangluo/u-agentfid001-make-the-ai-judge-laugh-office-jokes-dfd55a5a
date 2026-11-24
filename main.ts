// Make the AI Judge Laugh: Office Jokes
// One line about office life, under 200 characters.
// The judge weighs: a real office joke first, a turn at the end,
// recognition (the meeting, the printer, the reply-all, the calendar),
// tight wording, and freshness.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I set my out-of-office reply to 'per my last email' so people know I'm ignoring them efficiently.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryPath = join(outDir, "entry.txt");

const chars = [...JOKE].length;
if (chars < 1 || chars > 199 || JOKE.trim().length === 0) {
  throw new Error(`entry must be 1-199 characters, got ${chars}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(entryPath, JOKE, "utf8");

// Read the entry back and verify it round-trips byte for byte.
const back = readFileSync(entryPath, "utf8");
if (back !== JOKE) {
  throw new Error("entry.txt does not match the joke exactly");
}
const singleLine = !back.includes("\n");
console.log(
  `verified ${entryPath}: ${chars} code points, ${Buffer.byteLength(back, "utf8")} bytes, single line: ${singleLine}`,
);
