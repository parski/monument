// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

(function() {

  var contract_data = {
    abi: [{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"collectFromProspectByID","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"}],"type":"function"},{"constant":false,"inputs":[{"name":"_title","type":"string"},{"name":"_author","type":"string"},{"name":"_description","type":"string"},{"name":"_fundingTarget","type":"uint256"}],"name":"newTitle","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"id","type":"uint256"}],"name":"collectFromCatalogueByID","outputs":[{"name":"","type":"string"}],"type":"function"},{"constant":false,"inputs":[],"name":"getProspectLength","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"getCatalogueLength","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"inputs":[],"type":"constructor"}],
    binary: "606060405260008080556001556107fd8061001a6000396000f3606060405260e060020a600035046313a8d1fc811461004757806319f1bcf7146100f957806326e70393146102335780632f961ef6146102ac578063fefeb0e5146102b6575b005b6102c16004356040805160208181018352600080835283518083018552818152845180840186528281528683526003845285832060068101546005820154600783015483548a5160026001838116156101000260001901909316819004601f81018c90048c0283018c01909d528c82529a9b979a9699899889989388019693880195939460ff16929188919083018282801561070a5780601f106106df5761010080835404028352916020019161070a565b6040805160206004803580820135601f8101849004840285018401909552848452610045949193602493909291840191908190840183828082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750949650509335935050505060008054815260036020908152604082208054875182855293839020919360026001831615610100026000190190921691909104601f9081018490048301939192918901908390106104fc57805160ff19168380011785555b5061052c9291505b80821115610595576000815560010161021f565b6104026004356040805160208181018352600080835284815260028083529084902080548551601f6000196101006001851615020190921693909304908101849004840283018401909552848252929390929183018282801561068c5780601f106106615761010080835404028352916020019161068c565b6104706000545b90565b6104706001546102b3565b6040518080602001806020018060200187815260200186815260200185815260200184810384528a8181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561033b5780820380516001836020036101000a031916815260200191505b508481038352898181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103945780820380516001836020036101000a031916815260200191505b508481038252888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103ed5780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b50506000805481526003602081905260408083204292019190915581548252808220600401805473ffffffffffffffffffffffffffffffffffffffff1916331790558154825280822060050182905581548252808220600601839055815482528120600701805460ff191690558054600101905550505050565b82800160010185558215610217579182015b8281111561021757825182600050559160200191906001019061050e565b5050600080548152600360209081526040822085516001918201805481865294849020909460029381161561010002600019011692909204601f90810184900483019391929188019083901061059957805160ff19168380011785555b506105c992915061021f565b5090565b82800160010185558215610589579182015b828111156105895782518260005055916020019190600101906105ab565b50506000805481526003602090815260408220845160029182018054818652948490209094600181161561010002600019011692909204601f90810184900483019391929187019083901061063157805160ff19168380011785555b5061048292915061021f565b82800160010185558215610625579182015b82811115610625578251826000505591602001919060010190610643565b820191906000526020600020905b81548152906001019060200180831161066f57829003601f168201915b50505050509050919050565b820191906000526020600020905b8154815290600101906020018083116106a657829003601f168201915b5050505050935095509550955095509550955091939550919395565b820191906000526020600020905b8154815290600101906020018083116106ed57829003601f168201915b5050604080518a54602060026001831615610100026000190190921691909104601f8101829004820283018201909352828252959b50948a9450909250840190508282801561079a5780601f1061076f5761010080835404028352916020019161079a565b820191906000526020600020905b81548152906001019060200180831161077d57829003601f168201915b5050875460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959a50899450925084019050828280156106c35780601f10610698576101008083540402835291602001916106c356",
    unlinked_binary: "606060405260008080556001556107fd8061001a6000396000f3606060405260e060020a600035046313a8d1fc811461004757806319f1bcf7146100f957806326e70393146102335780632f961ef6146102ac578063fefeb0e5146102b6575b005b6102c16004356040805160208181018352600080835283518083018552818152845180840186528281528683526003845285832060068101546005820154600783015483548a5160026001838116156101000260001901909316819004601f81018c90048c0283018c01909d528c82529a9b979a9699899889989388019693880195939460ff16929188919083018282801561070a5780601f106106df5761010080835404028352916020019161070a565b6040805160206004803580820135601f8101849004840285018401909552848452610045949193602493909291840191908190840183828082843750506040805160208835808b0135601f8101839004830284018301909452838352979998604498929750919091019450909250829150840183828082843750506040805160209735808a0135601f81018a90048a0283018a019093528282529698976064979196506024919091019450909250829150840183828082843750949650509335935050505060008054815260036020908152604082208054875182855293839020919360026001831615610100026000190190921691909104601f9081018490048301939192918901908390106104fc57805160ff19168380011785555b5061052c9291505b80821115610595576000815560010161021f565b6104026004356040805160208181018352600080835284815260028083529084902080548551601f6000196101006001851615020190921693909304908101849004840283018401909552848252929390929183018282801561068c5780601f106106615761010080835404028352916020019161068c565b6104706000545b90565b6104706001546102b3565b6040518080602001806020018060200187815260200186815260200185815260200184810384528a8181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f16801561033b5780820380516001836020036101000a031916815260200191505b508481038352898181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103945780820380516001836020036101000a031916815260200191505b508481038252888181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156103ed5780820380516001836020036101000a031916815260200191505b50995050505050505050505060405180910390f35b60405180806020018281038252838181518152602001915080519060200190808383829060006004602084601f0104600f02600301f150905090810190601f1680156104625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60408051918252519081900360200190f35b50506000805481526003602081905260408083204292019190915581548252808220600401805473ffffffffffffffffffffffffffffffffffffffff1916331790558154825280822060050182905581548252808220600601839055815482528120600701805460ff191690558054600101905550505050565b82800160010185558215610217579182015b8281111561021757825182600050559160200191906001019061050e565b5050600080548152600360209081526040822085516001918201805481865294849020909460029381161561010002600019011692909204601f90810184900483019391929188019083901061059957805160ff19168380011785555b506105c992915061021f565b5090565b82800160010185558215610589579182015b828111156105895782518260005055916020019190600101906105ab565b50506000805481526003602090815260408220845160029182018054818652948490209094600181161561010002600019011692909204601f90810184900483019391929187019083901061063157805160ff19168380011785555b5061048292915061021f565b82800160010185558215610625579182015b82811115610625578251826000505591602001919060010190610643565b820191906000526020600020905b81548152906001019060200180831161066f57829003601f168201915b50505050509050919050565b820191906000526020600020905b8154815290600101906020018083116106a657829003601f168201915b5050505050935095509550955095509550955091939550919395565b820191906000526020600020905b8154815290600101906020018083116106ed57829003601f168201915b5050604080518a54602060026001831615610100026000190190921691909104601f8101829004820283018201909352828252959b50948a9450909250840190508282801561079a5780601f1061076f5761010080835404028352916020019161079a565b820191906000526020600020905b81548152906001019060200180831161077d57829003601f168201915b5050875460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152959a50899450925084019050828280156106c35780601f10610698576101008083540402835291602001916106c356",
    address: "0x6a1ea80e35613fa746a82a3fc1383099989d2332",
    generated_with: "2.0.6",
    contract_name: "Monument"
  };

  function Contract() {
    if (Contract.Pudding == null) {
      throw new Error("Monument error: Please call load() first before creating new instance of this contract.");
    }

    Contract.Pudding.apply(this, arguments);
  };

  Contract.load = function(Pudding) {
    Contract.Pudding = Pudding;

    Pudding.whisk(contract_data, Contract);

    // Return itself for backwards compatibility.
    return Contract;
  }

  Contract.new = function() {
    if (Contract.Pudding == null) {
      throw new Error("Monument error: Please call load() first before calling new().");
    }

    return Contract.Pudding.new.apply(Contract, arguments);
  };

  Contract.at = function() {
    if (Contract.Pudding == null) {
      throw new Error("Monument error: lease call load() first before calling at().");
    }

    return Contract.Pudding.at.apply(Contract, arguments);
  };

  Contract.deployed = function() {
    if (Contract.Pudding == null) {
      throw new Error("Monument error: Please call load() first before calling deployed().");
    }

    return Contract.Pudding.deployed.apply(Contract, arguments);
  };

  if (typeof module != "undefined" && typeof module.exports != "undefined") {
    module.exports = Contract;
  } else {
    // There will only be one version of Pudding in the browser,
    // and we can use that.
    window.Monument = Contract;
  }

})();
