export default {
  methods: {
    columnSum(name, items) {
      let result = 0
      items.map((o) => {
        console.log('Column', name, '- Value:', o[name])
        result += isNaN(o[name]) ? 0 : parseFloat(o[name])
        return null
      })
      return result
    },
    columnCountNotNull(name, items) {
      let result = 0
      items.map((o) => {
        result +=
          o[name] === null ||
          o[name] === undefined ||
          o[name] === '' ||
          o[name] === 0
            ? 0
            : 1
        return null
      })
      return result
    },
    columnAverage(name, items) {
      return this.columnSum(name, items) / items.count
    },
    // IsLastCell(props, headers, items) {
    //   console.log('PROPS:', props)
    //   console.log('HEADERS:', headers)
    //   console.log('ITEMS:', items)
    //   if (props.header.value === headers[headers.length - 1].value) {
    //     if (items.length === props.index + 1) {
    //       console.log('last cell')
    //       return true
    //     }
    //   }
    //   return false
    // },
    generateComponent(vType, attrs, on) {
      return {
        vType,
        attrs,
        on,
      }
    },
    generateColumn(type, title, name, value, cellComponent, footerComponent) {
      const column = {
        type,
        name: title,
        value: name,
        default: value,
        component: cellComponent,
        footer: footerComponent,
      }
      return column
    },
  },
}
