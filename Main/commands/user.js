 class User {
    waterList = [];
    constructor(discordUsername, discordID) {
        this.discordUsername = discordUsername;
        this.discordID = discordID;
        this.timeActivityStart = 0; 
        this.timeActivityEnd = null;
        this.numStretches = 0; 
        this.numWaterBreaks = 0;
    }

    addWater(time) {
        waterList.push(time);
    }
}

exports.User = User;

