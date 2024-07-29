import { ethers, network } from 'hardhat'
import { TransactionResponse } from 'ethers'
import { encryptDataField } from '@swisstronik/utils'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { HttpNetworkConfig } from 'hardhat/types'
import * as fs from 'fs'
import * as path from 'path'
import * as deployedAddress from '../utils/deployed-address'

const sendShieldedTransaction = async (
  signer: HardhatEthersSigner,
  destination: string,
  data: string,
  value: string
) => {
  const rpclink = (network.config as HttpNetworkConfig).url
  const [encryptedData] = await encryptDataField(rpclink, data)

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
    gasLimit: 2000000,
  })
}

async function main() {
  const [signer] = await ethers.getSigners()
  const SWTRProxy = await ethers.getContractAt('SWTRProxy', deployedAddress.SWTRProxy)

  const SWTRImplementation = await ethers.deployContract('SWTRImplementation')
  await SWTRImplementation.waitForDeployment()
  console.log(`SWTRImplementation deployed to ${SWTRImplementation.target}`)

  const proxyAdmin = await ethers.getContractAt('ProxyAdmin', deployedAddress.ProxyAdmin)

  const tx: TransactionResponse = await sendShieldedTransaction(
    signer,
    proxyAdmin.target as string,
    proxyAdmin.interface.encodeFunctionData('upgradeTo', [
      SWTRProxy.target as string,
      SWTRImplementation.target as string,
    ]),
    '0'
  )

  const upgradeTx = await tx.wait()
  console.log('Contract upgraded successfully!')

  const filePath = path.join(__dirname, '../utils/tx-hash.txt')
  fs.writeFileSync(
    filePath,
    `Transaction Hash : https://explorer-evm.testnet.swisstronik.com/tx/${upgradeTx?.hash}\n`,
    {
      flag: 'a',
    }
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
