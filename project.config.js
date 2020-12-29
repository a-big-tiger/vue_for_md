/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-22 14:48
 */
const getProjectConfig = () => {
	return {
		production_env: false,//是否生产环境，注:此处与 process.env.NODE_ENV不同，仅用于app开发生成配置文件
		development_env_path_prefix: "http://192.168.21.153:8080",//开发环境页面路径前缀用于mdLife窗口系统,调试用
		default_path_suffix: "index/index.html#/index",//app首页配置,用于生成config.json
		//构建配置
		dev_config: {
			projectPages: "pages/*"//项目页面路径
		},
		//打包配置
		build_config: {
			outputDir: "src",//打包输出路径,默认上级目录为app
			publicPath: process.env.NODE_ENV === "production" ? "../" : "/" //资源引入路径
		},
		//md life 配置，用于生成config.json
		app_config: {
			"defaultSrc": "",
			"appInfo": {
				"id": "md_life_by_vue",
				"appName": "mdLifeByVue"
			},
			"appSetting": {
				"appBackground": "#ffffff",
				"statusBarAppearance": false,
				"debugMode": true,
				"navigationBarAppearance": true
			}
		}
	};
};
module.exports = getProjectConfig();
