let branches = [ 
	{	id: 1 ,name:"Paris",  open: true , description:'Yes, we built Paris', image: "https://www.w3schools.com/bootstrap/paris.jpg" },
	{	id: 2 ,name:"New York",  open: false, description:'We built New York', image: "https://www.w3schools.com/bootstrap/newyork.jpg" },
	{	id: 3 ,name:"San Francisco",  open: true, description:'Yes, San Fran is ours', image: "https://www.w3schools.com/bootstrap/sanfran.jpg" }
];
let users = [ 
	{
		id:305266462, 
		name:'Shuki', 
		role: "0",
		address: "avramski 18 Tel-Aviv",
		email:'shuki.benishty@gmail.com', 
		password:'shuki'
	},
	{
		id:325817434, 
		name:'Avishag', 
		role: "1",
		address: "Erzel 152/16 Yeruham",
		email:'avishag@gmail.com' ,
		password:'avishag'
	},
	{
		id:982354335, 
		name:'Anael', 
		address: "Milman 2/14 Ashdod",
		role: "2" ,
		email:'anael@gmail.com' ,
		password:'anael'
	},
	{
		id:628795656, 
		name:'Tahel', 
		address: "Rimon 12/2 Yavne",
		role: "3",
		email:'tahel@gmail.com' ,
		password:'tahel'
	}
];

let roles = [
	{role:"Manager", id:"1"},
	{role:"Worker", id:"2"},
	{role:"Customer", id:"3"},
	{role:"Supplier", id:"0"}
]

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
exports.flowers = flowers; 
exports.roles = roles; 