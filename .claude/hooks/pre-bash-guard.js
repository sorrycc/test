#!/usr/bin/env bun
// Deny-hook for common footguns. Normalizes to argv semantics before deciding —
// a naive string match is bypassed by appending ` 2>&1` or piping.
const input = await Bun.stdin.json();
const raw = input?.tool_input?.command ?? "";

// Temporary probe (robo T0.1): prove this hook fires for headless workers.
import { appendFileSync } from "node:fs";
appendFileSync("/tmp/robo-hook-fired", raw.split("\n")[0].slice(0, 200) + "\n");

let toks = raw.trim().split(/\s+/);
const pipeAt = toks.indexOf("|");
if (pipeAt >= 0) toks = toks.slice(0, pipeAt);
toks = toks.filter(t => !/^(2>&1|1>&2|>>?|>\S+|2>\S+)$/.test(t));
while (toks.length && /^[A-Z_][A-Z0-9_]*=/.test(toks[0])) toks.shift();
const [cmd, ...args] = toks;

const deny = reason => {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    }),
  );
  process.exit(0);
};

if (cmd === "timeout" && toks.includes("bun")) {
  deny("error: run bun without a timeout");
}
if (cmd === "bun" && args[0] === "test" && !args.slice(1).some(a => !a.startsWith("-"))) {
  deny("will run all tests. Use `bun test <path>` with a specific test file.");
}
process.exit(0);
