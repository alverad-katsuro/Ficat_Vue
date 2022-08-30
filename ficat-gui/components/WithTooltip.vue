<template>
  <b-tooltip
    :label="text"
    :active="!!text"
    :triggers="['hover', 'focus']"
    :size="text.length > 50 ? 'is-large' : 'is-small'"
    class="with-tooltip"
    type="is-ficat"
    multilined
  >
    <slot></slot>
  </b-tooltip>
</template>

<script>
export default {
  name: 'WithTooltip',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  methods: {}
}
</script>

<style>
.b-tooltip.is-multiline .tooltip-content {
  font-size: 0.9rem;
}
.with-tooltip {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  margin: 1em 0;
}
</style>
