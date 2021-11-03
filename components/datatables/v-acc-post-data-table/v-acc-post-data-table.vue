<template>
  <div>
    <v-switch @change="(e) => setLoading(e)"> </v-switch>
    <v-base-datatable
      :loading="getLoading"
      :items="getEntries"
      :headers="headers"
      :table-options="{ groupBy: [], itemsPerPage: 5 }"
    >
    </v-base-datatable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import aggregateArrayColumn from '../mixins/aggregateArrayColumn'
import vBaseDatatable from '~/components/datatables/v-base-datatable/data-table.vue'

export default {
  components: { vBaseDatatable },
  mixins: [aggregateArrayColumn],
  props: {
    items: { type: Array, default: () => [] },
  },
  data() {
    return {
      valid: false,
      totalCredit: 0,
      totalDebit: 0,
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
                callback: this.debitBlur,
              },
            ],
          },
          footer: {
            vType: 'v-text-field',
            attrs: {
              'single-line': true,
              'hide-details': true,
              disabled: true,
              dense: true,
              value: this.getTotalDebit,
              outlined: true,
            },
            on: [
              {
                name: 'blur',
                callback: () => {},
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
            // on: [{ name: 'blur', callback: this.appendRow }],
          },
        },
      ],
      model: { id: null, account: '', credit: 0, debit: 0, description: '' },
      entries: this.items,
    }
  },
  computed: {
    getEntries() {
      return this.entries
    },
    getTotalDebit() {
      return this.totalDebit
    },
    getTotalCredit() {
      return this.totalCredit
    },
    ...mapGetters(['getLoading']),
  },
  created() {
    this.setLoading(false)
  },
  methods: {
    // appendRow(header, props, $event) {
    //   console.log('EVENT: => ', $event)
    //   if (this.IsLastCell(props, this.headers, this.entries)) {
    //     // const row = this.items.slice(-1)[0]

    //     this.entries = [...this.entries, this.model]
    //     console.log('New Row', this.model)
    //     // document.getElementById($event.target.id).focus()
    //     $event.target.focus()
    //   }
    //   return false
    // },
    debitBlur(header, props, event) {
      console.log(this.columnSum(header.value, this.entries))
      header.footer.attrs.value = this.columnSum(header.value, this.entries)
    },
    itemComponentBlur(header, props, event) {
      console.log('blurItemCell :', JSON.stringify(props))
    },
    columnAggregate: (header, props, event) => {
      console.log('HEADER :', header)
      console.log('PROPS :', props)
      console.log('EVENT :', event)
    },

    ...mapActions(['setLoading']),
  },
}
</script>

<style></style>
