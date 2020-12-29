<template>
    <div class="page-wrapper">
        <router-view></router-view>
    </div>
</template>

<script>
	export default {
		name: "routesContainer",
		props: {},
		data() {
			return {};
		},
		components: {},
		computed: {},
		mounted() {
		},
		methods: {},
		watch: {}
	};
</script>

<style scoped>
    .page-wrapper {
        height: 100%;
    }
</style>
