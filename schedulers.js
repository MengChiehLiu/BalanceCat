const schedule = require('node-schedule');
const {depreciate} = require('./server/schedulers/depreciate.js')

// 月底: 折舊
const endOfTheMonth = new schedule.RecurrenceRule();
endOfTheMonth.date = 28;

schedule.scheduleJob(endOfTheMonth, depreciate);