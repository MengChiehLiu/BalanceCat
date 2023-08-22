const {copyBalances, depreciate} = require('./server/models/schedulers')
const axios = require('axios');

// generate fake data from March to August
let now = Date.UTC(2023,2,1)
const end = Date.UTC(2023,7,31)

const host = "54.236.231.127"
let currMonth = 3
let depreciateMonth = 3
const expenses = [5101, 5102, 5103, 5104, 5105, 5106, 5107, 5108, 5109, 5201, 5202, 5203, 5204, 5205, 5206, 5207, 5208]
const revenues =  [4102, 4103, 4201, 4202, 4203]
const CAs = [1102, 1103, 1104]
const LAs = [1201, 1202, 1203, 1204, 1205, 1206]
const CLs = [2101, 2102, 2103]
const LLs = [2201, 2202, 2203, 2204]

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
    
    if (n > 0.95){ // revenue
        amount = Math.floor(Math.random() * (100000 - 50000 + 1)) + 50000;
        details = [{subject_id: 1101, amount: amount}, {subject_id: 4101, amount: -amount}]
    }else if (n > 0.9){ // other revenues
        amount = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
        details = [{subject_id: 1101, amount: amount}, {subject_id: randArr(revenues), amount: -amount}]
    }else if (n > 0.875){ //LL
        amount = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
        details = [{subject_id: 1101, amount: amount}, {subject_id: randArr(LLs), register: {id: null, expired_in: 10}, amount: -amount}]
    }else if (n > 0.85){  //LA
        amount = Math.floor(Math.random() * (30000 - 10000 + 1)) + 10000;
        details = [{subject_id: 1101, amount: -amount}, {subject_id: randArr(LAs), register: {id: null, expired_in: 10}, amount: amount}]
    }else if (n > 0.825){ // CL
        amount = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
        details = [{subject_id: 1101, amount: amount}, {subject_id: randArr(CLs), amount: -amount}]
    }else if (n > 0.8){  // CA
        amount = Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000;
        details = [{subject_id: 1101, amount: -amount}, {subject_id: randArr(CAs), amount: amount}]
    }else{  //expenses
        amount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        details = [{subject_id: 1101, amount: -amount}, {subject_id: randArr(expenses), amount: amount}]
    }
    return details
}
// Create the POST request
async function generate(){
    const url = `https://${host}/api/1.0/entries`
    const options = {headers: {"Authorization": await siginin()}}
    
    console.log(`開始生成${currMonth}月分錄...`)

    let count = 1

    while (now < end){
        const month = new Date(now).getMonth()+1
        const date = new Date(now).getDate()

        // if (month > currMonth){
        //     console.log(`開始更新${month}月餘額...`)
        //     await copyBalances(2023, month)
        //     currMonth += 1
        // }
        if (month==depreciateMonth && date==28){
            console.log(`開始${month}月折舊...`)
            await depreciate(2023, month);
            depreciateMonth += 1
        }

        const body = {details: generateEntry(), timestamp: formatTime(now)}
        await axios.post(url, body, options)
        now += Math.floor(Math.random() * (43200000 - 10800000 + 1)) + 10800000;
        console.log(`生成分錄 No.${count}`)
        count += 1
    }
}

generate()

