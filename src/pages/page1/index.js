/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 15:07
 */
import {Vue} from "../../common/script/public";
import router from "./router";
import store from "./store";


window.onViewOpen = function () {
	new Vue({
		router,
		store
	}).$mount("#app");

};

