import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One line of the worst possible advice an AI could give.
const LINE =
  "Pro tip: if your smoke alarm keeps beeping, just remove the battery — silence means the danger has passed.";

// Validate the line before writing it: the gate reads /output/entry.txt
// as a single line of at most 140 characters, so nothing invisible or
// over-long may sneak in.
function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`line must be 1-140 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("line must be a single line");
  }
  for (const ch of line) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      throw new Error(`line contains a control character U+${code.toString(16).padStart(4, "0")}`);
    }
  }
}

validate(LINE);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the write round-trips: read the file back and confirm it matches
// the line byte-for-byte before declaring success.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("verification failed: /output/entry.txt does not match the line");
}
validate(written);
