const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    let wallet;
    
  
      while (!await game.isWon() ) {
        wallet = ethers.Wallet.createRandom();
        wallet = wallet.connect(ethers.provider);
        await ethers.provider.send("hardhat_setBalance", [
          await wallet.getAddress(),
          "0x1000000000000000000",
        ]);
        console.log(await wallet.getAddress());
        try{
          await game.connect(wallet).win();
        } catch{}
      }


    //await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
