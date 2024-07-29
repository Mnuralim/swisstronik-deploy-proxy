import { decryptNodeResponse, encryptDataField } from '@swisstronik/utils'
import { BaseContract, Provider } from 'ethers'
import { ethers, network } from 'hardhat'
import { HttpNetworkConfig } from 'hardhat/types'
import * as deployedAddress from '../utils/deployed-address'

const readContractData = async (provider: Provider, contract: BaseContract, method: string, args?: any[]) => {
  const res = await sendShieldedQuery(
    provider,
    contract.target as string,
    contract.interface.encodeFunctionData(method, args),
    '0'
  )

  return contract.interface.decodeFunctionResult(method, res)
}

const sendShieldedQuery = async (provider: Provider, destination: string, data: string, value: string) => {
  const rpclink = (network.config as HttpNetworkConfig).url
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpclink, data)

  const response = await provider.call({
    to: destination,
    data: encryptedData,
    value,
  })

  if (response.startsWith('0x08c379a0')) {
    return response
  }

  return await decryptNodeResponse(rpclink, response, usedEncryptedKey)
}
async function main() {
  const [signer] = await ethers.getSigners()

  const SWTRProxy = await ethers.getContractAt('SWTRProxy', deployedAddress.SWTRProxy)

  const proxyAdmin = await ethers.getContractAt('ProxyAdmin', deployedAddress.ProxyAdmin)

  const implementation = (await readContractData(signer.provider, proxyAdmin, 'implementation', [SWTRProxy.target]))[0]
  console.log('Current implementation:', implementation)

  const admin = (await readContractData(signer.provider, proxyAdmin, 'admin', [SWTRProxy.target]))[0]
  console.log('Current admin:', admin)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
