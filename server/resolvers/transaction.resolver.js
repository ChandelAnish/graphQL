import { transactions } from "../dummyData.js";
import Transaction from "../model/transaction.model.js";


const transactionsResolver = {
    Query: {
        transactions:()=>{
            return transactions
        }
    },
    Mutation:{
        createTransaction: async(_,{input})=>{
            const newTransaction = await Transaction.create(input)
            return newTransaction
        },

        updateTransaction: async(_,{input})=>{
            const updatedTransaction = await Transaction.findOneAndUpdate({ _id: input._id }, input, { new: true, runValidators: true })
            return updatedTransaction
        }
    }
}

export default transactionsResolver