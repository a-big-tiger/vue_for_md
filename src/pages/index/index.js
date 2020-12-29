/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 15:07
 */
import {Vue} from "../../common/script/public";
import router from "./router";
import store from "./store";

window.onViewOpen = () => {
	new Vue({
		router,
		store
	}).$mount("#app");
};
/*window.onload = () => {
let vue = null;
	vue = new Vue({
		router,
		store
	}).$mount("#app");
	if (window.onViewOpen) {
		window.onViewOpen = () => {
			//若果有，先清除
			if (vue) {
				vue = null;
				document.getElementById("app").innerHTML = "";
			}
			new Vue({
				router,
				store
			}).$mount("#app");
		};
	}
};*/
