/* Your Code Here */

const createEmployeeRecord = (employee) => {
    const recordObject = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return recordObject 
}

const createEmployeeRecords = (dataEmployees) => {
    const newRecordsList = []
    dataEmployees.forEach(employee => {
        newRecordsList.push(createEmployeeRecord(employee))
    });
    return newRecordsList
}

function createTimeInEvent(dateStamp) {
    const timeInArr = dateStamp.split(' ')
    const timeInObj = {
        type: 'TimeIn',
        hour: parseInt(timeInArr[1]),
        date: timeInArr[0]
    }
    this.timeInEvents.push(timeInObj) 
    return this
}

function createTimeOutEvent(dateStamp) {
    const timeInArr = dateStamp.split(' ')
    const timeOutObj = {
        type: 'TimeOut',
        hour: parseInt(timeInArr[1]),
        date: timeInArr[0]
    }
    this.timeOutEvents.push(timeOutObj)
    return this
}

function hoursWorkedOnDate(dateStamp) {
    const timeInObj = this.timeInEvents.find(element => element.date === dateStamp)
    const timeOutObj = this.timeOutEvents.find(element => element.date === dateStamp)

    return (timeOutObj.hour - timeInObj.hour)/100
}

function wagesEarnedOnDate(dateStamp) {
    let payout = hoursWorkedOnDate.call(this, dateStamp)
    return payout * this.payPerHour
}

/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

// const allWagesFor = (employeeRecordObj) => {
//     let allDatesWorked = []

//     employeeRecordObj.timeInEvents.forEach(dayWorked => {
//         allDatesWorked.push(dayWorked.date)
//     })

//     let total = 0

//     for (const dateStamp of allDatesWorked) {
//         total += wagesEarnedOnDate(employeeRecordObj, dateStamp)
//     }
//     return total
// }

const findEmployeeByFirstName = (arrOfEmployeeObject, firstName) => {
    return arrOfEmployeeObject.find(employee => firstName === employee.firstName)
}

const calculatePayroll = (arrOfEmployeeObject) => {
    let totalWages = 0
    arrOfEmployeeObject.forEach(element => {
        totalWages += allWagesFor.call(element)
    })
    return totalWages
}