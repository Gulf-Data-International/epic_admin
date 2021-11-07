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
import {
  required,
  digits, // ,email,min,max,regex,
} from 'vee-validate/dist/rules'
import {
  extend,
  // ValidationObserver,
  // ValidationProvider,
  setInteractionMode,
} from 'vee-validate'
import { mapGetters, mapActions } from 'vuex'
import aggregateArrayColumn from '../mixins/aggregateArrayColumn'
import vBaseDatatable from '~/components/datatables/v-base-datatable/data-table.vue'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

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
      isMounted: false,
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
              rules: ['required'],
            },
            on: [
              {
                name: 'blur',
                callback: this.accountBlur,
              },
            ],
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
                  // console.log('PRops -> ', p)
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
                callback: this.creditBlur,
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
                name: 'load',
                callback(h, p, e) {},
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
              // outlined: true,
            },
            on: [
              {
                name: 'load',
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
  mounted() {
    this.setLoading(false)
    this.isMounted = true
    this.computeSUM()
  },
  methods: {
    computeSUM() {
      this.totalCredit = this.columnSum('credit', this.getItems)
      this.totalDebit = this.columnSum('debit', this.getItems)
      this.headers[1].footer.attrs.value = this.getTotalCredit
      this.headers[2].footer.attrs.value = this.getTotalDebit
    },

    accountBlur(header, props, event) {
      if (!this.validateAccount(header, props, event)) event.target.focus()
    },
    creditBlur(header, props, event) {
      if (event.target.value > 0) props.item.debit = 0
      this.computeSUM()
    },
    debitBlur(header, props, event) {
      if (event.target.value > 0) props.item.credit = 0
      this.computeSUM()
    },

    validateAccount(header, props, event) {
      return true
    },
    validateCredit(header, props, event) {
      return true
    },

    ...mapActions(['setLoading']),
  },
}
</script>

<style></style>
