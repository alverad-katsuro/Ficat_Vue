<template>
  <section class="hero has-background-grey-light is-fullheight">
    <Card class="app-center"
      ><form @submit.prevent="onSubmit">
        <section class="section">
          <div class="centered-image">
            <figure class="ficat-logo is-inline-block">
              <img src="@/assets/img/ficat-logo.png" alt="FICAT Logo" />
              <!-- <h1>FICAT</h1> -->
            </figure>
          </div>
          <input-validation
            v-model="$v.username.$model"
            :validations="$options.validations.username"
            :v="$v"
            label="Username"
            field-name="username"
          >
            <template #required>
              Nome de usuário é obrigatório
            </template>
            <template #minLength="{ min }">
              Nome de usuário deve possuir no mínimo {{ min }} carac.
            </template>
          </input-validation>
          <input-validation
            v-model="$v.password.$model"
            :validations="$options.validations.password"
            :v="$v"
            :options="{
              expanded: true,
              passwordReveal: true
            }"
            label="Password"
            field-name="password"
            type="password"
          >
            <template #required>
              Senha é obrigatória
            </template>
            <template #minLength="{ min }">
              Senha deve possuir no mínimo {{ min }} carac.
            </template>
          </input-validation>
          <div class="level">
            <div class="level-left"></div>
            <div class="field level-right">
              <b-checkbox v-model="rememberMe" class="is-small">
                Lembrar de mim
              </b-checkbox>
            </div>
          </div>
          <b-button class="is-primary" native-type="submit">Login</b-button>
        </section>
      </form>
    </Card>
  </section>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import Card from '@/components/Card'
import InputValidation from '@/components/InputValidation.js'

export default {
  name: 'Login',
  layout: 'empty',

  components: {
    Card,
    InputValidation
  },

  data() {
    return {
      username: '',
      password: '',
      rememberMe: false
    }
  },

  methods: {
    onSubmit() {
      // eslint-disable-next-line no-debugger
      // debugger
      this.$axios
        .post('/api/auth', {
          username: this.username,
          password: this.password,
          rememberMe: this.rememberMe
        })
        .then(response => {
          this.$store.dispatch('auth/login', {
            username: this.username,
            xsrfToken: this.$cookies.get('xsrfToken', { withCredentials: true })
          })

          const to = this.$route.query.to
            ? atob(this.$route.query.to)
            : '/admin/cursos'
          this.$router.push(to)
        })
    }
  },

  validations: {
    username: {
      required,
      minLength: minLength(5)
    },
    password: {
      required,
      minLength: minLength(5)
    }
  }
}
</script>

<style scoped>
.teste {
  width: 100%;
  margin: auto;
}

.app-center {
  margin: 0;
  position: absolute;
  left: 32%;
  top: 50%;
  transform: translateY(-50%);
  transform: translateY(-50%);
}

.mb {
  margin-bottom: 2.1em;
}

.centered-image {
  margin: 10px auto;
}

.ficat-logo {
  width: 11rem;
  margin-bottom: 0.8em;
}
</style>
