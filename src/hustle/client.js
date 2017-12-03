let Parse = require('parse/node');
let Organization = Parse.Object.extend("Organization");

Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_KEY);
Parse.serverURL = 'https://parse.hustle.life/1/';

class HustleClient {
  fetchGoals(config) {
    let query = new Parse.Query("Goal");
    query.limit(1000);
    if (config) {
      config(query);
    }

    return query.find({sessionToken: process.env.SESSION_TOKEN});
  }

  fetchGoalStats(goalId) {
    return Parse.Cloud.run("goalStats", { goalId: goalId });
  }
}

module.exports = HustleClient;
