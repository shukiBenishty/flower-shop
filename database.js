exports.connectDB = function(dburl){
    return new Promise(function(res, rej) {
        mc.connect(dburl, (err, db) => {
            if(err)
            {
                rej(err);
                return;
            }
            url = dburl;
            db.close();
            res( {
                getItems: function(){
                    return getItems();
                },
                addItem: function(name,price,desc,img){
                    return addItem(name,price,desc,img);
                },
                findItems: function(query){
                    return findItems(query);
                },
                buyItem: function(user,id){
                    return buyItem(user,id);
                },
                getOrder: function(id){
                    return getOrder(id);
                },
                addUser: function(user,pwd){
                    return addUser(user,pwd);
                },
                findUser: function(user){
                    return findUser(user);
                },
                modifyItem: function(id,name,price,desc,img){
                    return modifyItem(id,name,price,desc,img);
                },
                deleteItem: function(id){
                    return deleteItem(id);
                },
                getItem: function(id){
                    return getItem(id);
                },
                getUsers: function(){
                    return getUsers();
                },
                getOrders: function(){
                    return getOrders();
                },
                deleteUser: function(nick){
                    return deleteUser(nick);
                },
                deleteOrder: function(id){
                    return deleteOrder(id);
                },
                getUserOrderId: function(nick){
                    return getUserOrderId(nick);
                },
                finalizeOrder: function(nick,ccn,addr){
                    return finalizeOrder(nick,ccn,addr);
                }
            });
        });
    });
    
};