import { _ as __nuxt_component_0$1 } from './client-only-B3WxQIJt.mjs';
import { defineComponent, computed, ref, withAsyncContext, watch, resolveComponent, mergeProps, unref, withCtx, createTextVNode, isRef, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, e as useRoute, n as navigateTo } from './server.mjs';
import { u as useFetch } from './fetch-Bjlqqv0_.mjs';
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
import '@vue/shared';
import 'perfect-debounce';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FundLineChart",
  __ssrInlineRender: true,
  props: {
    x: {},
    series: {},
    height: {},
    visible: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    const render = async () => {
      return;
    };
    watch(
      () => ({ x: props.x, s: props.series }),
      () => render(),
      { deep: true }
    );
    watch(
      () => props.visible,
      async (v) => {
        return;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FundLineChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-10a423c2"]]), { __name: "FundLineChart" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "EChartBase",
  __ssrInlineRender: true,
  props: {
    option: {},
    height: {},
    visible: { type: Boolean, default: true }
  },
  setup(__props) {
    const props = __props;
    ref(null);
    const render = async () => {
      return;
    };
    watch(
      () => props.option,
      () => render(),
      { deep: true }
    );
    watch(
      () => props.visible,
      async (v) => {
        return;
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_client_only, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EChartBase.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "EChartBase" });
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[code]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const code = computed(() => String(route.params.code || ""));
    const ranges = [
      { key: "ytd", label: "今年来" },
      { key: "1m", label: "近1月" },
      { key: "3m", label: "近3月" },
      { key: "6m", label: "近6月" },
      { key: "1y", label: "近1年" }
    ];
    const range = ref("1y");
    const showBench = ref(true);
    const activeTab = ref("trend");
    const autoRefresh = ref(false);
    const { data, pending, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(() => `/api/fund/${code.value}`, {
      query: { range },
      watch: [range, code]
    }, "$Dbwr6Tj7kR")), __temp = await __temp, __restore(), __temp);
    const x = computed(() => data.value?.chart.x ?? []);
    const perfSeries = computed(() => {
      const fund = data.value?.chart.fund ?? [];
      const bench = data.value?.chart.bench ?? [];
      const list = [
        { name: "本基金", data: fund, color: "#ff4d4f", area: true }
      ];
      if (showBench.value) list.push({ name: "沪深300", data: bench, color: "#2f88ff" });
      return list;
    });
    const ddSeries = computed(() => [{
      name: "最大回撤",
      data: data.value?.chart.drawdown ?? [],
      color: "#ff7a45",
      area: true
    }]);
    const navOption = computed(() => {
      const nav = data.value?.chart.nav ?? [];
      return {
        grid: { left: 12, right: 12, top: 16, bottom: 24, containLabel: true },
        tooltip: { trigger: "axis", valueFormatter: (v) => v.toFixed(4) },
        xAxis: { type: "category", boundaryGap: false, data: x.value, axisLine: { show: false }, axisTick: { show: false }, axisLabel: { color: "#999" } },
        yAxis: { type: "value", axisLabel: { color: "#999" }, splitLine: { lineStyle: { color: "#eee" } } },
        series: [{ type: "line", data: nav, smooth: true, symbol: "none", lineStyle: { width: 2, color: "#2f88ff" } }]
      };
    });
    const volOption = computed(() => {
      const vol = data.value?.chart.volume ?? [];
      return {
        grid: { left: 12, right: 12, top: 16, bottom: 24, containLabel: true },
        tooltip: { trigger: "axis", valueFormatter: (v) => `${v.toFixed(0)}k` },
        xAxis: { type: "category", data: x.value, axisLabel: { color: "#999" }, axisTick: { show: false }, axisLine: { show: false } },
        yAxis: { type: "value", axisLabel: { color: "#999", formatter: "{value}k" }, splitLine: { lineStyle: { color: "#eee" } } },
        series: [{ type: "bar", data: vol, itemStyle: { color: "#91cc75" }, barMaxWidth: 10 }]
      };
    });
    const onBack = () => history.length > 1 ? history.back() : navigateTo("/");
    let timer = null;
    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
    watch(autoRefresh, (v) => {
      stopTimer();
      if (v) timer = setInterval();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_van_nav_bar = resolveComponent("van-nav-bar");
      const _component_van_tag = resolveComponent("van-tag");
      const _component_van_switch = resolveComponent("van-switch");
      const _component_van_tabs = resolveComponent("van-tabs");
      const _component_van_tab = resolveComponent("van-tab");
      const _component_van_checkbox = resolveComponent("van-checkbox");
      const _component_FundLineChart = __nuxt_component_0;
      const _component_EChartBase = __nuxt_component_1;
      const _component_van_button = resolveComponent("van-button");
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-aecb4abc>`);
      _push(ssrRenderComponent(_component_van_nav_bar, {
        title: "基金详情",
        "left-arrow": "",
        onClickLeft: onBack
      }, null, _parent));
      _push(`<div class="card header" data-v-aecb4abc><div class="title" data-v-aecb4abc>${ssrInterpolate(unref(data)?.info.name)}<span class="code" data-v-aecb4abc>${ssrInterpolate(unref(data)?.info.code)}</span></div><div class="tags" data-v-aecb4abc>`);
      _push(ssrRenderComponent(_component_van_tag, {
        type: "primary",
        plain: "",
        round: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`场内交易`);
          } else {
            return [
              createTextVNode("场内交易")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_van_tag, {
        plain: "",
        round: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`股票指数`);
          } else {
            return [
              createTextVNode("股票指数")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="kpis" data-v-aecb4abc><div class="kpi" data-v-aecb4abc><div class="value neg" data-v-aecb4abc>${ssrInterpolate((unref(data)?.info.dayChangePct ?? 0).toFixed(2))}%</div><div class="label" data-v-aecb4abc>日涨跌幅</div></div><div class="kpi" data-v-aecb4abc><div class="value" data-v-aecb4abc>${ssrInterpolate((unref(data)?.info.ytdPct ?? 0).toFixed(2))}%</div><div class="label" data-v-aecb4abc>今年以来</div></div><div class="kpi" data-v-aecb4abc><div class="value neg" data-v-aecb4abc>${ssrInterpolate((unref(data)?.info.sinceInceptionAnnualPct ?? 0).toFixed(2))}%</div><div class="label" data-v-aecb4abc>成立来年化</div></div><div class="kpi" data-v-aecb4abc><div class="value" data-v-aecb4abc>${ssrInterpolate((unref(data)?.info.latestNav ?? 0).toFixed(4))}</div><div class="label" data-v-aecb4abc>最新净值</div></div></div></div><div class="card" data-v-aecb4abc><div class="tabs" data-v-aecb4abc><div class="toolbar" data-v-aecb4abc><div class="spacer" data-v-aecb4abc></div><div class="rt" data-v-aecb4abc><span class="label" data-v-aecb4abc>实时更新</span>`);
      _push(ssrRenderComponent(_component_van_switch, {
        modelValue: unref(autoRefresh),
        "onUpdate:modelValue": ($event) => isRef(autoRefresh) ? autoRefresh.value = $event : null,
        size: "20"
      }, null, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_van_tabs, {
        active: unref(activeTab),
        "onUpdate:active": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        shrink: "",
        sticky: "",
        "offset-top": 46,
        "lazy-render": false
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_van_tab, {
              name: "trend",
              title: "业绩走势"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="tab-head" data-v-aecb4abc${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_van_checkbox, {
                    modelValue: unref(showBench),
                    "onUpdate:modelValue": ($event) => isRef(showBench) ? showBench.value = $event : null,
                    shape: "square",
                    "icon-size": "16"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 沪深300 `);
                      } else {
                        return [
                          createTextVNode(" 沪深300 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_FundLineChart, {
                    x: unref(x),
                    series: unref(perfSeries),
                    height: 260,
                    visible: unref(activeTab) === "trend"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", { class: "tab-head" }, [
                      createVNode(_component_van_checkbox, {
                        modelValue: unref(showBench),
                        "onUpdate:modelValue": ($event) => isRef(showBench) ? showBench.value = $event : null,
                        shape: "square",
                        "icon-size": "16"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 沪深300 ")
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode(_component_FundLineChart, {
                      x: unref(x),
                      series: unref(perfSeries),
                      height: 260,
                      visible: unref(activeTab) === "trend"
                    }, null, 8, ["x", "series", "visible"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_tab, {
              name: "drawdown",
              title: "回撤"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FundLineChart, {
                    x: unref(x),
                    series: unref(ddSeries),
                    height: 260,
                    visible: unref(activeTab) === "drawdown"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FundLineChart, {
                      x: unref(x),
                      series: unref(ddSeries),
                      height: 260,
                      visible: unref(activeTab) === "drawdown"
                    }, null, 8, ["x", "series", "visible"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_tab, {
              name: "nav",
              title: "净值"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EChartBase, {
                    option: unref(navOption),
                    height: 260,
                    visible: unref(activeTab) === "nav"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EChartBase, {
                      option: unref(navOption),
                      height: 260,
                      visible: unref(activeTab) === "nav"
                    }, null, 8, ["option", "visible"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_van_tab, {
              name: "volume",
              title: "成交量"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_EChartBase, {
                    option: unref(volOption),
                    height: 260,
                    visible: unref(activeTab) === "volume"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_EChartBase, {
                      option: unref(volOption),
                      height: 260,
                      visible: unref(activeTab) === "volume"
                    }, null, 8, ["option", "visible"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_van_tab, {
                name: "trend",
                title: "业绩走势"
              }, {
                default: withCtx(() => [
                  createVNode("div", { class: "tab-head" }, [
                    createVNode(_component_van_checkbox, {
                      modelValue: unref(showBench),
                      "onUpdate:modelValue": ($event) => isRef(showBench) ? showBench.value = $event : null,
                      shape: "square",
                      "icon-size": "16"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 沪深300 ")
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createVNode(_component_FundLineChart, {
                    x: unref(x),
                    series: unref(perfSeries),
                    height: 260,
                    visible: unref(activeTab) === "trend"
                  }, null, 8, ["x", "series", "visible"])
                ]),
                _: 1
              }),
              createVNode(_component_van_tab, {
                name: "drawdown",
                title: "回撤"
              }, {
                default: withCtx(() => [
                  createVNode(_component_FundLineChart, {
                    x: unref(x),
                    series: unref(ddSeries),
                    height: 260,
                    visible: unref(activeTab) === "drawdown"
                  }, null, 8, ["x", "series", "visible"])
                ]),
                _: 1
              }),
              createVNode(_component_van_tab, {
                name: "nav",
                title: "净值"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EChartBase, {
                    option: unref(navOption),
                    height: 260,
                    visible: unref(activeTab) === "nav"
                  }, null, 8, ["option", "visible"])
                ]),
                _: 1
              }),
              createVNode(_component_van_tab, {
                name: "volume",
                title: "成交量"
              }, {
                default: withCtx(() => [
                  createVNode(_component_EChartBase, {
                    option: unref(volOption),
                    height: 260,
                    visible: unref(activeTab) === "volume"
                  }, null, 8, ["option", "visible"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="range" data-v-aecb4abc><!--[-->`);
      ssrRenderList(ranges, (r) => {
        _push(ssrRenderComponent(_component_van_button, {
          key: r.key,
          size: "small",
          round: "",
          type: unref(range) === r.key ? "primary" : "default",
          plain: "",
          onClick: ($event) => range.value = r.key
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(r.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(r.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div><div class="placeholder" data-v-aecb4abc></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/fund/[code].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _code_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aecb4abc"]]);

export { _code_ as default };
//# sourceMappingURL=_code_-C11A_U1d.mjs.map
