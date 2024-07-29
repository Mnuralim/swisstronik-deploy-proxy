# Swisstronik Tesnet Techinal Task 6 (Deploy Proxy)

link : [Click!](https://www.swisstronik.com/testnet2/dashboard)

Feel free donate to my EVM address

EVM :

```bash
0x9902C3A98Df4b240ad5496cC26F89bAb8058f4aE
```

Tutorial Video : [Youtube](https://youtu.be/IucFidGBwo8?si=AfvMha-QyylsfUg6)

## Steps

### 1. Clone Repository

```bash
git clone https://github.com/Mnuralim/swisstronik-deploy-proxy.git
```

```bash
cd swisstronik-deploy-proxy
```

### 2. Install Dependency

```bash
npm install
```

### 3. Set .env File

create .env file in root project

```bash
touch .env
```

add this to your .env file

```bash
PRIVATE_KEY="your private key"
```

### 4. Compile Smart Contract

```bash
npm run compile
```

### 5. Deploy Smart Contract

```bash
npm run deploy
```

### 6. Initialize Owner

```bash
npm run initialize
```

### 7. Add Issuer

```bash
npm run add-issuers
```

### 8. Get Issuers list

```bash
npm run list-issuers
```

### 9. Upgrade Smart Contract

```bash
npm run upgrade
```

### 10. Finsihed

- Open the deployed-adddress.ts file (location in utils folder)
- Select SWTRProxy
- Copy the address and paste the address into testnet dashboard(Point1)
- Open address-with-explorer.txt file (location in utils folder)
- Copy the address explorer and paste the address into testnet dashboard(Point2)
- Open tx-hash.txt file (location in utils folder)
- Copy the transaction hash link and paste the address into testnet dashboard(Point3)
- No need push to github

by :

github : [Mnuralim](https://github.com/Mnuralim)

twitter : @Izzycracker04

telegram : @fitriay19

youtube : https://www.youtube.com/@IzzyTSN

Ignore this!!!

```
SWTRProxy = '0xea65D3f80d2253293a64e2f8DdF4CEC401823053'
ProxyAdmin = '0x6a0baE5CF96d14e39FA9F5AdB4fadABb55B22E17'
SWTRImplementation = '0xE4e93a474734E22A4f660EF1fE7aC3fc096E856c'
```
