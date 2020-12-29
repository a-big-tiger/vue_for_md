/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 15:59
 */
import routesContainer from "@commonComponents/routesContainer";
import module1 from "../modules/module1/router";
import module2 from "../modules/module2/router";

const innerRoutes = [
	...module1,
	...module2
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
