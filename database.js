
let category = [
		{name:"Manager", id:1},
		{name:"Worker", id:1},
		{name:"Customer", id:1},
		{name:"Supplier", id:1}
	]
let branches = [ 
	{	id: 1 ,name:"Paris",  open: true , description:'Yes, we built Paris', image: "https://www.w3schools.com/bootstrap/paris.jpg" },
	{	id: 2 ,name:"New York",  open: false, description:'We built New York', image: "https://www.w3schools.com/bootstrap/newyork.jpg" },
	{	id: 2 ,name:"San Francisco",  open: true, description:'Yes, San Fran is ours', image: "https://www.w3schools.com/bootstrap/sanfran.jpg" }
];
let users = [ 
	{
		id:305266462, 
		name:'Shuki', 
		category: 1, 
		branchId:956, 
		userName:'a', 
		password:'1'
	},
	{
		id:325817434, 
		name:'Avishag', 
		category: 3 ,
		userName:'Tzvika123' ,
		password:'abcd'
	},
	{
		id:123456, 
		name:'Anael', 
		category: 2 ,
		userName:'d' ,
		password:'2'
	},
	{
		id:123, 
		name:'Tahel', 
		category:4 ,
		userName:'s' ,
		password:'11'
	}
];
let flowers = [ 
	{
		name:'Rose', 
		color:'pink', 
		price:40, 
		image:'https://images.pexels.com/photos/736231/pexels-photo-736231.jpeg?auto=compress&cs=tinysrgb&h=350'
	},
	{
		name:'Anemone', 
		color:'blue', 
		price:20, 
		image:'http://cdn.shopify.com/s/files/1/1902/7917/products/Anemone-de-Caen-Mr.-Fokker-blue_grande.jpg?v=1495789538'
	},
	{
		name:'Narcissus', 
		color:'yellow', 
		price:30, 
		image:'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full_caption/public/blogs/89816/2012/03/90410-86622.jpg?itok=ScKc-ggc'
	}
	
];

exports.users = users;
exports.branches = branches; 
exports.category = category; 
exports.flowers = flowers; 