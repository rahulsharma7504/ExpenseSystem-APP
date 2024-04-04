const express=require('express');

const router=express();
const cors=require('cors');
router.use(cors());




const TransactionController=require('../Controller/TramsactionController');




    
router.post('/',TransactionController.AddTransaction)
router.post('/alltransaction',TransactionController.getTransaction)
router.post('/delete',TransactionController.deleteTransaction)
router.post('/edit',TransactionController.handleEdit)


module.exports = router

