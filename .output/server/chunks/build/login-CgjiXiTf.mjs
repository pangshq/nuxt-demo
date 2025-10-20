import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, isRef, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, e as useRoute, d as useCookie, n as navigateTo } from './server.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const username = ref("");
    const password = ref("");
    const loading = ref(false);
    const route = useRoute();
    const token = useCookie("token", { maxAge: 60 * 60 * 24 * 7 });
    const onSubmit = async () => {
      loading.value = true;
      try {
        await new Promise((r) => setTimeout(r, 300));
        token.value = "demo-token";
        const redirect = route.query.redirect || "/";
        await navigateTo(redirect);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_nav_bar = resolveComponent("van-nav-bar");
      const _component_van_cell_group = resolveComponent("van-cell-group");
      const _component_van_field = resolveComponent("van-field");
      const _component_van_button = resolveComponent("van-button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-b5c893ea>`);
      _push(ssrRenderComponent(_component_van_nav_bar, { title: "登录" }, null, _parent));
      _push(`<div class="content" data-v-b5c893ea>`);
      _push(ssrRenderComponent(_component_van_cell_group, { inset: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_field, {
              modelValue: unref(username),
              "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
              label: "用户名",
              placeholder: "请输入用户名",
              clearable: ""
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_field, {
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              label: "密码",
              type: "password",
              placeholder: "请输入密码",
              clearable: ""
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_field, {
                modelValue: unref(username),
                "onUpdate:modelValue": ($event) => isRef(username) ? username.value = $event : null,
                label: "用户名",
                placeholder: "请输入用户名",
                clearable: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_van_field, {
                modelValue: unref(password),
                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                label: "密码",
                type: "password",
                placeholder: "请输入密码",
                clearable: ""
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="actions" data-v-b5c893ea>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        round: "",
        block: "",
        loading: unref(loading),
        onClick: onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` 登录 `);
          } else {
            return [
              createTextVNode(" 登录 ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b5c893ea"]]);

export { login as default };
//# sourceMappingURL=login-CgjiXiTf.mjs.map
