# tailtime.nvim

## Overview

Time tracking in Neovim that respects your privacy. Built after a sprint where tickets kept getting crushed but the *actual* time spent on each one was a mystery — distracted by GitHub rabbit holes, context switches, and no way to measure real productivity. tailtime.nvim is a lightweight, private, project-aware time tracker that lives entirely inside Neovim. No cloud, no accounts, no data leaving your machine.

---

## Problem

- Time tracking tools are either bloated web apps or require third-party accounts.
- Developers forget to log time manually — context switches make it impossible to track accurately.
- No easy way to track time per-project with priority levels, directly from the editor.
- Git integration was missing — seeing code changes alongside time spent unlocks actual productivity insights.

---

## Solution

A Neovim plugin that tracks time per-task with project auto-detection, priority levels, persistent local storage, and git diff statistics. All data stays in JSON files inside the project directory. It integrates with lualine for a live timer display, provides export to CSV/JSON, and generates in-editor reports grouped by project with aggregated stats.

Key features:

- **Project-based tasks** — auto-detected from the current working directory.
- **Priority levels** — low/medium/high with configurable icons.
- **Live timer** — displayed in lualine (or any statusline section).
- **Persistent storage** — daily JSON files in `./tailtask/`.
- **Git integration** — captures commit baseline on start, shows `+/-` diff on completion.
- **In-editor reports** — grouped by project with totals, peak hours, and git stats.
- **Export** — to CSV or JSON.

---

## Technical Stack

- Lua
- Neovim API
- `vim.uv` (libuv timers)
- `lualine` integration

---

## My Contributions

- Designed and implemented the full plugin architecture from scratch.
- Built the core timer engine using `vim.uv` for real-time display updates.
- Implemented persistent JSON storage with debounced saves and session per day.
- Developed git baseline capture and cumulative diff tracking per task.
- Created the report generator with project grouping, priority icons, and statistics.
- Built CSV export with proper escaping.
- Designed the priority system with shorthands (`@h`, `@m`, `@l`) and configurable icons.
- Integrated lualine for live timer display in the statusline.
- Wrote all Neovim user commands (`:TailStart`, `:TailDone`, `:TailReport`, `:TailExport`) and keymappings.

---

## Impact

Ships real, honest time tracking for developers who live in the terminal. No accounts, no sync, no overhead — just start a task, work, stop it, see the report. The git integration closes the loop between "how long" and "how much code actually changed," turning vague estimates into measurable output.
