<template>
<div class="bro">
	<div class="cortana">
    <div id="wave">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
	</div>
</div>

</template>

<style lang="scss" scoped>
div#wave {
  position: relative;
  text-align: center;
  width: 7vh;
  height: 7vh;
  .dot {
    display: inline-block;
    width: 1vh;
    height: 1vh;
    border-radius: 0.5vh;
    margin-right: 0.3vh;
    margin-left: 0.3vh;
    margin-top: 2.8vh;
    background: white;
    animation: wave 1s linear infinite;

    &:nth-child(2) {
      animation-delay: -0.8s;
    }

    &:nth-child(3) {
      animation-delay: -0.6s;
    }
  }
}

@keyframes wave {
  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-1vh);
  }
}

@keyframes cortana {
  0% {
    box-shadow: 0 0 0 0.8vh #bcecfc, 0 0 0 3.2vh #99e1f9;
  }
  
  100% {
    box-shadow: 0 0 0 1.2vh #bcecfc, 0 0 0 2vh #99e1f9;
  }
}

.cortana {
  width:7vh;
  height:7vh;
  border-radius:50%;
  box-shadow: 0 0 0 0.93vh #bcecfc, 0 0 0 3.2vh #99e1f9;
  animation: cortana 0.5s infinite ease-in-out alternate;
  background-color: #56c6f9;
}

.bro {
	width: 7vh;
  height: 7vh;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
</style>
