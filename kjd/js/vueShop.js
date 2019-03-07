window.onload = function(){
	var app = new Vue({
		el:"#container",
		data:{
			list:[
				{
					id:1,
					name:'iphone 6s',
					price:1000,
					count:14
				},
				{
					id:2,
					name:'mi 8',
					price:2400,
					count:1
				},
				{
					id:3,
					name:'s10',
					price:5999,
					count:4
				}
			]
		},
		methods:{
			
		},
		computed:{
			totolPrice:function(){
				var totol = 0;
				for(var i = 0;i<list.length;i++){
					let item = list[i];
					totol = totol + item.price * item.count;
				}
				return totol;
			}
		}
	})
}
