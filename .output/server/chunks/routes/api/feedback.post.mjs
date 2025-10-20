import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const feedback_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = Date.now().toString(36);
  console.log("[feedback]", { id, ...body });
  return { ok: true, id };
});

export { feedback_post as default };
//# sourceMappingURL=feedback.post.mjs.map
