// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PatientRecords {
    struct Record {
        string ipfsCid;
        address signer;
        uint256 timestamp;
    }

    mapping(bytes32 => Record) public records;

    event RecordAdded(address indexed signer, bytes32 indexed prescriptionId, string cid, uint256 timestamp);
    event RecordUpdated(address indexed signer, bytes32 indexed prescriptionId, string newCid, uint256 timestamp);

    function addRecord(string calldata ipfsCid) external returns (bytes32) {
        // create an id derived from signer + timestamp + cid to be unpredictable
        bytes32 prescriptionId = keccak256(
    abi.encodePacked(msg.sender, block.timestamp, ipfsCid, block.prevrandao)
);
        records[prescriptionId] = Record({ ipfsCid: ipfsCid, signer: msg.sender, timestamp: block.timestamp });
        emit RecordAdded(msg.sender, prescriptionId, ipfsCid, block.timestamp);
        return prescriptionId;
    }

    function updateRecord(bytes32 prescriptionId, string calldata newCid) external {
        Record storage r = records[prescriptionId];
        require(r.signer == msg.sender, "only signer can update");
        r.ipfsCid = newCid;
        r.timestamp = block.timestamp;
        emit RecordUpdated(msg.sender, prescriptionId, newCid, block.timestamp);
    }

    function getRecord(bytes32 prescriptionId) external view returns (string memory ipfsCid, address signer, uint256 timestamp) {
        Record memory r = records[prescriptionId];
        return (r.ipfsCid, r.signer, r.timestamp);
    }
}
