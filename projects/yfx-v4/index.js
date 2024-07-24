const addrs = {
	"arbitrum": {"manager": "0xFE1ca968afbadEd3BF2CB685451C858Deb46Ce31", "vault": "0x50b516a9DB620aB67A33d895DAF4Bd1c294b9517"},
	"base": {"manager":"0xfD38EaD11eaa5D566dc331848fF495B3D5cfb79F", "vault": "0xfcDaC5524EC86223216643384f5c59C65560d673"}
}
async function tvl(api) {
  let pools = await api.call({ target: addrs[api.chain].manager, abi: "address[]:getAllPools", });
  const tokens = await api.multiCall({ abi: 'address:getBaseAsset', calls: pools })
  return api.sumTokens({ owner: addrs[api.chain].vault, tokens})
}

module.exports = {
  methodology: 'Count balance of each pool from the Vault',
  arbitrum: {
    tvl,
  },
  base: {
	  tvl,
  }
}
