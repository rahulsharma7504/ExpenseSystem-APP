const UserData = require('../Model/userModel');

const transactionModel = require('../Model/TransactionModel');
const moment=require('moment');

const AddTransaction=async(req,res)=>{
    try {
      
        let {amount,type, category,reference,description,date} = req.body;
        // let formattedDate = moment(date, 'DD/MM/YY').format('DD/MM/YY');
        let transaction = new transactionModel({
            userId:req.body.userId,
            amount:amount,
            type:type,
            category:category,
            reference:reference,    
            description:description,
            date:date
        });
        if(transaction){
            await transaction.save();
            res.status(200).json({message:"Transaction added successfully",data:transaction});
        }
        
    } catch (error) {
        if(error) throw error;
        res.status(500).json({message:"Transaction not found"})
        
    }
}

const getTransaction = async (req, res) => {
    try {
      const { frequency, type } = req.body;
  
      // Construct the date range based on the frequency
      let startDate;
      if (frequency === '7') {
        startDate = moment().subtract(7, 'days').toDate();
      } else if (frequency === '31') {
        startDate = moment().subtract(1, 'months').toDate();
      } else if (frequency === '365') {
        startDate = moment().subtract(1, 'years').toDate();
      }
  
      // Construct the query based on frequency and type
      const query = {
        userId: req.body.userId,
        date: { $gt: startDate }
      };
      if (type && type !== 'all') {
        query.type = type;
      }
  
      // Find transactions based on the constructed query
      const transactions = await transactionModel.find(query);
  
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  const deleteTransaction=async(req,res)=>{
    try {
      const { id } = req.body; // Extract the ID from the request body
      console.log('Received ID:', id);
      const deletedTransaction = await transactionModel.findByIdAndDelete(id);
     
  
      res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  const handleEdit=async (req, res) => {
    try {
      const { id, data } = req.body; // Extract transaction ID and updated data from request body
      const updatedTransaction = await transactionModel.findByIdAndUpdate(id, data, { new: true });
      res.json(updatedTransaction);
    } catch (error) {
      console.error('Error editing transaction:', error);
      res.status(500).json({ error: 'Error editing transaction' });
    }
  }


module.exports = {
    AddTransaction,
    getTransaction,
    deleteTransaction,
    handleEdit
}