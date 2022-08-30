<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-field label="Pesquisa por nome">
          <b-input v-model="filterText" placeholder="Pesquisar..."></b-input>
        </b-field>
      </div>
    </div>
    <div class="column">
      <b-table
        :data="filter"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        default-sort="user.first_name"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
        <!-- <b-table-column
                v-slot="props"
                field="id"
                label="ID"
                width="40"
                numeric
              >
                {{ props.row.id }}
              </b-table-column> -->

        <b-table-column v-slot="props" field="username" label="Usuário">
          {{ props.row.username }}
        </b-table-column>

        <b-table-column v-slot="props" field="active" label="Status">
          <span
            :class="[
              'tag',
              { 'is-danger': props.row.active != 1 },
              { 'is-success': props.row.active == 1 }
            ]"
          >
            {{ props.row.active ? 'ativo' : 'inativo' }}
          </span>
        </b-table-column>

        <!-- <b-table-column v-slot="props" field="edit">
          <a @click="editUser(props.row.id)">
            <b-icon icon="pencil" size="is-small" type="is-primary"> </b-icon>
          </a>
        </b-table-column>

        <b-table-column v-slot="props" field="delete">
          <a @click="deleteUser(props.row.id)">
            <b-icon icon="delete" size="is-small" type="is-danger"> </b-icon>
          </a>
        </b-table-column> -->
      </b-table>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    getUserId: { type: Function, required: true }
  },
  data() {
    return {
      activeTab: 0,
      filterText: '',
      usersData: [],
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    filter() {
      const nameRe = new RegExp(this.filterText, 'i')
      const data = []
      for (const i in this.usersData) {
        if (this.usersData[i].username.match(nameRe)) {
          data.push(this.usersData[i])
        }
      }
      return data
    }
  },
  created() {
    this.getUsersData()
  },
  mounted() {
    this.$root.$on('user_added', () => {
      this.getUsersData()
      // console.log('data fetched')
    })
    this.$root.$on('user_edited', () => {
      this.getUsersData()
      // console.log('data fetched')
    })
  },
  methods: {
    getUsersData() {
      this.$axios
        .get('/api/users')
        .then(response => {
          this.usersData = response.data
        })
        .catch(error => (this.usersData = error.data))
    },
    editUser(id) {
      this.$props.getUserId(id)
      this.$emit('editClicked')
    },
    deleteUser(id) {
      this.$axios
        .delete(`/api/users/${id}`)
        .then(() => {
          this.$buefy.snackbar.open('Usuário removido!')

          this.getUsersData()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped></style>
