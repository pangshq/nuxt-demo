import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const rank_get = defineEventHandler((event) => {
  const q = getQuery(event);
  const type = String(q.type || "hot");
  const updatedAt = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const base = [
    ["\u6C38\u8D62\u5148\u8FDB\u5236\u9020\u667A\u9009A", "018125"],
    ["\u5E7F\u53D1\u591A\u56E0\u5B50\u6DF7\u5408", "002943"],
    ["\u4E2D\u6B27\u7EA2\u5229\u4F18\u4EAB\u6DF7\u5408A", "004814"],
    ["\u4E2D\u822A\u673A\u9047\u9886\u822A\u6DF7\u5408", "018957"],
    ["\u8BFA\u5B89\u6210\u957F\u6DF7\u5408A", "320007"],
    ["\u6C38\u8D62\u79D1\u6280\u667A\u9009\u6DF7\u5408", "022365"],
    ["\u9E4F\u534E\u78B3\u4E2D\u548C\u4E3B\u9898\u6DF7\u5408", "016531"],
    ["\u6C38\u8D62\u534A\u5BFC\u4F53\u4EA7\u4E1A\u667A\u9009", "015968"],
    ["\u94F6\u6CB3\u521B\u65B0\u6210\u957F\u6DF7\u5408A", "519674"],
    ["\u5609\u5B9E\u4E2D\u8BC1\u7A00\u571F\u4EA7\u4E1AETF", "011036"]
  ];
  const sign = type === "down" ? -1 : 1;
  const list = base.map(([name, code], i) => ({
    rank: i + 1,
    name,
    code,
    changePct: Number(((Math.sin(i + type.length % 3) * 2 + (i % 2 ? 1.2 : 0.6)) * sign).toFixed(2))
  }));
  return { type, updatedAt, list };
});

export { rank_get as default };
//# sourceMappingURL=rank.get.mjs.map
