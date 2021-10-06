const { NodeVM } = require('vm2')
const fs = require('fs')

;(async () => {
  try {
    const HORIZON_URL = 'https://horizon-testnet.stellar.org'
    const STELLAR_NETWORK = 'TESTNET'

    const vm = new NodeVM({
      // console: 'off',
      eval: false,
      wasm: false,
      strict: true,
      fixAsync: true,
      sandbox: {
        HORIZON_URL,
        STELLAR_NETWORK,
        window: {}
      },
      require: {
        builtin: ['util'],
        external: {
          modules: ['bignumber.js', 'node-fetch', 'stellar-sdk', 'lodash']
        },
        context: 'host',
      }
    })

    const txFunctionCode = fs.readFileSync('./dist/txFunction.js', 'utf8')
    const result = await vm.run(txFunctionCode, 'vm.js')({
      source: 'GDN6NPFUHX2NEX6DK4CSSN7HAXSSQ43YNOJBTZQGQDCCWUGNNI3XBM4S', // SBP3BIG3DTZL6W27JKEYE2OCNHQ23LP4WMHIBNL7TZHLGRLLSZL57KHH
      destination: 'GBDCMU65X4PWL5F2E6A5YHL5CBEEUNNGVRDOP4GB7VFGLYTNEMK4MWDI' // SDVQOKI27UMEMV55WINE46DORHUEODRLA3BH3QTOZKZGWS2QF5X5CMUW
    })
  
    console.log(result)
  }

  catch(err) {
    console.error(err)
  }
})()
