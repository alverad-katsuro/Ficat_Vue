<template>
  <div class="admin-homepage"></div>
</template>
<script>
export default {
  layout: 'adminLayout'
}
</script>
<style scoped>
#__nuxt {
  height: 100%;
}

.admin-homepage {
  height: 100%;
  width: 100%;
  background-color: #eff2f1;
}

.stat-row {
  display: flex;
  justify-content: space-around;
}

.stat-card {
  background-color: #252422;
  height: 7.5em;
  width: 18%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.stat-card h2,
p {
  color: #eff2f1;
}

.stat-card h2 {
  font-size: 2.5em;
}

.stat-card p {
  font-size: 0.8em;
  /* font-weight: bold; */
}
</style>
