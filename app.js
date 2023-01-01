const Web3 = require('web3');
const {erc20Tokens  , erc20ABI } = require('./erc20');
const express = require('express')
const url = 'https://rpc.ankr.com/eth_goerli/ddccf2812eeb61235fba94bb61430317fbd048c7d81a6ec10f75a8a23c5c1f53'  // url string

// const url = 'https://rpc.ankr.com/eth/ddccf2812eeb61235fba94bb61430317fbd048c7d81a6ec10f75a8a23c5c1f53'

//"0x627955Aa6da7d919A36ceF985C70b6279d14A869"

const web3 = new Web3(new Web3.providers.HttpProvider(url));

var app = express();





app.get("/allowance/:address", (req,res)=> {
    var ans = [];

    web3.eth.getBlockNumber( (err, b)=>{

        if(err){
            console.log(err);
        }else {
            erc20Tokens.map(i => {

                var tokenContract =  new web3.eth.Contract(erc20ABI, i.address);
                tokenContract.getPastEvents("Approval" ,{
                   
                    filter: {owner: req.params.address} ,fromBlock: b - 2000 , toBlock: b
                }, function(error, event){ 
                    if(error){
                        console.log(error)
                    }
                    console.log(event.length); 
                
                    if(event.length > 0){
                
                        event.forEach(approval => 
                            // console.log(approval.returnValues.spender)
                            tokenContract.methods.allowance(approval.returnValues.owner, approval.returnValues.spender).call().then((res)=>{
                               if(res > 0){
                                   console.log("reached")
                                   ans.push({"Token" : i.name , "owner" : approval.returnValues.owner, "spender" : approval.returnValues.spender, "value" : res });
                                   console.log(ans)
                               }
                
                        }  
                       )) 
                        }   
                }) 
                
                })
        }
    })
   
    
    res.json({"msg" : "consoled"})
})

// var tokenContract =  new web3.eth.Contract(erc20ABI, "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" );
//     tokenContract.methods.approve("0x1111111254fb6c44bAC0beD2854e76F90643097d", 0).estimateGas((e, g )=> {
//         if(e){
//             console.log(e)
//         }else{
//             console.log(g)
//         }
//     })

    
//     tokenContract.methods.approve("0x1111111254fb6c44bAC0beD2854e76F90643097d", 0).send({
//         from: "0xBFCd04Ec2eB8aAD14B4F52957F0F6bb12Ef5DfD1" ,
//         gasLimit: 26946 +1000
//       }).on('transactionHash', function(hash){
//         console.log(hash);
//       })
//       .on('error', (err)=> console.log(err))

app.get("/updateAllowance/:address/:sym", (req,res)=>{
    // res.status(200).send("to be done")
    // erc20Tokens.filter({sym :req.params.sym })
    // console.log(ans)
   var spender = req.params.address
  
    var tokenContract = new library.eth.Contract(erc20ABI, token);
    tokenContract.methods.approve(spender, 0).estimateGas((err, gas) => {
      if(!err){
        tokenContract.methods.approve(spender, 0).send({
          from: address,
          gasLimit: gas+1000
        })
        .on('transactionHash', function(hash){
          console.log(hash);
        })
        .on('confirmation', function(confirmationNumber, receipt){
          if(confirmationNumber == 1){
           console.log(receipt)
           res.json({"ans " : receipt})
          }
        })
      }
    });
    
});






app.listen('3001', ()=> {
    console.log("Connected to port")
})


// var appr = tokenContract.methods.allowance('0x627955Aa6da7d919A36ceF985C70b6279d14A869','0x1111111254fb6c44bAC0beD2854e76F90643097d').call().then(res => 
//      console.log(res))
// console.log(appr)
