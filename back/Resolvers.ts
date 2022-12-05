import { Merchant } from './models/Merchant';

const Resolvers = {
  Query: {
    getAllMerchant: async () => {
        let merchants = await Merchant.find()
        
        return merchants
    }, //if the user runs the getAllPeople command
    //if the user runs the getPerson command:
    getMerchant: async (_: any, args: any) => { 
      console.log(args);
      let merchant = await Merchant.findById(args.id)
      //get the object that contains the specified ID.
      return merchant
    },
  },
};
export default Resolvers;