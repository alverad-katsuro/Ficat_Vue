<template>
  <section>
    <div>
      <knowledge-areas-header
        @addKnowledgeAreaClicked="showAddModal"
      ></knowledge-areas-header>
      <b-modal v-model="isAddModalActive">
        <template #default="props">
          <knowledge-areas-add @close="props.close"></knowledge-areas-add>
        </template>
      </b-modal>
      <b-modal v-model="isEditModalActive">
        <template #default="props">
          <knowledge-areas-update
            :id="knowledgeAreaEditedId"
            @close="props.close"
          ></knowledge-areas-update>
        </template>
      </b-modal>
      <knowledge-areas-table
        :getKnowledgeAreaId="getKnowledgeAreaId"
        @editClicked="showEditModal"
        class="app-table"
      ></knowledge-areas-table>
    </div>
  </section>
</template>

<script>
import KnowledgeAreasHeader from '../../components/admin/knowledge_areas/KnowledgeAreasHeader'
import KnowledgeAreasTable from '../../components/admin/knowledge_areas/KnowledgeAreasTable'
import KnowledgeAreasAdd from '../../components/admin/knowledge_areas/KnowledgeAreasAdd'
import KnowledgeAreasUpdate from '../../components/admin/knowledge_areas/KnowledgeAreasUpdate'

export default {
  layout: 'adminLayout',
  components: {
    'knowledge-areas-header': KnowledgeAreasHeader,
    'knowledge-areas-table': KnowledgeAreasTable,
    'knowledge-areas-add': KnowledgeAreasAdd,
    'knowledge-areas-update': KnowledgeAreasUpdate
  },
  data() {
    return {
      isAddModalActive: false,
      isEditModalActive: false,
      knowledgeAreaEditedId: 1
    }
  },

  methods: {
    showAddModal() {
      this.isAddModalActive = true
    },

    showEditModal() {
      this.isEditModalActive = true
    },

    getKnowledgeAreaId(idFromTable) {
      this.knowledgeAreaEditedId = idFromTable
    }
  }
}
</script>

<style scoped>
.app-table {
  margin: 5%;
}
</style>
