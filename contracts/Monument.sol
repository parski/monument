contract Monument {


  // Config & Variable Declaration

  enum FundingStage { Offer, Pending, Release }

  struct Entry {

    // Content Metadata
    string title;
    string author;
    string description;

    // Ethereum Metadata
    uint block;
    address owner;

    // Funding Metadata
    uint fundingProgress;
    uint fundingTarget;
    FundingStage stage;
  }

  uint prospectLength;
  uint catalogueLength;
  mapping(uint => Entry) titles;
  mapping(uint => Entry) prospects;


  // Constructor

	function Monument() {
		// Constructor
    prospectLength = 0;
    catalogueLength = 0;
	}


  // Logic (Write)

	function newTitle(string _title, string _author, string _description, uint _fundingTarget) {

    // Content Metadata
    prospects[prospectLength].title = _title;
    prospects[prospectLength].author = _author;
    prospects[prospectLength].description = _description;

    // Ethereum Metadata
    prospects[prospectLength].block = now;
    prospects[prospectLength].owner = msg.sender;

    // Funding Metadata
    prospects[prospectLength].fundingProgress = 0;
    prospects[prospectLength].fundingTarget = _fundingTarget;
    prospects[prospectLength].stage = FundingStage.Offer;

    // Global
    prospectLength++; // Make sure to clean up for whoever is next!

  }

  // Calls (Read)

  function collectFromCatalogueByID(uint id) returns(string) {
    // Retrieve an entry from the blockchain
    return (titles[id].title);
  }

  function collectFromProspectByID(uint id) returns(string, string, string, uint, uint, FundingStage) {
    // Retrieve an entry from the blockchain
    return (prospects[id].title, prospects[id].author, prospects[id].description, prospects[id].fundingTarget, prospects[id].fundingProgress, prospects[id].stage );
  }

  function getCatalogueLength() returns(uint) {
    // Retrieve an entry from the blockchain
    return catalogueLength;
  }

  function getProspectLength() returns(uint) {
    // Retrieve an entry from the blockchain
    return prospectLength;
  }

}
