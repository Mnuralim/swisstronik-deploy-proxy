import { ethers } from 'hardhat'
import fs from 'fs'
import path from 'path'

async function main() {
  const [signer] = await ethers.getSigners()
  console.log(`Deploying Contracts with the account ${signer.address} ...`)

  const SWTRImplementation = await ethers.deployContract('SWTRImplementation')
  await SWTRImplementation.waitForDeployment()
  console.log(`SWTRImplementation deployed to ${SWTRImplementation.target}`)

  const ProxyAdmin = await ethers.deployContract('ProxyAdmin', [signer.address])
  await ProxyAdmin.waitForDeployment()
  console.log(`ProxyAdmin deployed to ${ProxyAdmin.target}`)

  const SWTRProxy = await ethers.deployContract('SWTRProxy', [
    SWTRImplementation.target,
    ProxyAdmin.target,
    SWTRImplementation.interface.encodeFunctionData('initialize', [signer.address]),
  ])
  await SWTRProxy.waitForDeployment()
  console.log(`SWTRProxy deployed to ${SWTRProxy.target}`)

  const deployedProxyAddressWithExplorer = path.join(__dirname, '../utils/address-with-explorer.txt')
  fs.writeFileSync(
    deployedProxyAddressWithExplorer,
    `Address : https://explorer-evm.testnet.swisstronik.com/address/${SWTRProxy.target}\n`,
    {
      flag: 'a',
    }
  )
  const deployedAddressPath = path.join(__dirname, '..', 'utils', 'deployed-address.ts')
  const fileContent = `export const SWTRProxy = '${SWTRProxy.target}'\nexport const ProxyAdmin = '${ProxyAdmin.target}'\nexport const SWTRImplementation = '${SWTRImplementation.target}'
    `
  fs.writeFileSync(deployedAddressPath, fileContent, { encoding: 'utf8' })
  console.log('Address written to deployed-address.ts')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
