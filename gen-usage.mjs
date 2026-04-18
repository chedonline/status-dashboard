#!/usr/bin/env node
// Generate usage.json from ccusage output.
// Run: node gen-usage.mjs

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const raw = execSync("npx -y ccusage@latest daily --json", { encoding: "utf8" });
const data = JSON.parse(raw);
const days = data.daily || [];

const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
};

function sumRange(sinceISO) {
  const rows = days.filter((d) => d.date >= sinceISO);
  const tokens = rows.reduce((s, d) => s + (d.totalTokens || 0), 0);
  const cost = rows.reduce((s, d) => s + (d.totalCost || 0), 0);
  const modelAgg = {};
  rows.forEach((d) => {
    (d.modelBreakdowns || []).forEach((m) => {
      if (!modelAgg[m.modelName]) modelAgg[m.modelName] = { cost: 0, tokens: 0 };
      modelAgg[m.modelName].cost += m.cost || 0;
      modelAgg[m.modelName].tokens += (m.inputTokens || 0) + (m.outputTokens || 0) + (m.cacheCreationTokens || 0) + (m.cacheReadTokens || 0);
    });
  });
  const models = Object.entries(modelAgg)
    .map(([name, v]) => ({
      name,
      cost: v.cost,
      tokens: v.tokens,
      pct: cost > 0 ? (v.cost / cost) * 100 : 0,
    }))
    .sort((a, b) => b.cost - a.cost);
  return { tokens, cost, models, activeDays: rows.filter((d) => d.totalTokens > 0).length };
}

const summary = {
  generatedAt: new Date().toISOString(),
  periods: [
    { label: "Today", ...sumRange(today) },
    { label: "Last 7 days", ...sumRange(daysAgo(6)) },
    { label: "Last 30 days", ...sumRange(daysAgo(29)) },
    { label: "All time", ...sumRange("0000-00-00") },
  ],
};

writeFileSync("usage.json", JSON.stringify(summary, null, 2));
console.log("Wrote usage.json:");
console.log(JSON.stringify(summary, null, 2));
