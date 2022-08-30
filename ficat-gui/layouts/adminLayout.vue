<template>
  <div class="app-sidebar-page">
    <div class="app-sidebar">
      <b-sidebar :fullheight="true" position="static" type="is-light" open>
        <div class="p-1">
          <!-- <div class="block">
            <img
              src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
              alt="Lightweight UI components for Vue.js based on Bulma"
            />
          </div> -->
          <b-menu class="app-menu">
            <!-- <b-menu-list label="Navegação">
              <b-menu-item
                icon="home"
                label="Inicio"
                tag="nuxt-link"
                to="/admin"
              ></b-menu-item>
            </b-menu-list> -->
            <b-menu-list label="Menu">
              <b-menu-item
                icon="label"
                label="Cursos"
                tag="nuxt-link"
                to="/admin/cursos"
              >
              </b-menu-item>
              <b-menu-item
                icon="label"
                label="Áreas de conhecimento"
                tag="nuxt-link"
                to="/admin/areas_do_conhecimento"
              >
              </b-menu-item>
              <b-menu-item
                icon="label"
                label="Unidades academicas"
                tag="nuxt-link"
                to="/admin/unidades_academicas"
              ></b-menu-item>
              <b-menu-item
                icon="account"
                label="Usuários"
                tag="nuxt-link"
                to="/admin/usuarios"
                ><b-icon></b-icon
              ></b-menu-item>
              <b-menu-item
                icon="chart-bar"
                label="Estatísticas"
                tag="nuxt-link"
                to="/statistics"
                ><b-icon></b-icon
              ></b-menu-item>
              <b-menu-item
                icon="logout"
                label="Sair"
                tag="nuxt-link"
                to="/"
              ></b-menu-item>
            </b-menu-list>

            <!-- <b-menu-list label="Actions">
              <b-menu-item icon="logout" label="Logout"></b-menu-item>
            </b-menu-list> -->
          </b-menu>
        </div>
      </b-sidebar>
    </div>
    <div class="app-content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coursesActive: true
    }
  }
}
</script>

<style>
html,
body {
  /* ensure the available document space is the full height of the viewport */
  height: 100%;
  padding: 0;
  margin: 0;
}

#__nuxt,
#__layout {
  height: 100%;
}

.b-sidebar {
  height: 100%;
}

.app-sidebar-page {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100%;
}
.app-sidebar {
  float: left;
  height: 100%;
}

.app-menu li {
  margin: 2% 0;
}

.app-content {
  float: right;
}

.p-1 {
  padding: 1em;
}

.app-menu a.nuxt-link-exact-active {
  background-color: #444352;
  color: white;
}

.app-menu a.nuxt-link-exact-active:hover {
  background-color: #444352;
  color: white;
}

.app-content {
  width: 100%;
}
</style>
