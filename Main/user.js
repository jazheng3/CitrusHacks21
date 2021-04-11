class User {
    waterList = [];
    constructor(discordUsername, discordID, timeActivityStart, timeActivityEnd, numStretches, numWaterBreaks) {
        this.discordUsername = discordUsername;
        this.discordID = discordID;
        this.timeActivityStart = timeActivityStart; 
        this.timeActivityEnd = timeActivityEnd;
        this.numStretches = numStretches; 
        this.numWaterBreaks = numWaterBreaks;
    }

    addWater(time) {
        waterList.push(time);
    }
}

