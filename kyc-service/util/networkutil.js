const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway,Wallets } = require('fabric-network');
let gateway;

module.exports.getContractInstance = async function() {
			// A gateway defines which peer is used to access Fabric network
			// It uses a common connection profile (CCP) to connect to a Fabric Peer
			// A CCP is defined manually in file connection-profile-mhrd.yaml
			gateway = new Gateway();
			
			// A wallet is where the credentials to be used for this transaction exist
			// Credentials for user MHRD_ADMIN was initially added to this wallet.
			const wallet = await Wallets.newFileSystemWallet('../identity/user/user1/wallet');
			
			// What is the username of this Client user accessing the network?
			const userName = 'user1';
			
			// Load connection profile; will be used to locate a gateway; The CCP is converted from YAML to JSON.
			let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/connection-org1.yaml', 'utf8'));
			
			// Set connection options; identity and wallet
			let connectionOptions = {
				wallet: wallet,
				identity: userName,
				discovery: { enabled: true, asLocalhost: true }
			};
			
			console.log('Connect to Fabric gateway.');

			await gateway.connect(connectionProfile, connectionOptions);

			// Access PaperNet network
			console.log('Use network channel: synergychannel.');

			const network = await gateway.getNetwork('synergychannel');

			return  await network.getContract('collaborationcontract');
	}
  
	module.exports.disconnect = async function(){
		await gateway.disconnect();
	}