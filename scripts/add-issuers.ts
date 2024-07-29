import { ethers, network } from 'hardhat'
import { TransactionResponse } from 'ethers'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { HttpNetworkConfig } from 'hardhat/types'
import { encryptDataField } from '@swisstronik/utils'
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
    chainId: 1291,
  })
}

async function main() {
  const [signer] = await ethers.getSigners()
  const contract = await ethers.getContractAt('SWTRImplementation', deployedAddress.SWTRImplementation)

  console.log('Adding new records...')

  const issuersToAdd = [
    {
      name: 'DOP',
      version: 1,
      address: '0x97A9a15168C22B3C137E6381037E1499C8ad0978',
    },
    {
      name: 'Memecoin',
      version: 1,
      address: '0xb131f4A55907B10d1F0A50d8ab8FA09EC342cd74',
    },
  ]

  const tx: TransactionResponse = await sendShieldedTransaction(
    signer,
    contract.target as string,
    contract.interface.encodeFunctionData('addIssuersRecord', [
      issuersToAdd.map((issuer) => issuer.name),
      issuersToAdd.map((issuer) => issuer.version),
      issuersToAdd.map((issuer) => issuer.address),
    ]),
    '0'
  )

  await tx.wait()

  console.log('Issuers added successfully!')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
