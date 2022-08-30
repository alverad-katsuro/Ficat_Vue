<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar área de conhecimento</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field class="cdd-input" label="CDD">
          <b-input
            v-model.lazy="$v.formFields.cdd.$model"
            placeholder="Ex.: 001"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.cdd.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.cdd.minLength" class="error">
            Campo 'cdd' deve ter no minimo
            {{ $v.formFields.cdd.$params.minLength.min }} letras.
          </span>
        </p>

        <!-- DESCRICAO-->
        <b-field label="Descrição">
          <b-input
            v-model.lazy="$v.formFields.description.$model"
            placeholder="Ex.: Conhecimento / Teoria"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.description.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.description.minLength" class="error">
            Campo 'programa' deve ter no minimo
            {{ $v.formFields.description.$params.minLength.min }} letras.
          </span>
        </p>
      </section>
      <footer class="modal-card-foot">
        <b-button @click="$emit('close')" label="Fechar janela" />
        <b-button @click="submitForm" label="Adicionar" type="is-ficat" />
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
        cdd: '',
        description: ''
      },

      isPostSuccess: false,
      formHasErrors: false
    }
  },

  validations: {
    formFields: {
      cdd: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      }
    }
  },

  methods: {
    submitForm() {
      if (this.$v.formFields.$invalid === false) {
        this.addKnowledgeArea()
        this.uiState = 'form submitted'
        this.formHasErrors = false
      } else {
        this.formHasErrors = true
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open(
          `Área de conhecimento adicionada com sucesso!`
        )
      } else {
        this.$buefy.snackbar.open(`Adição de área de conhecimento falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('knowledge_area_added')
    },
    addKnowledgeArea() {
      this.$axios
        .post('/api/knowledgeAreas', {
          code: this.formFields.cdd,
          description: this.formFields.description
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
