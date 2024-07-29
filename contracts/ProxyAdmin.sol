// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ITransparentUpgradeableProxy} from "./ITransparentUpgradeableProxy.sol";

// ProxyAdmin is the contract that manages the upgradeability of the contracts
contract ProxyAdmin is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    function admin(
        ITransparentUpgradeableProxy proxy
    ) public view returns (address) {
        return proxy.admin();
    }

    function implementation(
        ITransparentUpgradeableProxy proxy
    ) public view returns (address) {
        return proxy.implementation();
    }

    function changeAdmin(
        ITransparentUpgradeableProxy proxy,
        address newAdmin
    ) public onlyOwner {
        proxy.changeAdmin(newAdmin);
    }

    function upgradeTo(
        ITransparentUpgradeableProxy proxy,
        address _implementation
    ) public payable virtual onlyOwner {
        proxy.upgradeTo(_implementation);
    }

    function upgradeToAndCall(
        ITransparentUpgradeableProxy proxy,
        address _implementation,
        bytes memory data
    ) public payable virtual onlyOwner {
        proxy.upgradeToAndCall{value: msg.value}(_implementation, data);
    }
}