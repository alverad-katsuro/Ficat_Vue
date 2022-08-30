<template>
  <div>
    <b-navbar
      :transparent="true"
      :centered="true"
      class="bg-dark navbar is-fixed-top app-navbar"
    >
      <template #brand>
        <b-navbar-item :to="{ path: '/' }" tag="router-link">
          <img
            :src="require('@/assets/img/ficat-logo-white.png')"
            alt="Logo FICAT"
            class="logo-white"
          />
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item
          v-for="(path, key) in paths"
          :key="key"
          :to="key"
          tag="nuxt-link"
          class="text-white"
        >
          {{ path.toUpperCase() }}
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item
          class="text-white"
          tag="nuxt-link"
          to="/login"
          aria-label="Botão para acesso do administrador"
          >ADMIN</b-navbar-item
        >
        <b-navbar-item tag="div">
          <b-navbar-item
            @keypress.enter="setLang('pt')"
            @click="setLang('pt')"
            :class="{ selectedClass: isSelected, 'text-white': true }"
            role="button"
            tabindex="0"
            aria-label="Botão trocar para Português"
          >
            PT
          </b-navbar-item>
          <div class="vl"></div>
          <b-navbar-item
            @keypress.enter="setLang('en')"
            @click="setLang('en')"
            :class="{ selectedClass: !isSelected, 'text-white': true }"
            role="button"
            tabindex="0"
            aria-label="Botão trocar para Inglês"
          >
            EN
          </b-navbar-item>
        </b-navbar-item>
      </template>
    </b-navbar>

    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      mobileDevice: false,
      isSelected: true,
      selectedLanguage: 'pt'
    }
  },
  computed: {
    ...mapState({
      lang: state => state.lang.lang
    }),

    paths() {
      return {
        about: this.$tr('layout.about'),
        talk: this.$tr('layout.talkToUs'),
        tutorial: this.$tr('layout.tutorial')
      }
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: 'has-navbar-fixed-top'
      }
    }
  },

  mounted() {},

  methods: {
    setLang(langKey) {
      this.$store.dispatch('lang/change', langKey)
      if (this.selectedLanguage !== langKey) {
        this.isSelected = !this.isSelected
        this.selectedLanguage = langKey
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/_all';

// Set your colors

$ficat-red: #ffffff;
$ficat: #444352;
$ficat-invert: findColorInvert($ficat);

// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
  (
    'ficat': (
      $ficat,
      $ficat-invert
    )
  ),
  $custom-colors
);

// Links
$link: $ficat-red;
// $link-invert: $primary-invert;
// $link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>

<style scoped>
/* .test {
  color: white;
} */

.container {
  margin-top: 20px;
}

@font-face {
  font-family: 'Atlantic Cruise';
  src: url('~assets/fonts/Atlantic_Cruise-Medium.ttf') format('truetype');
}

.logo-white {
  width: 3.4em;
}

.text-white {
  color: white;
  font-family: 'Atlantic Cruise', sans-serif;
  font-size: 1.5rem;
}

a.nuxt-link-exact-active {
  color: #ffffff;
}

a.nuxt-link-active {
  color: #ffffff;
}

.selectedClass {
  text-decoration: underline;
}

.app-navbar {
  background-color: #444352;
  border-bottom: 2px solid #a54b4b;
}

.vl {
  border-left: 2px solid rgb(247, 217, 217);
  height: 1em;
}

@media screen and (max-width: 1024px) {
  .vl {
    border-left: 0;
    height: 2px;
    border-bottom: 1px solid lightgrey;
  }
}
</style>
