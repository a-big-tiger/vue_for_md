/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-22 16:52
 */
const projectConfig = require("../project.config");
const path = require("path");
const fs = require("fs");
const createConfigJsonFile = () => {
	const defaultSrc = projectConfig.production_env ?
		`${projectConfig.build_config.outputDir}/${projectConfig.default_path_suffix}` :
		`${projectConfig.development_env_path_prefix}/${projectConfig.default_path_suffix}`;
	let appConfig = JSON.parse(JSON.stringify(projectConfig.app_config));
	appConfig.defaultSrc = defaultSrc;
	appConfig = JSON.stringify(appConfig, null, "\t");
	const filePath = path.join(__dirname, "../app/config.json");
	fs.writeFile(filePath, appConfig, function (err) {
		if (err) {
			console.error(err);
		} else {
			console.log("\x1B[36m%s\x1B[0m", `create "config.json" file success,file path:${filePath}`);
			console.log("\x1B[36m%s\x1B[0m", `create "config:${appConfig}`);
		}

	});
};
module.exports = createConfigJsonFile;
