<template>
  <section>
    <div>
      <cursos-header @addCourseClicked="test"></cursos-header>
      <b-modal v-model="isComponentModalActive">
        <template #default="props">
          <cursos-add @close="props.close"></cursos-add>
        </template>
      </b-modal>
      <b-modal v-model="isEditModalActive">
        <template #default="props">
          <cursos-update
            :id="courseEditedId"
            @close="props.close"
          ></cursos-update>
        </template>
      </b-modal>
      <cursos-table
        :getCourseId="getCourseId"
        @editClicked="showEditModal"
        class="cursos-table"
      ></cursos-table>
    </div>
  </section>
</template>
<script>
import CursosHeader from '../../components/admin/courses/CursosHeader'
// import CursosSearchbar from '../../components/admin/CursosSearchbar.vue'
import CursosTable from '../../components/admin/courses/CursosTable'
import CursosAdd from '../../components/admin/courses/CursosAdd'
import CursosUpdate from '../../components/admin/courses/CursosUpdate'

export default {
  layout: 'adminLayout',
  components: {
    'cursos-header': CursosHeader,
    // 'cursos-searchbar': CursosSearchbar,
    'cursos-table': CursosTable,
    'cursos-add': CursosAdd,
    'cursos-update': CursosUpdate
  },

  data() {
    return {
      isComponentModalActive: false,
      isEditModalActive: false,
      courseEditedId: 1
    }
  },

  methods: {
    test() {
      this.isComponentModalActive = true
    },
    showEditModal() {
      this.isEditModalActive = true
    },
    getCourseId(idFromTable) {
      this.courseEditedId = idFromTable
    }
  }
}
</script>

<style scoped>
.cursos-searchbar {
  margin: 2%;
}

.cursos-table {
  margin: 5%;
}
</style>
