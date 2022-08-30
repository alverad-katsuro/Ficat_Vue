<template>
  <div>
    <b-image
      :src="require('@/assets/img/ficat-logo.png')"
      alt="Logo do Ficat"
      class="app-logo"
    ></b-image>
    <Steps class="steps" />
  </div>
</template>

<script>
import { persist } from '~/front/persistence'
import Steps from '~/components/Steps'

export default {
  components: {
    Steps
  },

  created() {
    persist('form', {})
  }
}
</script>

<style scoped>
.bodyClass,
.htmlClass {
  overflow-y: hidden;
}

.app-logo {
  width: 14rem;
  margin: 3em auto 2em;
}

.steps {
  width: 80%;
  margin: 0 auto;
}

@media screen and (max-width: 480px) {
  .steps {
    width: 100%;
  }
}
</style>

<!-- muda cor do placeholder no escopo global -->
<style>
.input::placeholder {
  color: black;
  opacity: 0.3;
}

a.dropdown-item {
  text-align: left;
}

.btn {
  flex: 0 1 auto;
  margin: 0 0.3em;
  border-radius: 50%;
}

@media screen and (max-width: 900px) {
  .section {
    padding: 0;
  }
  .app-logo {
    width: 12rem;
  }
}
</style>
