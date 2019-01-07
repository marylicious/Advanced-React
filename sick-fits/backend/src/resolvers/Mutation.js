const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mutations = {
    
    async createItem(parent, args,ctx,info){
        const item = await ctx.db.mutation.createItem({
            data:{
                ...args   
            }
        }, info);

        return item;
    },

    updateItem(parent,args,ctx,info){
        //make a copy of args
        const updates ={...args};
        //delete id 
        delete updates.id;
        //run update method
        return ctx.db.mutation.updateItem({
            data:updates,
            where:{
                id: args.id
            },
        },info);
    },

    async deleteItem(parent,args,ctx,info) {
        
        const where = {id: args.id};
        //find the item
        const item= await ctx.db.query.item({where}, `{id title}`);

        //check if they own that item or have permissions
        //delete it
        return ctx.db.mutation.deleteItem({where}, info);
    },

    async signup (parent,args,ctx,info){
        
        args.email = args.email.toLowerCase();
        const password = await bcrypt.hash(args.password,10);

        const user =ctx.db.mutation.createUser(
        {
            data: {
                ...args,
                password,
                permissions:{set:['USER']}
            }
        },
            info
        );

        //create JWT token for them
        const token = jwt.sign({userId:user.id},process.env.APP_SECRET);

        //we set the JWT as cookie in the response
        ctx.response.cookie('token', token,{
            httpOnly:true,
            maxAge: 1000 * 60 * 60 * 24 * 365  //1 year cookie
        });

        return user;
    }
    
};

module.exports = mutations;
