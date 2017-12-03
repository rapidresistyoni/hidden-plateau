let express = require('express');
let logger = require('morgan');
let HustleClient = require('./hustle_client');
let GoalService = require('./goal_service');

let client = new HustleClient();
let service = new GoalService(client);
let app = express();
app.use(logger('dev'))

app.get('/active-goal-stats', function (req, res, next) {
  service.activeGoalStats()
    .then(goals => res.json(goals))
    .catch(next);
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
