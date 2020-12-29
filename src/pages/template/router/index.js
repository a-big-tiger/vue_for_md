/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 15:59
 */

import VueRouter from "vue-router";//引入vue路由支持
import routes from "./router";// 引入路由列表配置
//定义该模块的路由
const router = new VueRouter({
	routes: routes
});
//导出该模块路由
export default router;
