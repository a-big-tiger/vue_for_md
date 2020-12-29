<template>
    <div class="login_wrap">
        <div>
            <img src="../../resource/login_bg.png" style="width: 100%">
        </div>
        <div class="login_form">
            <van-form @submit="login">
                <van-field v-model="loginForm.userName"
                           left-icon="user-o"
                           placeholder="用户名"
                           size="large"
                ></van-field>
                <van-field v-model="loginForm.password"
                           type="password"
                           left-icon="description"
                           placeholder="密码"
                           size="large"
                ></van-field>
                <div style="margin: 20px;">
                    <van-button block type="info" native-type="submit">提交</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
	import {md_closeFrame} from "../../../../common/script/md_life_utils";

	export default {
		name: "module1",
		props: {},
		data() {
			return {
				loginForm: {
					userName: "",
					password: ""
				}
			};
		},
		components: {},
		computed: {},
		mounted() {

		},
		methods: {
			closeFrame() {
				md_closeFrame();
			},
			login() {
				console.log(this.loginForm);
				md_closeFrame();
			}
		},
		watch: {}
	};
</script>

<style scoped>
    .login_wrap {
        width: 100%;
        height: 100%;
    }
</style>
