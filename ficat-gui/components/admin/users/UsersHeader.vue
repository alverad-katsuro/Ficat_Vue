<template>
  <b-navbar
    :shadow="true"
    class="

    app-navbar"
  >
    <template #brand>
      <b-navbar-item class="app-navbar-brand">
        <h1 class="knowledge-areas-title">Usuários</h1>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a @click="addClicked" class="button is-primary">
            Adicionar novo
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>
<script>
export default {
  components: {},

  data() {
    return {
      //   isComponentModalActive: false
    }
  },

  methods: {
    addClicked() {
      this.$emit('addUserClicked')
    }
  }
}
</script>
<style scoped>
.app-navbar {
  padding: 2%;
  box-shadow: 0px 2px 0px 0px #cdcdcd;
}
.app-navbar-brand {
  margin-left: 7%;
}

.app-navbar-brand-icon {
  margin-right: 2px;
}

.knowledge-areas-title {
  font-size: 1.5em;
}
</style>
