/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 15:59
 */
import routesContainer from "@commonComponents/routesContainer";
import index from "../modules/index/router";

const innerRoutes = [
	...index
];


//导入路由声明
export default [
	{
		path: "/",
		component: routesContainer,
		children: innerRoutes.map((item) => ({
			...item
		}))
	}
];
