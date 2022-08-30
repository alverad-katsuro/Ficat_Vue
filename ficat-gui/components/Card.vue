<template>
  <div class="column">
    <div class="card rounded">
      <template v-if="title">
        <header class="card-header">
          <p class="card-header-title has-text-grey-dark">
            {{ title }}
          </p>
        </header>
      </template>
      <div class="card-content">
        <div class="content has-text-centered">
          <span>
            <slot />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.card {
  overflow: unset;
}

.rounded {
  border-radius: 10px;
}
</style>
