class SleepRepository {
  constructor(sleepData) {
    this.sleepCollection = sleepData;
  }

  calculateAllUsersAverageSleepQuality() {
    const sumOfSleepQuality = this.sleepCollection.reduce((sumQuality, night) => {
      return sumQuality += night.sleepQuality;
    }, 0);
    return sumOfSleepQuality / this.sleepCollection.length;
  }

  findWeeksGoodSleepers(date, userRepo) {
    const highestQualitySleepers = userRepo.users.filter((user) => {
      const userWeekOfSleep = user.getWellnessLog([], this.sleepCollection, []).getWeekOfStats(date, 'sleep', 'sleepQuality');
      const totalWeeksQuality =
        Object.values(userWeekOfSleep).reduce((total, sleepQuality) => {
          total += sleepQuality;
          return total;
        }, 0);
      return totalWeeksQuality / Object.keys(userWeekOfSleep).length > 3;
    });
    return highestQualitySleepers.map(sleeper => sleeper.id);
  }

  findNightsLongestSleepers(date) {
    const allSleeps = this.sleepCollection.filter(entry => entry.date === date);
    const sortedSleeps = allSleeps.sort((a, b) => a.hoursSlept - b.hoursSlept);
    const longestSleep = sortedSleeps[sortedSleeps.length - 1];
    const longestSleeps = sortedSleeps.filter(sleep => sleep.hoursSlept === longestSleep.hoursSlept);
    return longestSleeps.map(sleep => sleep.userID);
  }

}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository;
}
