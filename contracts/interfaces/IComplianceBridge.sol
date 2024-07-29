// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface IComplianceBridge {
    function hasVerification(
        address userAddress,
        uint32 verificationType,
        uint32 expirationTimestamp,
        address[] memory allowedIssuers
    ) external returns (bool);

    function getVerificationData(
        address userAddress,
        address issuerAddress
    ) external returns (bytes memory);

    function addVerificationDetails(
        address userAddress,
        string memory originChain,
        uint32 verificationType,
        uint32 issuanceTimestamp,
        uint32 expirationTimestamp,
        bytes memory proofData,
        string memory schema,
        string memory issuerVerificationId,
        uint32 version
    ) external;
}