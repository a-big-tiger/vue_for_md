/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-25 10:19
 */


export default () => {
	window.onload = function () {
		console.log("============window onLoad finished============");
	};
	window.onViewCreate = function () {
		console.log("============window onViewCreate finished============");
	};
	window.onViewOpen = function () {
		console.log("============window onViewOpen finished============");
	};
}
