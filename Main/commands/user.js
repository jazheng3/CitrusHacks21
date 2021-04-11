 class User {
    constructor(discordUsername, discordID) {
        this.discordUsername = discordUsername;
        this.discordID = discordID;
        this.timeActivityStart = 0; 
        this.timeActivityEnd = null;
        this.numStretches = 0; 
        this.numWaterBreaks = 0;
    }

    addWater() {
        this.numWaterBreaks++;
    }
}

exports.User = User;

