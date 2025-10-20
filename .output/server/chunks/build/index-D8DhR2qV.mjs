import { _ as _export_sfc, d as useCookie, n as navigateTo } from './server.mjs';
import { defineComponent, resolveComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const token = useCookie("token");
    const logout = async () => {
      token.value = null;
      await navigateTo("/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_nav_bar = resolveComponent("van-nav-bar");
      const _component_van_search = resolveComponent("van-search");
      const _component_van_cell_group = resolveComponent("van-cell-group");
      const _component_van_cell = resolveComponent("van-cell");
      const _component_van_button = resolveComponent("van-button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-2f68c4ea>`);
      _push(ssrRenderComponent(_component_van_nav_bar, { title: "首页" }, null, _parent));
      _push(`<div class="search-wrap" data-v-2f68c4ea>`);
      _push(ssrRenderComponent(_component_van_search, {
        placeholder: "请输入需要搜索的关键词",
        shape: "round",
        readonly: "",
        onFocus: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/search"),
        onClickInput: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/search")
      }, null, _parent));
      _push(`</div><div class="content" data-v-2f68c4ea>`);
      _push(ssrRenderComponent(_component_van_cell_group, { inset: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_cell, {
              title: "欢迎",
              value: "已登录"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_cell, {
              title: "示例",
              label: "这是一个受保护的页面"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_cell, {
              title: "基金详情演示",
              label: "跳转到示例基金详情（含 ECharts 折线图）",
              "is-link": "",
              onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/fund/515720")
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_cell, {
                title: "欢迎",
                value: "已登录"
              }),
              createVNode(_component_van_cell, {
                title: "示例",
                label: "这是一个受保护的页面"
              }),
              createVNode(_component_van_cell, {
                title: "基金详情演示",
                label: "跳转到示例基金详情（含 ECharts 折线图）",
                "is-link": "",
                onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/fund/515720")
              }, null, 8, ["onClick"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="actions" data-v-2f68c4ea>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "danger",
        block: "",
        round: "",
        onClick: logout
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`退出登录`);
          } else {
            return [
              createTextVNode("退出登录")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2f68c4ea"]]);

export { index as default };
//# sourceMappingURL=index-D8DhR2qV.mjs.map
