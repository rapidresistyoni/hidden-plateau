class GoalService {
  constructor(client) {
    this.client = client;
  }

  activeGoalStats() {
    let now = new Date();

    return this.client.fetchGoals(query => {
      query.include('group');
      query.greaterThanOrEqualTo('endTime', now);
      //query.lessThanOrEqualTo('startTime', now);
      //console.log(JSON.stringify(query.toJSON()));
    })
    .then(goals => {
      let statsRequests = goals.map(goal => {
        let group = goal.get('group');
        return this.client.fetchGoalStats(goal.id).then(goalStat => {
          let totalStats = Object.keys(goalStat.goalStepStats).reduce((total, key) => {
            let stepStats = goalStat.goalStepStats[key];

            total.agentCount += Object.keys(stepStats.agentStats).length;
            total.targetedLeadCount += stepStats.targetedLeadCount;
            total.hustledLeadCount += stepStats.hustledLeadCount;
            total.unsubscribedLeadCount += stepStats.unsubscribedLeadCount;

            return total;
          }, {agentCount: 0, targetedLeadCount: 0, hustledLeadCount: 0, unsubscribedLeadCount: 0});

          return [
            group.get('name'),
            group.id,
            goal.get('name'),
            goal.id,
            goal.get('startTime'),
            goal.get('endTime'),
            totalStats.agentCount,
            totalStats.targetedLeadCount,
            totalStats.hustledLeadCount,
            totalStats.unsubscribedLeadCount
          ];
        });
      });

      return Promise.all(statsRequests);
    });
  }
}

module.exports = GoalService;
