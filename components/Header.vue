<template>
<div>
    <h6>{{title}}</h6>
</div>
</template>

<script>
export default {
  data() {
    return {
        title: 'AI Demo'
    };
  }
};
</script>

<style scoped>
h6 {
    padding: 1rem 0;
    text-align: center;
    font-size: 2.5vh;
    background: linear-gradient(to bottom right, rgba(57,221,240,1), rgba(148,196,249,1));
    color: aliceblue;
}
</style>
