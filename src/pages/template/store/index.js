/**
 * @projectName vue_for_mdlife_v1
 * @author zhang wei
 * @date 2020-12-23 16:00
 */
import Vuex from 'vuex'
//模块化vuex
import modules from "./modules"

const state = {};
const mutations = {};
const actions = {};
const getters = {};
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters,
	modules,
	strict: true//开启严格模式
});
