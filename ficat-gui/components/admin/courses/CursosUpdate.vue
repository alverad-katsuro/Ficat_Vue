<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Editar curso</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <!-- NOME DO CURSO -->
        <b-field class="name-input" label="Nome do curso/programa">
          <b-input
            v-model.lazy="$v.formFields.name.$model"
            placeholder="Ex.: Faculdade de enfermagem"
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
            {{ $v.name.$params.minLength.min }} letras.
          </span>
        </p>

        <!-- PROGRAMA -->
        <b-field label="Programa">
          <b-input
            v-model.lazy="$v.formFields.program.$model"
            placeholder="Ex.: PPGCF"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.program.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.program.minLength" class="error">
            Campo 'programa' deve ter no minimo
            {{ $v.name.$params.minLength.min }} letras.
          </span>
        </p>

        <b-field label="Unidade academica">
          <b-input
            v-model="formFields.unityAcronym"
            type="text"
            placeholder="Ex.: ICJ"
          >
          </b-input>
        </b-field>
        <!-- <b-field label="Tipo do curso">
          <b-select
            v-model="$v.formFields.courseType.$model"
            placeholder="Selecione"
          >
            <option :value="courseTypes[0]">
              Graduação
            </option>
            <option :value="courseTypes[1]">
              Especialização
            </option>
            <option :value="courseTypes[2]">
              Mestrado
            </option>
            <option :value="courseTypes[3]">
              Doutorado
            </option>
          </b-select>
        </b-field> -->
      </section>
      <footer class="modal-card-foot">
        <b-button @click="$emit('close')" label="Fechar janela" />
        <b-button @click="submitForm" label="Atualizar" type="is-ficat" />
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
        program: '',
        unityAcronym: ''
      },
      originalData: {},
      courseTypes: ['graduação', 'especialização', 'mestrado', 'doutorado'],

      isPostSuccess: false,
      formHasErrors: false
    }
  },

  validations: {
    formFields: {
      name: {
        required,
        minLength: minLength(7)
      },
      program: {
        required,
        minLength: minLength(2)
      },
      unityAcronym: {
        required,
        minLength: minLength(2)
      }
    }
  },

  beforeMount() {
    this.$axios
      .get(`/api/courses/${this.$props.id}`)
      .then(response => {
        this.formFields.name = response.data.name
        this.formFields.program = response.data.program
        this.formFields.unityAcronym = response.data.unityAcronym
      })
      .catch(error => console.log(error))
  },

  methods: {
    submitForm() {
      if (this.$v.formFields.$invalid === false) {
        this.uiState = 'form submitted'
        this.$axios
          .patch(`/api/courses/${this.$props.id}`, {
            name: this.formFields.name,
            program: this.formFields.program,
            unityAcronym: this.formFields.unityAcronym
          })
          .then(response => {
            this.snackbar(true)
            this.sendMessage()
            this.$emit('close')
          })
          .catch(() => {
            this.snackbar(false)
          })
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open(`Curso atualizado com sucesso!`)
      } else {
        this.$buefy.snackbar.open(`Edição do curso falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('course_edited')
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
