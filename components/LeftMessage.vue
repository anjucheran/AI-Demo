<template>
<div class="bro">
	<div class="speech-bubble"><p>{{ message }}</p></div>
</div>
</template>

<script>
export default {
    props: [
        'message'
    ]
}
</script>

<style scoped>
.speech-bubble {
	position: relative;
	background: #9fe7f6;
	border-radius: .4em;
	padding: 3vh 3vh;
	margin: 1vh 4vh;
	text-align: left;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 1.5vh solid transparent;
	border-right-color: #9fe7f6;
	border-left: 0;
	border-bottom: 0;
	margin-top: -0.75vh;
	margin-left: -1.5vh;
}

.bro {
	float: left;
	clear: both;
	max-width: 75%;
}
</style>

