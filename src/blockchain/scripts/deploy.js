async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying with:", deployer.address);
  
    const Factory = await ethers.getContractFactory("PatientRecords");
    const contract = await Factory.deploy();
    await contract.deployed();
  
    console.log("PatientRecords deployed to:", contract.address);
  }
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
  