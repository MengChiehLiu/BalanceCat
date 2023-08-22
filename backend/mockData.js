const {copyBalances, depreciate} = require('./server/models/schedulers')
const axios = require('axios');

// generate fake data from March to August
let now = Date.UTC(2023,2,1)
const end = Date.UTC(2023,4,1)

const host = "54.236.231.127"
let currMonth = 3
let depreciateMonth = 3
const expenses = [5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109, 5201, 5202, 5203, 5204, 5205, 5206, 5207, 5208]
const revenues =  [4102, 4103, 4201, 4202, 4203]
const longTermAssets = [1201, 1202, 1203, 1204, 1205, 1206]

function formatTime(utcTime){
    const time = new Date(utcTime).toISOString()
    return `${time.slice(0, 10)} ${time.slice(11, 19)}`
}

function randArr(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}


async function siginin(){
    const url = `https://${host}/api/1.0/users/signin`
    const options = {headers: {"Content-Type": "application/json", 'Accept': 'application/json'}}
    const body = JSON.stringify({email: 'test@gmail.com', password: 'test'})
    const res = await axios.post(url, body, options)
    return `Bearer ${res.data.data.access_token}`
}

function generateEntry(){
    const n = Math.random()
    let amount;
    let details;
    // revenue
    if (n > 0.99){
        amount = Math.floor(Math.random() * (50000 - 30000 + 1)) + 50000;
        details = [{subject_id: 1101, amount: amount}, {subject_id: 4101, amount: -amount}]
    }else if (n > 0.98){
        amount = Math.floor(Math.random() * (3000 - 500 + 1)) + 500;
        details = [{subject_id: 1101, amount: amount}, {subject_id: randArr(revenues), amount: -amount}]
    }else if (n < 0.01){
        amount = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000;
        details = [{subject_id: 1101, amount: -amount}, {subject_id: randArr(longTermAssets), register: {id: null, expired_in: 10}, amount: amount}]

    }else{
        amount = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
        details = [{subject_id: 1101, amount: -amount}, {subject_id: randArr(expenses), amount: amount}]
    }
    return details
}
// Create the POST request
async function generate(){
    const url = `https://${host}/api/1.0/entries`
    const options = {headers: {"Authorization": await siginin()}}
    
    console.log(`開始生成3月分錄...`)

    let count = 1

    while (now < end){
        const month = new Date(now).getMonth()+1
        const date = new Date(now).getDate()

        if (currMonth == month){
            console.log(`開始生成${month}月分錄...`)
            await copyBalances(2023, currMonth)
            currMonth += 1
        }
        if (month==depreciateMonth && date==28){
            console.log(`開始${month}月折舊...`)
            await depreciate();
            depreciateMonth += 1
        }

        const body = {details: generateEntry(), timestamp: formatTime(now)}
        await axios.post(url, body, options)
        now += Math.floor(Math.random() * (21600000 - 16200000 + 1)) + 16200000;
        console.log(`生成分錄 No.${count}`)
        count += 1
    }
}

generate()

