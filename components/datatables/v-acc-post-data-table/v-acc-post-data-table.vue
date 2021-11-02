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
            on: {
              blur: this.itemComponentBlur,
            },
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
    itemComponentBlur: (props, event) => {
      console.log('blurItemCell :', JSON.stringify(props))
    },
    ...mapActions(['setLoading']),
  },
}
</script>

<style></style>
