import { d as defineEventHandler, g as getQuery } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const chat_get = defineEventHandler((event) => {
  const q = getQuery(event);
  const text = (q.text || "").trim();
  if (!text) return { reply: "\u8BF7\u901A\u8FC7\u53C2\u6570 text \u4F20\u5165\u95EE\u9898\uFF0C\u4F8B\u5982 /api/ai/chat?text=\u4F60\u597D" };
  return { reply: `\u4F60\u8BF4\u7684\u662F\uFF1A\u201C${text}\u201D\u3002\u5F53\u524D\u4E3A\u672C\u5730\u793A\u4F8B\u670D\u52A1\uFF0C\u8FD4\u56DE\u7684\u662F\u6F14\u793A\u7B54\u6848\u3002` };
});

export { chat_get as default };
//# sourceMappingURL=chat.get.mjs.map
