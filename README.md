# Allowance API


REST API built using Ankr on goerli testnet for checking contract which are allowed with infinite allowance . And can also revoke approval for non-trusted Dex / Projects which emits a transaction as a result.




localhost:3001/allowance/:address (param) -> GET request (address -> owner)
localhost:3001/updateAllowance/:address/:sym -> GET request (sym -> Smart contract address) 
