import './init';
import { DummyToken } from '../src/contracts';
import { W3, testAccounts } from '../src';
import * as assert from 'assert';

W3.Default = new W3();

contract('DummyToken', function (accounts: any) {
    it('Total supply should be 1400000 * 1e18', async function () {
        var DummyContractInstance = await DummyToken.New(
            W3.TX.txParamsDefaultDeploy(testAccounts[0]), {_multisig: testAccounts[0]}
        );
        let value = await DummyContractInstance.totalSupply();
        assert.equal(value, 1400000 * 1e18, 'value was not 1400000 * 1e18');

        console.log('TX HASH: ', DummyContractInstance.transactionHash);

        let deployed = await DummyToken.At(DummyContractInstance.address);
        await deployed.instance;
        console.log('TX HASH2: ', deployed.transactionHash);
        value = await deployed.totalSupply();
        assert.equal(value, 1400000 * 1e18, 'value was not 1400000 * 1e18');
    });
});
