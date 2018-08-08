<template>
<div class="bro">
	<div class="cortana">
    <img id="mic" :src="image" alt="">
	</div>
</div>

</template>

<script>
export default {
  props: [
    'image'
  ]
}
</script>


<style scoped>
@keyframes cortana {
  0% {
    box-shadow: 0 0 0 0.8vh #bcecfc, 0 0 0 1.6vh #99e1f9;
  }
  
  100% {
    box-shadow: 0 0 0 1.1vh #bcecfc, 0 0 0 1.6vh #99e1f9;
  }
}

.cortana {
  width:7vh; /* 6vh */
  height:7vh;
  border-radius:50%;
  box-shadow: 0 0 0 0.93vh #bcecfc, 0 0 0 1.87vh #99e1f9;
  animation: cortana 0.8s infinite ease-in-out alternate;
  background-color: #56c6f9;
}

.bro {
	width: 7vh;
  height: 7vh;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

#mic {
  width: 5vh;
  margin-top: 11%;
}
</style>
