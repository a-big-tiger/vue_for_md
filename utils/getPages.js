/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 09:54
 */
const projectConfig = require("../project.config");
const glob = require("glob");
const getPages = () => {
	let pages = {};
	const pagesPath = `./src/${projectConfig.dev_config.projectPages}/index.js`;
	glob.sync(pagesPath).forEach(filePath => {
		let filePathInfoList = filePath.split("/");
		let fileName = filePathInfoList[filePathInfoList.length - 2];
		pages[fileName] = {
			entry: `src/pages/${fileName}/index.js`,
			template: `src/pages/${fileName}/index.html`,
			filename: `${fileName}/index.html`,
			chunks: ["chunk-vendors", "chunk-common", fileName]
		};
	});
	return pages;
};
module.exports = getPages;
