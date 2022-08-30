<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar usuário</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field class="username-input" label="Usuário">
          <b-input v-model.lazy="$v.formFields.username.$model" type="text">
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.username.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.username.minLength" class="error">
            Campo 'usuário' deve ter no minimo
            {{ $v.formFields.username.$params.minLength.min }} letras.
          </span>
        </p>

        <!-- SENHA -->
        <b-field label="Senha">
          <b-input
            v-model.lazy="$v.formFields.password.$model"
            type="password"
            password-reveal
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.password.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.password.minLength" class="error">
            Campo 'Senha' deve ter no minimo
            {{ $v.formFields.password.$params.minLength.min }} letras.
          </span>
        </p>
      </section>
      <footer class="modal-card-foot">
        <b-button @click="$emit('close')" label="Fechar janela" />
        <b-button @click="submitForm" label="Adicionar" type="is-primary" />
      </footer>
    </div>
  </form>
</template>
<script>
const { required, minLength } = require('vuelidate/lib/validators')

export default {
  data() {
    return {
      formFields: {
        username: '',
        password: ''
      },

      isPostSuccess: false,
      formHasErrors: false
    }
  },

  validations: {
    formFields: {
      username: {
        required,
        minLength: minLength(5)
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  },

  methods: {
    submitForm() {
      if (this.$v.formFields.$invalid === false) {
        this.addUser()
        this.uiState = 'form submitted'
        this.formHasErrors = false
      } else {
        this.formHasErrors = true
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open(`Usuário adicionado com sucesso!`)
      } else {
        this.$buefy.snackbar.open(`Adição de usuário falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('user_added')
    },
    addUser() {
      this.$axios
        .post('/api/users', {
          username: this.formFields.username,
          password: this.formFields.password,
          active: 1
        })
        .then(response => {
          // console.log('Data posted!')
          this.isPostSuccess = true
          this.snackbar(true)
          this.sendMessage()
          this.$emit('close')
        })
        .catch(error => {
          this.isPostSuccess = false
          console.log(error)
          this.snackbar(false)
        })
    }
  }
}
</script>
<style scoped>
.field {
  margin-bottom: 0;
}

.errors {
  margin-bottom: 0.75rem;
}

.error {
  font-size: 0.9rem;
  color: red;
  margin-bottom: 0.75rem;
}
</style>
