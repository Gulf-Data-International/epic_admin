<template>
  <div>
    <v-acc-post-data-table :loading="false" :items="getItems">
    </v-acc-post-data-table>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import VAccPostDataTable from '~/components/datatables/v-acc-post-data-table/v-acc-post-data-table.vue'

export default {
  components: { VAccPostDataTable },
  data() {
    return {
      items: [
        {
          id: 10,
          account: '101225',
          credit: 15000.237,
          debit: 0,
          description: 'Assets - Current Assets',
        },
        {
          id: 20,
          account: '101227',
          credit: 0,
          debit: 15000.237,
          description: 'Assets - Current Assets',
        },
      ],
    }
  },
  computed: {
    getItems: {
      get() {
        return this.items
      },
      set(val) {
        this.items = val
      },
    },
  },
  methods: {
    ckeckEntryBalance(entry) {
      console.log(entry)
    },
  },
}
</script>

<style></style>
