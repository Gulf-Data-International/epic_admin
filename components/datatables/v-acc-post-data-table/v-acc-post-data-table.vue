<template>
  <div>
    <v-row>
      <v-col>
        <v-switch @change="(e) => setLoading(e)"> </v-switch>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!isVaild">Save</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-base-datatable
          ref="baseTable"
          :loading="getLoading"
          :items="items"
          :headers="headers"
          :table-options="{ groupBy: [], itemsPerPage: 5 }"
        >
        </v-base-datatable>
      </v-col>
    </v-row>
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
          footer: {
            vType: 'span',
            attrs: {
              style: 'width:40px; height:40px; display:block;',
              title: 'Total',
            },
            on: [
              {
                name: 'load',
                callback: (h, p, e) => {
                  e.target.innerText = 'Total'
                  console.log('PRops -> ', p)
                },
              },
            ],
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
            on: [
              {
                name: 'blur',
                callback: this.computeSUM,
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
              value: this.getTotalCredit,
              // outlined: true,
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
                callback: this.computeSUM,
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
              // outlined: true,
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
      // model: { id: null, account: '', credit: 0, debit: 0, description: '' },
      isMounted: false,
    }
  },
  computed: {
    isVaild() {
      // eslint-disable-next-line eqeqeq
      return this.totalCredit == this.totalDebit
    },
    getItems() {
      if (!this.isMounted) return
      return this.$refs.baseTable.entries
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
  mounted() {
    this.isMounted = true
    this.totalCredit = this.columnSum('credit', this.getItems)
    this.totalDebit = this.columnSum('debit', this.getItems)
    console.log('Total Credit:', this.totalCredit)
    console.log('Total Debit:', this.totalDebit)
  },
  methods: {
    computeSUM(header, props, event) {
      // if (event.target.value > 0) props.item[header.value] = 0
      header.footer.attrs.value = this.columnSum(header.value, this.getItems)
    },
    creditBlur(header, props, event) {
      if (event.target.value > 0) props.item.debit = 0
      this.totalCredit = this.columnSum(header.value, this.items)
      header.footer.attrs.value = this.getTotalCredit
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
