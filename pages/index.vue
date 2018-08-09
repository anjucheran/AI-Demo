<template>
  <section>
    <Header/>
    <div class="container" id="cont">
      <div class="cont">
        <div v-for="(message, index) in messages" :key="index">
          <left-message v-if="message.type === 'left'" :message="message.text"/>
          <right-message v-if="message.type === 'right'" :message="message.text"/>
        </div>
      </div>
    </div>
    <div class="footer">
      <app-logo @click.native="record" v-if="!recording" image="/mic-icon.png"/>
      <logo v-if="recording"/>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";
import Header from "~/components/Header.vue";
import Logo from "~/components/Logo.vue";
import LeftMessage from "~/components/LeftMessage.vue";
import RightMessage from "~/components/RightMessage.vue";
import { CHAT } from '~/config';

import ss from 'socket.io-stream';

let scriptNode;
let ssStream = ss.createStream();
let audioContext;
let gainNode;

export default {
  components: {
    AppLogo,
    Header,
    Logo,
    LeftMessage,
    RightMessage
  },
  data() {
    return {
      recording: false,
      messages: [],
      stream: null,
    };
  },
  mounted() {
    this.scroll();
  },
  updated() {
    this.scroll();
  },
  methods: {
    record() {
      this.recording = true;
      this.messages.push({ type: 'right', text: '' });
      const that = this;

      navigator.mediaDevices.getUserMedia({ audio: true}).then((stream) => {
        that.stream = stream;
        audioContext = new AudioContext();
        let source = audioContext.createMediaStreamSource(stream);
        scriptNode = audioContext.createScriptProcessor(2048, 1, 1);
        scriptNode.onaudioprocess = scriptNodeProcess;
        source.connect(scriptNode);

        function scriptNodeProcess(audioProcessingEvent) {
          let inputBuffer = audioProcessingEvent.inputBuffer;
          let outputBuffer = audioProcessingEvent.outputBuffer;
          let inputData = inputBuffer.getChannelData(0);
          let outputData = outputBuffer.getChannelData(0);

          for (let sample = 0; sample < inputBuffer.length; sample++) {
            outputData[sample] = inputData[sample];
          }

          ssStream.write(new ss.Buffer(that.downsampleBuffer(inputData, 44100, 16000)));
        }

        gainNode = audioContext.createGain();
        gainNode.gain.value = 0;
        scriptNode.connect(gainNode);
        gainNode.connect(audioContext.destination);
        ss(that.$socket).emit('record', ssStream);
    });
    },
    downsampleBuffer(buffer, sampleRate, outSampleRate) {
      if (outSampleRate == sampleRate) {
        return buffer;
      }
      if (outSampleRate > sampleRate) {
        throw "downsampling rate show be smaller than original sample rate";
      }
      let sampleRateRatio = sampleRate / outSampleRate;
      let newLength = Math.round(buffer.length / sampleRateRatio);
      let result = new Int16Array(newLength);
      let offsetResult = 0;
      let offsetBuffer = 0;
      while (offsetResult < result.length) {
        let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
        let accum = 0,
          count = 0;
        for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
          accum += buffer[i];
          count++;
        }

        result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
        offsetResult++;
        offsetBuffer = nextOffsetBuffer;
      }
      return result.buffer;
    },
    scroll() {
      document.getElementById('cont').scrollTop = document.getElementById('cont').scrollHeight;
    },
    async getResponse(msg) {
      console.log(msg);
      const { data } = await this.$axios.get(CHAT, {
        params: {
          q: msg
        }
      });
      console.log(data.answer);
      return data.answer;
    }
  },
  sockets: {
    stop: function() {
      if(this.recording) {
        this.messages.pop();
        this.stream.getTracks().forEach(track => {
          track.stop();
        });
        gainNode.disconnect(audioContext.destination);
        gainNode = null;
        ssStream = ss.createStream();
        audioContext = null;
        this.recording = false;
      }
    },
    results: function(text) {
      this.messages.pop();
      let msg = text;
      this.messages.push({ type: 'right', text: msg });
    },
    final: async function(text) {
      this.stream.getTracks().forEach(track => {
        track.stop();
      });
      gainNode.disconnect(audioContext.destination);
      gainNode = null;
      ssStream = ss.createStream();
      this.recording = false;
      audioContext = null;
      const answer = await this.getResponse(text);
      this.messages.push({ type: 'left', text: answer });
    }
  }
};
</script>

<style>
html {
  height: 100vh;
  width: 100vw;
}
body {
  height: 100vh;
  width: 100vw;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding-left: calc(50% - 3vh);
  padding-right: calc(50% - 3vh);
  margin-bottom: 5vh;
  text-align: center;
}
.container {
  margin: 2% 0;
  text-align: center;
  overflow: auto;
  max-height: 75vh;
}
.cont {
  margin: 0 auto;
  max-width: 900px;
  background-color: azure;
}
</style>

