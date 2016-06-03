// script.js

// Variable Declaration

// Object Models
var model;
var blockchain;

// Accounts
var account;
var accounts;

// Contracts
var monument;

$(document).ready(function() {

  // Set-up

  web3.eth.getAccounts(function(err, accs) {
    if (err !== null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length === 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    monument = Monument.deployed();

    blockchain = {
      hash: "n/a"
    };

    model = {
      prospects: {}
    };

    rivets.bind($('body'), {
      blockchain: blockchain,
      model: model
    });

    init();

  });

});

// Init

function init() {

  // Watch blockchain

  var filter = web3.eth.filter("latest");

  filter.watch(function(error, result) {
    if (!error) {
      blockchain.hash = result;
      UpdateBalance()
    }
  });

  // Submission Form

  $("#submit-button").click(function(event) {
    var obj = {
      title: $("#title").val(),
      author: $("#author").val(),
      description: $("#description").val(),
      fundingTarget: $("#bounty").val()
    };

    M.Submit(obj, function(){
      UpdateTitles();
    });

  });

  // Monument

  // M.Submit({
  //   title: "Gullivers Travels",
  //   author: "Gulliver",
  //   description: "Travels",
  //   fundingTarget: 0
  // });

  UpdateTitles();

}

function UpdateBalance() {
  blockchain.balance = web3.fromWei(web3.eth.getBalance(account));
}

function UpdateTitles() {

  M.Catalogue.Collect(function(result) {
    model.catalogueTitles = result;
  });

  M.Prospects.Collect(function(results) {
    var prospects = [];
    for (var i = 0; i < results.length; i++) {
      var obj = {
        title: results[i][0],
        author: results[i][1],
        description: results[i][2],
        fundingTarget: results[i][3],
        fundingProgress: results[i][4],
        stage: results[i][5]
      };
      prospects.push(obj);
      model.prospects = prospects;
    }

  });

}
