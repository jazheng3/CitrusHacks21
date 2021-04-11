var myChannel;
module.exports = {
  name: 'water',
  description: 'Sends reminders to drink water',
  executes (myChannel) {
    var nextDate = new Date();
    if (nextDate.getMinutes() === 0) { // You can check for seconds here too
      return sendReminder();
    } else {
      nextDate.setHours(nextDate.getHours() + 1);
      nextDate.setMinutes(0);
      nextDate.setSeconds(0);// I wouldn't do milliseconds too ;)
  
      var difference = nextDate - new Date();
      return setTimeout(sendReminder, 3000);
    }
    function sendReminder() {
      return setInterval(waterBreak, 20000);
    }
  
    function waterBreak() {
      console.log("printing?");
      myChannel.send("Time to drink some water! React 👍 after taking a drink!");
    }
  }
}
  
  