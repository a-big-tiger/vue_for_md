/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-22 14:30
 */
const path = require("path");
const projectConfig = require("./project.config");
const createConfigJsonFile = require("./utils/createConfigJsonFile");
const getPages = require("./utils/getPages");
const resolve = (dir) => {
	return path.join(__dirname, dir);  // path.join(__dirname)设置绝对路径
};
module.exports = {
	pages: getPages(),
	publicPath: projectConfig.build_config.publicPath,
	outputDir: `app/${projectConfig.build_config.outputDir}`,
	devServer: {
		host: "0.0.0.0",
		port: 8080,
		overlay: {
			warning: false,
			errors: false
		}
	},
	runtimeCompiler: true,
	lintOnSave: false,
	chainWebpack: config => {
		/*移除预加载*/
		for (let key of config.plugins.store.keys()) {
			if (key.startsWith("prefetch-") || key.startsWith("preload-")) {
				config.plugins.delete(key);
			}
		}
		//设置路径别名
		config.resolve.alias.set("@root", resolve("./"));//根目录
		config.resolve.alias.set("@commonScript", resolve("./src/common/script"));//公共脚本路径
		config.resolve.alias.set("@commonStyle", resolve("./src/common/style"));//公共样式表路径
		config.resolve.alias.set("@commonComponents", resolve("./src/components"));//公共组件路径
	}
};
//创建config.json文件
createConfigJsonFile();

