import { d as defineEventHandler, a as getRouterParam, g as getQuery } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

function daysForRange(range) {
  const now = /* @__PURE__ */ new Date();
  const start = new Date(now);
  switch (range) {
    case "ytd":
      start.setMonth(0, 1);
      break;
    case "1m":
      start.setMonth(now.getMonth() - 1);
      break;
    case "3m":
      start.setMonth(now.getMonth() - 3);
      break;
    case "6m":
      start.setMonth(now.getMonth() - 6);
      break;
    case "1y":
    default:
      start.setFullYear(now.getFullYear() - 1);
  }
  const days = [];
  const cursor = new Date(start);
  while (cursor <= now) {
    const m = String(cursor.getMonth() + 1).padStart(2, "0");
    const d = String(cursor.getDate()).padStart(2, "0");
    days.push(`${cursor.getFullYear()}-${m}-${d}`);
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}
function prng(seed) {
  let x = seed >>> 0;
  return () => {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    return (x >>> 0) / 4294967296;
  };
}
function makeNav(len, seed, drift = -8e-4, vol = 0.01) {
  const rand = prng(seed);
  const nav = [];
  let v = 1;
  for (let i = 0; i < len; i++) {
    const r = (rand() - 0.5) * vol + drift;
    v *= 1 + r;
    v = Math.max(0.4, v);
    nav.push(Number(v.toFixed(4)));
  }
  return nav;
}
function seriesFromNav(nav) {
  const start = nav[0];
  const perf = nav.map((n) => Number(((n / start - 1) * 100).toFixed(2)));
  let peak = nav[0];
  const dd = nav.map((n) => {
    peak = Math.max(peak, n);
    return Number(((n / peak - 1) * 100).toFixed(2));
  });
  return { perf, dd };
}
const _code_ = defineEventHandler((event) => {
  const code = getRouterParam(event, "code") || "515720";
  const q = getQuery(event);
  const range = q.range || "1y";
  const x = daysForRange(range);
  const navFund = makeNav(x.length, code.length * 101, -5e-4, 0.012);
  const navBench = makeNav(x.length, code.length * 53, -2e-4, 8e-3);
  const { perf: fund, dd: drawdown } = seriesFromNav(navFund);
  const { perf: bench } = seriesFromNav(navBench);
  const r = prng(code.length * 77);
  const volume = x.map((_, i) => {
    const base = 200 + i % 7 * 20;
    const noise = Math.floor(r() * 150);
    return base + noise;
  });
  return {
    info: {
      code,
      name: "\u6F14\u793A\u57FA\u91D1\uFF08\u793A\u4F8B\uFF09",
      latestNav: 0.9566,
      dayChangePct: -1.79,
      ytdPct: 0,
      sinceInceptionAnnualPct: -4.34
    },
    range,
    chart: {
      x,
      fund,
      // %
      bench,
      // %
      drawdown,
      // % (<=0)
      nav: navFund,
      // unit NAV
      volume
      // thousands
    }
  };
});

export { _code_ as default };
//# sourceMappingURL=_code_.mjs.map
