/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-24 14:45
 */
import projectConfig from "@root/project.config";

const Log = (name, params) => {
	console.log(`调用md life ${name} 方法`);
	if (params) {
		console.log(`参数:`);
		try {
			console.log(JSON.stringify(params));
		} catch (e) {
			console.log(params);
		}
	}

};

export const getFullFilePath = (path) => {
	return projectConfig.production_env ?
		`wgt://${projectConfig.build_config.outputDir}/${path}` :
		`${projectConfig.development_env_path_prefix}/${path}`;
};
export const md_getSystemType = () => {
	let type = undefined;
	if (window.md && window.md.systemType) {
		type = window.md.systemType;
	} else {
		Log("systemType");
	}
	return type;
};
export const md_openFrameGroup = (params, fn) => {
	if (window.md && window.md.openFrameGroup) {
		window.md.openFrameGroup(params, fn);
	} else {
		Log("openFrameGroup", params);
	}
};

export const md_setFrameGroupIndex = (params) => {
	if (window.md && window.md.setFrameGroupIndex) {
		window.md.setFrameGroupIndex({
			name: params.name,
			index: params.index,
			scroll: params.scroll || false,
			reload: params.reload || false
		});
	} else {
		Log("setFrameGroupIndex", params);

	}
};
export const md_closeFrameGroup = (name) => {
	if (window.md && window.md.closeFrameGroup) {
		window.md.closeFrameGroup({name: name});
	} else {
		Log("closeFrameGroup");
	}
};

export const md_openFrame = (params) => {
	if (window.md && window.md.openFrame) {
		window.md.openFrame(params);
	} else {
		Log("openFrame", params);
	}
};
export const md_closeFrame = (name) => {
	if (window.md && window.md.closeFrame) {
		if (name) {
			window.md.closeFrame({name: name});
		} else {
			window.md.closeFrame();
		}
	} else {
		Log("closeFrame", name);
	}
};

