// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

interface ISWTRProxy {
    struct VerificationData {
        uint32 verificationType;
        bytes verificationId;
        address issuerAddress;
        string originChain;
        uint32 issuanceTimestamp;
        uint32 expirationTimestamp;
        bytes originalData;
        string schema;
        string issuerVerificationId;
        uint32 version;
    }

    enum VerificationType {
        VT_UNSPECIFIED, 
        VT_KYC, 
        VT_KYB, 
        VT_KYW,
        VT_HUMANITY,
        VT_AML, 
        VT_ADDRESS,
        VT_CUSTOM,
        VT_CREDIT_SCORE
    }

    struct Issuer {
        string name;
        uint32 version;
        address issuerAddress;
    }

    function getIssuerRecordByAddress(
        address issuerAddress
    ) external view returns (Issuer memory);

    function getIssuerAddressesByNameAndVersions(
        string memory name,
        uint32[] memory version
    ) external view returns (address[] memory);

    function listIssuersRecord(
        uint256 start,
        uint256 end
    ) external view returns (Issuer[] memory);

    function issuerRecordCount() external view returns (uint256);

    function isUserVerified(
        address userAddress,
        ISWTRProxy.VerificationType verificationType
    ) external view returns (bool);

    function isUserVerifiedBy(
        address userAddress,
        ISWTRProxy.VerificationType verificationType,
        address[] memory allowedIssuers
    ) external view returns (bool);

    function listVerificationData(
        address userAddress,
        address issuerAddress
    ) external view returns (ISWTRProxy.VerificationData[] memory);

    function getVerificationDataById(
        address userAddress,
        address issuerAddress,
        bytes memory verificationId
    ) external view returns (ISWTRProxy.VerificationData memory);

    function getVerificationCountry(
        address userAddress,
        address issuerAddress,
        ISWTRProxy.VerificationType verificationType
    ) external view returns (string memory);

    function decodeQuadrataPassportV1OriginalData(
        bytes memory originalData
    )
        external
        pure
        returns (
            uint8 aml,
            string memory country,
            string memory did,
            bool isBusiness,
            bool investorStatus
        );

    function decodeWorldcoinV1OriginalData(
        bytes memory originalData
    )
        external
        pure
        returns (
            string memory merkle_root,
            string memory nullifier_hash,
            string memory proof,
            string memory verification_level
        );

    function passedVerificationType(
        address userAddress,
        address issuerAddress,
        ISWTRProxy.VerificationType verificationType
    ) external view returns (bool);

    function walletPassedAML(
        address userAddress,
        address issuerAddress
    ) external view returns (bool);
}