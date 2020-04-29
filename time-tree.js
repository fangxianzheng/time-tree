class TimeTree {
  constructor(date) {
    this.startDate = this.toDateObj(date.startDate)
    this.endDate = this.toDateObj(date.endDate)

    this.startYear = this.startDate.getFullYear()
    this.startMonth = this.startDate.getMonth() + 1      // 月份是从0开始的
    this.startDay = this.startDate.getDate()
    this.startHour = this.startDate.getHours()
    this.startMinutes = this.startDate.getMinutes()

    this.endYear = this.endDate.getFullYear()
    this.endMonth = this.endDate.getMonth() + 1      // 月份是从0开始的
    this.endDay = this.endDate.getDate()
    this.endHour = this.endDate.getHours()
    this.endMinutes = this.endDate.getMinutes()

    this.yearArr = []
    this.monthArr = {}
    this.dayArr = {}

    this.init()
  }

  init () {
    this.yearArr = this.getYearArr()
    this.monthArr = this.getMonthArr()
    this.dayArr = this.getDayArr()
  }

  getYearArr () {
    let arr = []
    for (let i = this.startYear; i <= this.endYear; i++) {
      arr.push(i)
    }
    return arr
  }

  getMonthArr () {
    let obj = {}

    this.yearArr.forEach((year) => {
      obj[year] = []
      if (year == this.startYear) {
        for(let i = this.startMonth; i<= 12; i++) {
          obj[year].push(i)
        }
      } else if (year == this.endYear) {
        for(let i = 1; i<= this.endMonth; i++) {
          obj[year].push(i)
        }
      } else {
        for(let i = 1; i <= 12; i++) {
          obj[year].push(i)
        }
      }
    })

    return obj
  }

  getDayArr () {
    let obj = {}
    for(let year in this.monthArr) {

      // 是否是闰年
      let isLeapYear = Number(year) % 4 == 0
      obj[year] = {}
      this.monthArr[year].forEach((month) => {
        obj[year][month] = []
        let lastDay = null
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
          lastDay = 31
        }
        if (month === 4 || month === 6 || month === 9 || month === 11) {
          lastDay = 30
        }
        if (month === 2) {
          lastDay = isLeapYear ? 29 : 28
        }

        if (year == this.startYear && month == this.startMonth) {
          for(let i = this.startDay; i <= lastDay; i++) {
            obj[year][month].push(i)
          }
        }else if (year == this.endYear && month == this.endMonth) {
          for(let i = 1; i <= this.endDay; i++) {
            obj[year][month].push(i)
          }
        } else {
          for(let i = 1; i <= lastDay; i++) {
            obj[year][month].push(i)
          }
        }

      })

    }
    return obj
  }


  toDateObj (value) {
    let newValue = value
    if (typeof value === 'string') {
      newValue = value.replace(/-/g, '/')
    }
    return new Date(newValue)
  }

}

export default TimeTree