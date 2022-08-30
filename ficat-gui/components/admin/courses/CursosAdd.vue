<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Adicionar curso</p>
        <button @click="$emit('close')" type="button" class="delete" />
      </header>
      <section class="modal-card-body">
        <b-field class="name-input" label="Nome do curso/programa">
          <b-input
            v-model.lazy="$v.formFields.courseName.$model"
            placeholder="Ex.: Faculdade de enfermagem"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.courseName.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.courseName.minLength" class="error">
            Campo 'nome' deve ter no minimo
            {{ $v.formFields.courseName.$params.minLength.min }} letras.
          </span>
        </p>

        <!-- PROGRAMA -->
        <b-field label="Programa">
          <b-input
            v-model.lazy="$v.formFields.courseProgram.$model"
            placeholder="Ex.: FAENF"
            type="text"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.courseProgram.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.courseProgram.minLength" class="error">
            Campo 'programa' deve ter no minimo
            {{ $v.formFields.courseProgram.$params.minLength.min }} letras.
          </span>
        </p>

        <b-field label="Unidade academica">
          <b-input
            v-model="formFields.courseUnity"
            type="text"
            placeholder="Ex.: ICS"
          >
          </b-input>
        </b-field>
        <p v-if="formHasErrors" class="errors">
          <span v-if="!$v.formFields.courseUnity.required" class="error">
            Campo obrigatório
          </span>
          <span v-if="!$v.formFields.courseUnity.minLength" class="error">
            Campo 'programa' deve ter no minimo
            {{ $v.formFields.courseUnity.$params.minLength.min }} letras.
          </span>
        </p>

        <b-field label="Tipo do curso">
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
        </b-field>
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
        courseName: '',
        courseProgram: '',
        courseUnityId: '',
        courseType: 'graduação'
      },
      courseTypes: ['graduação', 'especialização', 'mestrado', 'doutorado'],

      isPostSuccess: false,
      formHasErrors: false
    }
  },

  validations: {
    formFields: {
      courseName: {
        required,
        minLength: minLength(7)
      },
      courseProgram: {
        required,
        minLength: minLength(3)
      },
      courseUnity: {
        required,
        minLength: minLength(2)
      },
      courseType: {
        required
      }
    }
  },

  methods: {
    submitForm() {
      if (this.$v.formFields.$invalid === false) {
        this.addCourse()
        this.uiState = 'form submitted'
        this.formHasErrors = false
      } else {
        this.formHasErrors = true
      }
    },
    snackbar(succeded) {
      if (succeded) {
        this.$buefy.snackbar.open(`Curso adicionado com sucesso!`)
      } else {
        this.$buefy.snackbar.open(`Adição de curso falhou.`)
      }
    },
    sendMessage() {
      this.$root.$emit('course_added')
    },
    addCourse() {
      this.$axios
        .post('/api/courses', {
          name: this.formFields.courseName,
          program: this.formFields.courseProgram,
          type: this.formFields.courseType,
          unityAcronym: this.formFields.courseUnity
        })
        .then(response => {
          // console.log('Data posted!')
          this.isPostSuccess = true
          this.snackbar(true)
          this.sendMessage()
          this.$emit('close')
        })
        .catch(error => {
          this.courseData = error.data
          this.isPostSuccess = false
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
  margin-top: 1rem;
  margin-bottom: 0.75rem;
}

.error {
  font-size: 0.9rem;
  color: red;
  margin-bottom: 0.75rem;
}
</style>
