/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 14:48
 */
import Vue from "vue";
import Vant from "vant";
import VueRouter from "vue-router";//引入vue路由支持
import Vuex from "vuex";//引入vue路由支持
import "vant/lib/index.css";
import documentSetting from "./documentSetting";

Vue.config.productionTip = false;
import("@commonStyle/flex.css");
import("@commonStyle/common.css");
Vue.use(Vant);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(documentSetting);
export {
	Vue
};
