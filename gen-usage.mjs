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
  const modelCost = {};
  rows.forEach((d) => {
    (d.modelBreakdowns || []).forEach((m) => {
      modelCost[m.modelName] = (modelCost[m.modelName] || 0) + (m.cost || 0);
    });
  });
  const top = Object.entries(modelCost).sort((a, b) => b[1] - a[1])[0];
  return { tokens, cost, topModel: top ? top[0] : "—", activeDays: rows.filter((d) => d.totalTokens > 0).length };
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
