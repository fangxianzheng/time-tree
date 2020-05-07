<template>
  <div>
    <date-time-picker 
    :startDate="startDate"
    :endDate="endDate"
    :defaultDate="defaultDate"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
    :span="span"
    title="日期选择"
    ></date-time-picker>

     <div @click="changeDefault">改变默认值</div>
  </div>

 
</template>

<script>
  import dateTimePicker from './dateTimePicker'

  export default {
    name: 'APP',
    components: {
      'date-time-picker': dateTimePicker,

    },
    data () {
      return {
        startDate: '2020-05-04 08:36',
        endDate: '2020-05-19 20:46',
        span: 10,
        defaultDate: '2020-05-11 09:51'
      }
    },
    beforeMount () {

    },
    methods: {
      changeDefault () {
        this.defaultDate = '2020-05-13 10:43'
      },
      onConfirm (a, b) {
        console.log(a, b)
      },
      onCancel () {
        console.log('lala')
      },
      onChange (a,b,c) {
        console.log(a)
        console.log(b)
        console.log(c)
      }
    }
  }









</script>