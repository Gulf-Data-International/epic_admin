<template>
  <div>
    <v-switch @change="(e) => setLoading(e)"> </v-switch>
    <v-base-datatable
      :loading="getLoading"
      :items="items"
      :headers="headers"
      :table-options="{ groupBy: [], itemsPerPage: 5 }"
    >
    </v-base-datatable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vBaseDatatable from '~/components/datatables/v-base-datatable/data-table.vue'

export default {
  components: { vBaseDatatable },
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      headers: [
        {
          text: 'Account',
          value: 'account',
          width: '10%',
          align: 'start',
          sortable: false,
          groupable: false,
          type: String,
          filters: [],
          component: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
            },
          },
        },
        {
          text: 'Credit',
          value: 'credit',
          width: '15%',
          groupable: false,
          type: Number,
          filters: [],
          component: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              type: 'number',
            },
          },
        },
        {
          text: 'Debit',
          value: 'debit',
          width: '15%',
          groupable: false,
          type: Number,
          filters: [],
          component: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              type: 'number',
            },
            on: [
              {
                name: 'blur',
                callback: this.itemComponentBlur,
              },
            ],
          },
          footer: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              dense: true,
              value: 2000,
              outlined: true,
            },
            on: [
              {
                name: 'blur',
                callback: this.itemComponentBlur,
              },
            ],
            value: '',
          },
        },
        {
          text: 'Description',
          value: 'description',
          large: true,
          groupable: false,
          type: String,
          filters: [],
          component: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              width: '100%',
              class: 'col-description',
            },
          },
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
  },
  created() {
    this.setLoading(false)
  },
  methods: {
    columnAggregate: (header, props, event) => {
      console.log('HEADER :', header)
      console.log('PROPS :', props)
      console.log('EVENT :', event)
    },
    columnSum(name, items) {
      let result = 0
      items.map((o) => {
        result += isNaN(o[name]) ? 0 : o[name]
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
    itemComponentBlur: (header, props, event) => {
      console.log('blurItemCell :', JSON.stringify(props))
    },

    ...mapActions(['setLoading']),
  },
}
</script>

<style></style>
