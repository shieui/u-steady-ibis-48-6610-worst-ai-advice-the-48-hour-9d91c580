import { mkdirSync, writeFileSync } from "node:fs";

// One line of the worst possible advice an AI could give.
const LINE =
  "Pro tip: if your smoke alarm keeps beeping, just remove the battery — silence means the danger has passed.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
