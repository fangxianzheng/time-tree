<template>
  <h1>hello</h1>
</template>

<script>
  import TimeTree from './time-tree'
  export default {
    beforeMount () {

      let time = new TimeTree({
        startDate: '2017-03-20 08:25',
        endDate: '2020-04-27 20:06'
      })

      // console.log(time)
      // console.log(time.getYearArr())
      // console.log(time.getMonthArr())
      console.log(time.getDayArr())

    }
  }









</script>