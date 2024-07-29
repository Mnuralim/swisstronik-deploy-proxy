// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import {TransparentUpgradeableProxy} from "./TransparentUpgradeableProxy.sol";

contract SWTRProxy is TransparentUpgradeableProxy {
    constructor(
        address _logic,
        address admin_,
        bytes memory _data
    ) TransparentUpgradeableProxy(_logic, admin_, _data) {}
}