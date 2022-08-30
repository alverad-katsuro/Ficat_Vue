<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-field label="Pesquisa por nome ou acrônimo">
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

        <b-table-column v-slot="props" field="name" label="Nome">
          {{ props.row.name }}
        </b-table-column>

        <b-table-column v-slot="props" field="acronym" label="Acrônimo">
          {{ props.row.acronym }}
        </b-table-column>

        <b-table-column v-slot="props" field="edit">
          <a @click="editAcademicUnity(props.row.id)">
            <b-icon icon="pencil" size="is-small" type="is-primary"> </b-icon>
          </a>
        </b-table-column>

        <b-table-column v-slot="props" field="delete">
          <a @click="deleteAcademicUnity(props.row.id)">
            <b-icon icon="delete" size="is-small" type="is-danger"> </b-icon>
          </a>
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    getAcademicUnityId: { type: Function, required: true }
  },
  data() {
    return {
      activeTab: 0,
      filterText: '',
      academicUnitiesData: [],
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
      for (const i in this.academicUnitiesData) {
        if (
          this.academicUnitiesData[i].name.match(nameRe) ||
          this.academicUnitiesData[i].acronym.match(nameRe)
        ) {
          data.push(this.academicUnitiesData[i])
        }
      }
      return data
    }
  },
  created() {
    this.getAcademicUnitiesData()
  },
  mounted() {
    this.$root.$on('academic_unity_added', () => {
      this.getAcademicUnitiesData()
      // console.log('data fetched')
    })
    this.$root.$on('academic_unity_edited', () => {
      this.getAcademicUnitiesData()
      // console.log('data fetched')
    })
  },
  methods: {
    getAcademicUnitiesData() {
      this.$axios
        .get('/api/academicUnities')
        .then(response => {
          this.academicUnitiesData = response.data
        })
        .catch(error => (this.academicUnitiesData = error.data))
    },
    editAcademicUnity(id) {
      this.$props.getAcademicUnityId(id)
      this.$emit('editClicked')
    },
    deleteAcademicUnity(id) {
      this.$axios
        .delete(`/api/academicUnities/${id}`)
        .then(() => {
          this.$buefy.snackbar.open('Unidade acadêmica removida!')

          this.getAcademicUnitiesData()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped></style>
