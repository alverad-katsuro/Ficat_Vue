<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar unidade acadêmica</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field class="name-input" label="Nome">
          <b-input
            v-model="$v.formFields.name.$model"
            placeholder="Ex.: Instituto de Tecnologia"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.name.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.name.minLength" class="error">
            Campo 'nome' deve ter no minimo
            {{ $v.formFields.name.$params.minLength.min }} letras.
          </span>
        </p>

        <!-- ACRONIMO-->
        <b-field label="Acrônimo">
          <b-input
            v-model="$v.formFields.acronym.$model"
            placeholder="Ex.: ITEC"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.acronym.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.acronym.minLength" class="error">
            Campo 'acrônimo' deve ter no minimo
            {{ $v.formFields.acronym.$params.minLength.min }} letras.
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
        name: '',
        acronym: ''
      },

      isPostSuccess: false,
      formHasErrors: false
    }
  },

  validations: {
    formFields: {
      name: {
        required,
        minLength: minLength(3)
      },
      acronym: {
        required,
        minLength: minLength(2)
      }
    }
  },

  methods: {
    submitForm() {
      this.uiState = 'submit clicked'
      if (this.$v.formFields.$invalid === false) {
        this.addAcademicUnity()
        this.uiState = 'form submitted'
        this.formHasErrors = false
      } else {
        this.formHasErrors = true
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open(`Unidade acadêmica adicionada com sucesso!`)
      } else {
        this.$buefy.snackbar.open(`Adição de unidade acadêmica falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('academic_unity_added')
    },
    addAcademicUnity() {
      this.$axios
        .post('/api/academicUnities', {
          name: this.formFields.name,
          acronym: this.formFields.acronym
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
