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
	background: #b7f1c6;
	border-radius: .4em;
	padding: 3vh 3vh;
	margin: 1vh 4vh;
	text-align: left;
}

.speech-bubble:after {
	content: '';
	position: absolute;
	right: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 1.5vh solid transparent;
	border-left-color: #b7f1c6;
	border-right: 0;
	border-bottom: 0;
	margin-top: -0.75vh;
	margin-right: -1.5vh;
}

.bro {
	float: right;
	clear: both;
	max-width: 75%;
}
</style>

