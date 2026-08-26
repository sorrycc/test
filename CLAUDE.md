# CLAUDE.md

Small TypeScript utility library. Runtime: bun.

## Commands

- Install: `bun install`
- Run one test file: `bun test src/range.test.ts` — always pass a specific file
- The full suite is for CI/harness runs, not development loops

## Rules

1. Fix bugs test-first: write a test that FAILS on the unmodified base tree and
   PASSES with your fix. A test that passes before your fix proves nothing.
2. Keep proof tests in `*.test.ts` files separate from the files you fix, and
   import only modules that already exist on the base tree.
3. Commit subjects: `subsystem: lowercase imperative`. Never add Co-Authored-By
   or "Generated with" trailers.
4. Comments only for what the code cannot say. If you need a paragraph to
   justify a workaround, the code is wrong — fix the code.
