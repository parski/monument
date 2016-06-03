// m.js

M = {

  Submit: function(entry, callback) {
    if (typeof entry == 'object') {
      if (entry.title !== undefined && entry.author !== undefined && entry.description !== undefined && entry.fundingTarget !== undefined) {
        monument.newTitle(entry.title, entry.author, entry.description, entry.fundingTarget, {from: account}).then(function(tx) {
          monument.getProspectLength.call().then(function(length) {
            console.log("Submission successful, ID: " + length.toNumber());
            callback();
          });
        }).catch(function(e) {
          console.log("Error: " + e);
        });
      } else {
        console.log("Error: Invalid submission. Missing properties.");
      }
    } else {
      console.log("Error: Invalid submission. Must be an object.");
    }
  },


  Catalogue: {

    Collect: function(input, callback) {
      if (typeof input == 'number') {
        // Return one entry by index.
        monument.collectFromCatalogueByID.call(input).then(function(data) {
          console.log(data);
          callback(data);
        }).catch(function(e) {
          console.log(e);
          return;
        });
      } else if(typeof input == 'object') {
        // Return entries from complex query argument.
        console.log("The argument is an object.");
      } else if(typeof input == 'function') {
        // Return all entries. Input is callback!
        monument.getCatalogueLength.call().then(function(length) {
          var max = length.toNumber();
          return max;
        }).then(function(max) {
          var count = max;
          var collection = [];

          function returnWhenFinished() {
            count--;
            if (count === 0) {
              console.log("Done collecting!");
              console.log(collection);
              input(collection);
            }
          }

          for (var i = 0; i < max; i++) {
            monument.collectFromCatalogueByID.call(i).then(function(data) {
              collection.push(data); // Should return the entries.
              returnWhenFinished();
            });
          }

        }).catch(function(e) {
          console.log("Error");
        });
      }
    },

    Length: function() {

      console.log("Hello");

      // Check Size of Index
      monument.getProspectLength.call().then(function(length) {
        console.log("The catalogue contains " + length.toNumber() + " entries.");
        return length.toNumber();
      });

    }

  }, // End Catalogue


  Prospects: {

    Collect: function(input, callback) {
      if (typeof input == 'number') {
        // Return one entry by index.
        monument.collectFromProspectByID.call(input).then(function(data) {
          console.log(data);
          callback(data);
        }).catch(function(e) {
          console.log(e);
          return;
        });
      } else if(typeof input == 'object') {
        // Return entries from complex query argument.
        console.log("The argument is an object. This function is not yet written.");
      } else if(typeof input == 'function') {
        // Return all entries. Input is callback!
        monument.getProspectLength.call().then(function(length) {
          var max = length.toNumber();
          return max;
        }).then(function(max) {
          var count = max;
          var collection = [];

          function returnWhenFinished() {
            count--;
            if (count === 0) {
              // console.log("Done collecting!");
              // console.log(collection);
              input(collection);
            }
          }

          for (var i = 0; i < max; i++) {
            monument.collectFromProspectByID.call(i).then(function(data) {
              collection.push(data); // Should return the entries.
              returnWhenFinished();
            });
          }

        }).catch(function(e) {
          console.log("Error");
        });
      }
    },


    Length: function() {

      // Check length of Prospect Catalogue
      monument.getProspectLength.call().then(function(length) {
        console.log("The prospect catalogue contains " + length.toNumber() + " entries.");
        return length.toNumber();
      });

    }

  } // End Prospects

}; // End M
