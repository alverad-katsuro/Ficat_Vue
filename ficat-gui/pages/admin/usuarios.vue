<template>
  <div>
    <users-header @addUserClicked="showAddModal"></users-header>
    <b-modal v-model="isAddModalActive">
      <template #default="props">
        <users-add @close="props.close"></users-add>
      </template>
    </b-modal>
    <b-modal v-model="isEditModalActive">
      <template #default="props">
        <users-update :id="userEditedId" @close="props.close"></users-update>
      </template>
    </b-modal>
    <users-table
      :getUserId="getUserId"
      @editClicked="showEditModal"
      class="app-table"
    ></users-table>
  </div>
</template>
<script>
import UsersHeader from '../../components/admin/users/UsersHeader'
import UsersTable from '../../components/admin/users/UsersTable'
import UsersAdd from '../../components/admin/users/UsersAdd'
import UsersUpdate from '../../components/admin/users/UsersUpdate'

export default {
  layout: 'adminLayout',
  components: {
    'users-header': UsersHeader,
    'users-table': UsersTable,
    'users-add': UsersAdd,
    'users-update': UsersUpdate
  },
  data() {
    return {
      isAddModalActive: false,
      isEditModalActive: false,
      userEditedId: 1
    }
  },
  methods: {
    showAddModal() {
      this.isAddModalActive = true
    },
    showEditModal() {
      this.isEditModalActive = true
    },
    getUserId(idFromTable) {
      this.userEditedId = idFromTable
    }
  }
}
</script>
<style scoped>
.app-table {
  margin: 5%;
}
</style>
