const schedule = require('node-schedule');
const {depreciate, copyBalances} = require('./server/models/schedulers.js')

// depreciate
const endOfTheMonth = new schedule.RecurrenceRule();
endOfTheMonth.tz = 'Asia/Taipei';
endOfTheMonth.date = 28;

// copyBalances
const beginOfTheMonth = new schedule.RecurrenceRule();
beginOfTheMonth.tz = 'Asia/Taipei';
beginOfTheMonth.date = 1;

schedule.scheduleJob(endOfTheMonth, depreciate);
schedule.scheduleJob(beginOfTheMonth, copyBalances);