<template>
  <div>
    <van-picker
    :columns="columns"
    :title="title"
    show-toolbar
    @change="onChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    >
  </van-picker>
  </div>
</template>

<script>
  /* eslint-disable */
  import Picker from 'vant/lib/picker'
  import 'vant/lib/picker/style'

  import TimeTree from './time-tree'
  export default {
    name: 'dateTimePicker',
    components: {
      'van-picker': Picker
    },
    props: {
      startDate: [String, Object],
      endDate: [String, Object],
      defaultDate: {
        type: [String, Object],
        default () {
          return this.startDate
        }
      },
      span: {
        type: Number,
        default: 1
      },
      title: String
    },
    data () {
      return {
        columns: [],
        column1: {},
        column2: {},
        column3: {}
      }
    },
    computed: {
      arrDays () {
        let time = new TimeTree({
          startDate: this.startDate,
          endDate: this.endDate,
          span: this.span
        })
        let minuteArr = time.minuteArr
        let arrDays = {}

        for (let year in minuteArr) {
          for (let month in minuteArr[year]) {
            for (let day in minuteArr[year][month]) {
              arrDays[`${year}/${month}/${day}`] = minuteArr[year][month][day]
            }
          }
        }
        return arrDays
      },
      defaultDateBreak () {
        let defaultDate = this.defaultDate
        let dateObj = this.toDateObj(defaultDate)
        let dateObjStart = this.toDateObj(this.startDate)
        let dateObjEnd = this.toDateObj(this.endDate)
        if (dateObj.getTime() < dateObjStart.getTime() || dateObj.getTime() > dateObjEnd.getTime()) {
          throw '默认时间超过开始和结束时间范围'
        }
        let year = dateObj.getFullYear()
        let month = dateObj.getMonth()  + 1
        let day = dateObj.getDate()
        let hour = dateObj.getHours()
        let minute = dateObj.getMinutes()
        return {
          day: `${year}/${month}/${day}`,
          hour,
          minute
        }
      },

    },
    watch: {
      defaultDateBreak: {
        immediate: true,
        handler () {
          this.column1 = this.getColumn1(this.defaultDateBreak.day)
          this.column2 = this.getColumn2(this.defaultDateBreak.day, this.defaultDateBreak.hour)
          this.column3 = this.getColumn3(this.defaultDateBreak.day, this.defaultDateBreak.hour, this.defaultDateBreak.minute)
          this.columns = [this.column1, this.column2, this.column3]
        }
      }
    },

    beforeMount () {

    },
    methods: {
      onChange (picker, values, index) {

        if (index === 0) {
          let column2 = this.getColumn2(values[0].value, values[1].value)
          let column3 = this.getColumn3(values[0].value, column2.values[column2.defaultIndex].value, values[2].value)

          picker.setColumnValues(1, column2.values)
          picker.setColumnIndex(1, column2.defaultIndex)

          picker.setColumnValues(2, column3.values)
          picker.setColumnIndex(2, column3.defaultIndex)
        }

        if (index === 1) {
          let column3 = this.getColumn3(values[0].value, values[1].value, values[2].value)
          picker.setColumnValues(2, column3.values)
          picker.setColumnIndex(2, column3.defaultIndex)
        }
        this.$emit('change', picker, values, index)
      },

      onConfirm (value, index) {
        this.$emit('confirm', value, index)
      },

      onCancel () {
        this.$emit('cancel')
      },

      // 获取日的列
      getColumn1 (day) {
        let col1 = []
        let obj = {
          0: '周日',
          1: '周一',
          2: '周二',
          3: '周三',
          4: '周四',
          5: '周五',
          6: '周六',
        }
        let days = Object.keys(this.arrDays)
        let defaultIndex = days.indexOf(day)
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
        return {values: col1, defaultIndex}
      },

      // 获取小时列， 
      getColumn2 (day, oldHour) {
        let hourArr = Object.keys(this.arrDays[day])
        let col2 = []
        let index = hourArr.indexOf(String(oldHour))
        index = index > -1 ? index : 0
        hourArr.forEach(cell => {
          let text = parseInt(cell) < 10 ? '0' + cell : cell
          col2.push({
            value: parseInt(cell),
            text: `${text}时`
          })
        })
        return {values: col2, defaultIndex: index}
      },
      getColumn3 (day, hour, oldMinute) {
        let col3 = []
        let minuteArr = this.arrDays[day][hour]
        let integerMinute = Math.round(Math.round(oldMinute / this.span) * this.span)
        let index = minuteArr.indexOf(integerMinute)
        index = index > -1 ? index : 0
        minuteArr.forEach(cell => {
          let text = parseInt(cell) < 10 ? '0' + cell : cell
          col3.push({
            value: parseInt(cell),
            text
          })
        })
        return {values: col3, defaultIndex: index}
      },
      toDateObj (value) {
        let newValue = value
        if (typeof value === 'string') {
          newValue = value.replace(/-/g, '/')
        }
        return new Date(newValue)
      }
    }
  }


</script>