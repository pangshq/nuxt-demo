import { defineComponent, ref, resolveComponent, mergeProps, withCtx, unref, isRef, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { showToast } from 'vant';
import { _ as _export_sfc, n as navigateTo } from './server.mjs';
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
  __name: "feedback",
  __ssrInlineRender: true,
  setup(__props) {
    const contact = ref("");
    const category = ref("功能建议");
    const content = ref("");
    const loading = ref(false);
    const categories = ["功能建议", "数据问题", "Bug反馈", "其他"];
    const onSubmit = async () => {
      if (!content.value.trim()) {
        return showToast("请填写问题描述");
      }
      loading.value = true;
      try {
        const res = await $fetch(
          "/api/feedback",
          {
            method: "POST",
            body: { contact: contact.value, category: category.value, content: content.value },
            headers: { "content-type": "application/json" }
          }
        );
        if (res.ok) {
          showToast("已提交，感谢反馈！");
          await new Promise((r) => setTimeout(r, 300));
          history.length > 1 ? history.back() : navigateTo("/me");
        }
      } finally {
        loading.value = false;
      }
    };
    const onBack = () => history.length > 1 ? history.back() : navigateTo("/me");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_nav_bar = resolveComponent("van-nav-bar");
      const _component_van_cell_group = resolveComponent("van-cell-group");
      const _component_van_field = resolveComponent("van-field");
      const _component_van_radio_group = resolveComponent("van-radio-group");
      const _component_van_radio = resolveComponent("van-radio");
      const _component_van_button = resolveComponent("van-button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-c4576748>`);
      _push(ssrRenderComponent(_component_van_nav_bar, {
        title: "意见反馈",
        "left-arrow": "",
        onClickLeft: onBack
      }, null, _parent));
      _push(`<div class="content" data-v-c4576748>`);
      _push(ssrRenderComponent(_component_van_cell_group, { inset: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_field, {
              modelValue: unref(category),
              "onUpdate:modelValue": ($event) => isRef(category) ? category.value = $event : null,
              label: "类型"
            }, {
              input: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_van_radio_group, {
                    modelValue: unref(category),
                    "onUpdate:modelValue": ($event) => isRef(category) ? category.value = $event : null,
                    direction: "horizontal"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(categories, (c) => {
                          _push4(ssrRenderComponent(_component_van_radio, {
                            key: c,
                            name: c
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(c)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(c), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                            return createVNode(_component_van_radio, {
                              key: c,
                              name: c
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(c), 1)
                              ]),
                              _: 2
                            }, 1032, ["name"]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_van_radio_group, {
                      modelValue: unref(category),
                      "onUpdate:modelValue": ($event) => isRef(category) ? category.value = $event : null,
                      direction: "horizontal"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                          return createVNode(_component_van_radio, {
                            key: c,
                            name: c
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(c), 1)
                            ]),
                            _: 2
                          }, 1032, ["name"]);
                        }), 64))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_field, {
              modelValue: unref(content),
              "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
              type: "textarea",
              rows: "5",
              label: "描述",
              placeholder: "请详细描述你的问题或建议"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_field, {
              modelValue: unref(contact),
              "onUpdate:modelValue": ($event) => isRef(contact) ? contact.value = $event : null,
              label: "联系方式",
              placeholder: "选填：手机号/微信/邮箱"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_field, {
                modelValue: unref(category),
                "onUpdate:modelValue": ($event) => isRef(category) ? category.value = $event : null,
                label: "类型"
              }, {
                input: withCtx(() => [
                  createVNode(_component_van_radio_group, {
                    modelValue: unref(category),
                    "onUpdate:modelValue": ($event) => isRef(category) ? category.value = $event : null,
                    direction: "horizontal"
                  }, {
                    default: withCtx(() => [
                      (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                        return createVNode(_component_van_radio, {
                          key: c,
                          name: c
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(c), 1)
                          ]),
                          _: 2
                        }, 1032, ["name"]);
                      }), 64))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_van_field, {
                modelValue: unref(content),
                "onUpdate:modelValue": ($event) => isRef(content) ? content.value = $event : null,
                type: "textarea",
                rows: "5",
                label: "描述",
                placeholder: "请详细描述你的问题或建议"
              }, null, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(_component_van_field, {
                modelValue: unref(contact),
                "onUpdate:modelValue": ($event) => isRef(contact) ? contact.value = $event : null,
                label: "联系方式",
                placeholder: "选填：手机号/微信/邮箱"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="actions" data-v-c4576748>`);
      _push(ssrRenderComponent(_component_van_button, {
        type: "primary",
        block: "",
        round: "",
        loading: unref(loading),
        onClick: onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`提交`);
          } else {
            return [
              createTextVNode("提交")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/me/feedback.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const feedback = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c4576748"]]);

export { feedback as default };
//# sourceMappingURL=feedback-CGIFJJuV.mjs.map
