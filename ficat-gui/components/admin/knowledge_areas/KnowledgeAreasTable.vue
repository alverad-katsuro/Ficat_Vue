<template>
  <section>
    <div class="columns">
      <div class="column">
        <b-field label="Pesquisa por nome ou cdd">
          <b-input
            v-model="filterText"
            @input="getKnAreas"
            placeholder="Pesquisar..."
          ></b-input>
        </b-field>
      </div>
    </div>
    <div class="column">
      <b-table
        @page-change="onPageChange"
        :data="knowledgeAreasData"
        :per-page="perPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :default-sort-direction="defaultSortDirection"
        :pagination-rounded="isPaginationRounded"
        :total="total"
        :loading="loading"
        backend-pagination
        paginated
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

        <b-table-column v-slot="props" field="code" label="CDD">
          {{ props.row.code }}
        </b-table-column>

        <b-table-column v-slot="props" field="description" label="Descrição">
          {{ props.row.description }}
        </b-table-column>

        <b-table-column v-slot="props" field="edit">
          <a @click="editKnowledgeArea(props.row.id)">
            <b-icon icon="pencil" size="is-small" type="is-primary"> </b-icon>
          </a>
        </b-table-column>

        <b-table-column v-slot="props" field="delete">
          <a @click="deleteKnowledgeArea(props.row.id)">
            <b-icon icon="delete" size="is-small" type="is-danger"> </b-icon>
          </a>
        </b-table-column>
      </b-table>
    </div>
  </section>
</template>
<script>
import pDebounce from 'p-debounce'

export default {
  props: {
    getKnowledgeAreaId: { type: Function, required: true }
  },
  data() {
    return {
      activeTab: 0,
      filterText: '',
      knowledgeAreasData: [],
      isPaginationSimple: true,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      defaultSortDirection: 'asc',
      total: 20,
      page: 1,
      perPage: 10,
      loading: false,
      searchMode: false
    }
  },
  created() {
    this.getKnowledgeAreasData()
    this.getKnowledgeAreaDataCount()
  },
  mounted() {
    this.$root.$on('knowledge_area_added', () => {
      this.getKnowledgeAreasData()
      // console.log('data fetched')
    })
    this.$root.$on('knowledge_area_edited', () => {
      this.getKnowledgeAreasData()
      // console.log('data fetched')
    })
  },
  methods: {
    getKnAreas: pDebounce(function(term) {
      if (!this.filterText) {
        this.searchMode = false
        this.getKnowledgeAreasData()
        this.getKnowledgeAreaDataCount()
      } else {
        this.searchMode = true
      }

      if (!term.length) {
        this.knAreas = []
        return
      }
      if (term !== this.knAreaPreviousSearch) {
        this.knAreaPreviousSearch = term

        // check if term is a cdd code or if it is a description
        if (this.hasNumber(term)) {
          this.loading = true
          this.$axios
            .get('/api/knowledgeAreas', {
              params: {
                code: term
              }
            })
            .then(response => {
              this.knowledgeAreasData = response.data
              this.total = this.knowledgeAreasData.length
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
            .finally(() => (this.loading = false))
        } else {
          this.loading = true
          this.$axios
            .get('/api/knowledgeAreas', {
              params: {
                description: term
              }
            })
            .then(response => {
              this.knowledgeAreasData = response.data
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
            .finally(() => (this.loading = false))

          this.searchMode = false
        }
      }
      // this.searchMode = false
    }, 500),
    hasNumber(term) {
      return /\d/.test(term)
    },
    onPageChange(page) {
      this.page = page
      if (!this.searchMode) {
        this.getKnowledgeAreasData()
      }
    },
    getKnowledgeAreaDataCount() {
      this.$axios
        .get('/api/knowledgeAreas')
        .then(response => {
          this.total = response.data.length
        })
        .catch(error => console.log(error))
    },
    getKnowledgeAreasData() {
      this.loading = true
      this.$axios
        .get('/api/knowledgeAreas', {
          params: {
            page: this.page,
            size: 10 // get next page
          }
        })
        .then(response => {
          this.knowledgeAreasData = response.data
          this.loading = false
          this.searchMode = false
        })
        .catch(error => {
          this.knowledgeAreasData = error.data
          this.loading = false
          this.searchMode = false
        })
    },
    editKnowledgeArea(id) {
      this.$props.getKnowledgeAreaId(id)
      this.$emit('editClicked')
    },
    deleteKnowledgeArea(id) {
      this.$axios
        .delete(`/api/knowledgeAreas/${id}`)
        .then(() => {
          // console.log('Knowledge area deleted!')

          this.$buefy.snackbar.open('Área do conhecimento removida!')

          this.getKnowledgeAreasData()
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped></style>
