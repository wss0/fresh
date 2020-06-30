module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'src': '@/',
				'src/api': '@/api',
				'src/views': '@/views'
			}
		}
	},
	// baseUrl: "/",
	outputDir: 'dist',
	assetsDir: 'assets',
	lintOnSave: false,//把ES6比较恶心变态的语法关掉，要不然写一点代码就报错 vue3.0API官网都能找到
	// devServer: {
	// 	open: true, //设置自动打开
	// 	host: '0.0.0.0',  //可以被覆盖进程.env.HOST
	// 	port: 8080, //设置端口
	// 	https: true,
	// 	proxy: {
	// 		'/api': {
	// 			target: "https://api.mch.weixin.qq.com/v3/pay/transactions/h5", //这个路径是我代理到本地tp框架里面
	// 			changeOrigin: true//开启代理
	// 		}
	// 	},
	// 	before(app) {

	// 	}
	// }
}