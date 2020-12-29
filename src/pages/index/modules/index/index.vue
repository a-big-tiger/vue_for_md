<template>
    <div class="rootNode  ">
        <div class="contentWrap" ref="contentWrap"></div>

        <van-tabbar v-model="activeIndex" @change="onChange">
            <van-tabbar-item v-for="item in frames"
                             :key="item.frameSetting.url"
                             :icon="item.iconName"
            >{{item.barName}}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
	import {
		md_closeFrameGroup,
		getFullFilePath,
		md_getSystemType,
		md_openFrameGroup,
		md_setFrameGroupIndex,
		md_openFrame
	} from "../../../../common/script/md_life_utils";
	import {deepClone, getBoundingClientRect} from "../../../../common/script/commonUtils";

	export default {
		name: "module1",
		props: {},
		data() {
			return {
				frames: [
					{
						barName: "page1",
						iconName: "home-o",
						frameSetting: {
							name: "page1",
							url: "page1/index.html#/module1",
							bgColor: "#ffffff",
							bounces: false
						}
					},
					{
						barName: "page2",
						iconName: "search",
						frameSetting: {
							name: "page2",
							url: "page2/index.html#/module1",
							bgColor: "#ffffff",
							bounces: false
						}
					}
				],
				activeIndex: 0
			};
		},
		components: {},
		computed: {},
		mounted() {
			this.$nextTick(() => {
				this.initPage();
			});
		},
		methods: {
			getFrameRect() {
				let $el = this.$refs.contentWrap;
				let rect = getBoundingClientRect($el);
				let systemType = md_getSystemType();
				return systemType === "ios" ?
					{
						x: rect.x,
						y: rect.y,
						w: rect.width,
						h: rect.height
					} : {
						marginLeft: "0",
						marginTop: "0",
						marginBottom: "50",
						marginRight: "0"
					};
			},
			onChange(index) {
				md_setFrameGroupIndex({
					name: "homeGroup",
					index: Number(index)
				});
			},
			initPage() {
				this.openLogin();
				this.openFrameGroup();
			},
			openFrameGroup() {
				md_closeFrameGroup("homeGroup");
				let frames = this.frames.map(item => {
					let frameSetting = deepClone(item.frameSetting);
					frameSetting.url = getFullFilePath(frameSetting.url);
					return frameSetting;
				});
				let params = {
					name: "homeGroup",
					background: "#ffffff",
					scrollEnabled: false,
					rect: this.getFrameRect(),
					index: this.activeIndex,
					preload: 3,
					frames,
					frameRelation: {
						type: "below",
						name: "login"
					}
				};
				md_openFrameGroup(params, (ret) => {
					console.log(ret.name + "发生改变 | 索引:" + ret.index);
				});
			},
			openLogin() {
				md_openFrame({
					name: "login",
					reload: true,
					url: getFullFilePath("login/index.html#/login"),
					rect: {},
					bounces: false
				});
			}
		},
		watch: {}
	};
</script>

<style scoped>
    .rootNode {
        position: relative;
        padding-bottom: 50px;
    }

    .contentWrap {
        width: 100%;
        height: 100%;
    }
</style>
