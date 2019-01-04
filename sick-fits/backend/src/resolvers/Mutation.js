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
    }
    
};

module.exports = mutations;
