<template>
  <div>
    <van-picker :columns="columns" @change="onChange"> </van-picker>
  </div>
</template>

<script>
  import Picker from 'vant/lib/picker'
  import 'vant/lib/picker/style'
  import TimeTree from './time-tree'
  export default {
    components: {
      'van-picker': Picker
    },
    data () {
      return {
        columns: [],
        arrDays: {},
        col1: [],
        col2: [],
        col3: []
      }
    },
    beforeMount () {

      let time = new TimeTree({
        startDate: '2020-05-04 08:36',
        endDate: '2020-05-19 20:46',
        span: 10
      })

      let minuteArr = time.getMinuteArr()
      let arrDays = {}
      for (let year in minuteArr) {
        for (let month in minuteArr[year]) {
          for (let day in minuteArr[year][month]) {
            arrDays[`${year}/${month}/${day}`] = minuteArr[year][month][day]
          }
        }
      }
      console.log(arrDays)
      this.arrDays = arrDays

      let col1 = []
      let col2 = []
      let col3 = []
      let obj = {
        0: '周日',
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六',
      }
      let days = Object.keys(arrDays)
      days.forEach(day => {
        let arr = day.split('/')
        let dateObj = new Date(day)
        let week = dateObj.getDay()
        let weekZh = obj[week]
        let month = parseInt(arr[1]) < 10 ? '0' + arr[1] : arr[1]
        let dayx = parseInt(arr[2]) < 10 ? '0' + arr[2] : arr[2]
        let text = `${month}月${dayx}日 ${weekZh}`
        col1.push({
          value: day,
          text
        })
      })

      let hour = Object.keys(arrDays[days[0]])

      hour.forEach(cell => {
        let text = parseInt(cell) < 10 ? '0' + cell : cell
        col2.push({
          value: parseInt(cell),
          text
        })
      })
      

      let minute = arrDays[days[0]][hour[0]]
      minute.forEach(cell => {
        let text = parseInt(cell) < 10 ? '0' + cell : cell
        col3.push({
          value: parseInt(cell),
          text
        })
      })

      this.col1 = col1
      this.col2 = col2
      this.col3 = col3

      this.columns = [{values: col1}, {values: col2}, {values: col3}]
    },
    methods: {
      onChange (picker, values, index) {

        if (index == 0) {
          let column2 = this.getColumn2(values)
          picker.setColumnValues(1, column2)
          setTimeout(() => {
            this.getColumn3(values)
          }, 500)
        }
        if (index == 1) {
          let column3 = this.getColumn3(values)
          picker.setColumnValues(2, column3)
        }

      },
      getColumn2 (values) {
        let day = values[0].value
        let hourArr = Object.keys(this.arrDays[day])
        let col2 = []
        hourArr.forEach(cell => {
          let text = parseInt(cell) < 10 ? '0' + cell : cell
          col2.push({
            value: parseInt(cell),
            text: `${text}时`
          })
        })
        return col2
      },
      getColumn3 (values) {
        let day = values[0].value
        let hour = values[1].value
        let col3 = []
        console.log(day, hour)
        let minuteArr = this.arrDays[day][hour]
        minuteArr.forEach(cell => {
          let text = parseInt(cell) < 10 ? '0' + cell : cell
          col3.push({
            value: parseInt(cell),
            text
          })
        })
        console.log(col3)
        return col3
      }
    }
  }









</script>