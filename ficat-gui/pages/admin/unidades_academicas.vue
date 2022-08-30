<template>
  <section>
    <div>
      <academic-unity-header
        @addAcademicUnityClicked="showAddModal"
      ></academic-unity-header>
      <b-modal v-model="isAddModalActive">
        <template #default="props">
          <academic-unity-add @close="props.close"></academic-unity-add>
        </template>
      </b-modal>
      <b-modal v-model="isEditModalActive">
        <template #default="props">
          <academic-unity-update
            :id="academicUnityEditedId"
            @close="props.close"
          ></academic-unity-update>
        </template>
      </b-modal>
      <academic-unity-table
        :getAcademicUnityId="getAcademicUnityId"
        @editClicked="showEditModal"
        class="app-table"
      ></academic-unity-table>
    </div>
  </section>
</template>
<script>
import AcademicUnityHeader from '../../components/admin/academic_unities/AcademicUnityHeader'
import AcademicUnityTable from '../../components/admin/academic_unities/AcademicUnityTable'
import AcademicUnityAdd from '../../components/admin/academic_unities/AcademicUnityAdd'
import AcademicUnityUpdate from '../../components/admin/academic_unities/AcademicUnityUpdate'

export default {
  layout: 'adminLayout',
  components: {
    'academic-unity-header': AcademicUnityHeader,
    'academic-unity-table': AcademicUnityTable,
    'academic-unity-add': AcademicUnityAdd,
    'academic-unity-update': AcademicUnityUpdate
  },
  data() {
    return {
      isAddModalActive: false,
      isEditModalActive: false,
      academicUnityEditedId: 1
    }
  },
  methods: {
    showAddModal() {
      this.isAddModalActive = true
    },
    showEditModal() {
      this.isEditModalActive = true
    },
    getAcademicUnityId(idFromTable) {
      this.academicUnityEditedId = idFromTable
    }
  }
}
</script>
<style scoped>
.app-table {
  margin: 5%;
}
</style>
