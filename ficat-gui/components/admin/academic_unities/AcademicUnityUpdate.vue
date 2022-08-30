<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar unidade acadêmica</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field class="name-input" label="Nome">
          <b-input
            v-model.lazy="$v.formFields.name.$model"
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
            v-model.lazy="$v.formFields.acronym.$model"
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
        <b-button @click="submitForm" label="Atualizar" type="is-primary" />
      </footer>
    </div>
  </form>
</template>
<script>
const { required, minLength } = require('vuelidate/lib/validators')

export default {
  props: { id: { type: Number, required: true } },
  data() {
    return {
      formFields: {
        name: '',
        acronym: ''
      },
      originalData: {},

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

  beforeMount() {
    this.$axios
      .get(`/api/academicUnities/${this.$props.id}`)
      .then(response => {
        this.formFields.name = response.data.name
        this.formFields.acronym = response.data.acronym
      })
      .catch(error => console.log(error))
  },

  methods: {
    submitForm() {
      if (this.$v.formFields.$invalid === false) {
        this.uiState = 'form submitted'
        this.$axios
          .put(`/api/academicUnities/${this.$props.id}`, {
            name: this.formFields.name,
            acronym: this.formFields.acronym
          })
          .then(response => {
            this.snackbar(true)
            this.sendMessage()
            this.$emit('close')
          })
          .catch(() => {
            this.snackbar(false)
          })
      } else {
        this.formHasErrors = true
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open('Unidade acadêmica atualizada com sucesso!')
      } else {
        this.$buefy.snackbar.open(`Edição de unidade acadêmica falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('academic_unity_edited')
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
