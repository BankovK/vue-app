<template>
  <button @click="onSubmit">{{$t('export')}}</button>
</template>

<script>
import * as FileSaver from "file-saver"
import * as xlsx from "xlsx"

export default {
  name: 'ExportButton',
  props: {
    exportData: Array,
  },
  watch: {
    'exportData': 'exportToCSV',
  },
  methods: {
    onSubmit() {
      this.$emit('on-export')
    },
    exportToCSV() {
      if(!this.exportData) {
        return
      }
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
      const fileExtension = ".xlsx"
      const ws = xlsx.utils.json_to_sheet(this.exportData)
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] }
      const excelBuffer = xlsx.write(wb, { bookType: "xlsx", type: "array" })
      const data = new Blob([excelBuffer], { type: fileType })
      FileSaver.saveAs(data, fileExtension)
    }
  },
}
</script>
