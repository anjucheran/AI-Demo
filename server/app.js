const http = require('http').createServer().listen(3555, '0.0.0.0');
const io = require('socket.io')(http);
const ss = require('socket.io-stream');
const speech = require('@google-cloud/speech').v1p1beta1;
const destroy = require('destroy');
let recording;

io.on('connection', (socket) => {
    console.log('client connected!!');
    ss(socket).on('record', (stream) => {
        const client = new speech.SpeechClient({ keyFilename: 'key.json' });
        const encoding = 'LINEAR16';
        const sampleRateHertz = 16000;
        const languageCode = 'en-US';
        const request = {
            config: {
                encoding: encoding,
                sampleRateHertz: sampleRateHertz,
                languageCode: languageCode,
                enableAutomaticPunctuation: true
            },
            interimResults: true,
        };
        recording = true;
        const recognizeStream = client
        .streamingRecognize(request)
        .on('error', () => {
            recording = false;
        })
        .on('data', data => {
            process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : `\n\nReached transcription time limit, press Ctrl+C\n`
            );
            socket.emit('results', data.results[0].alternatives[0].transcript);
            if(data.results[0].isFinal) {
                socket.emit('final', data.results[0].alternatives[0].transcript);
                recording = false;
                stream.destroy();
                stream.unpipe(recognizeStream);
                recognizeStream.destroy();
                clearTimeout(intervalFunc);
            }
        }
        );

        stream.pipe(recognizeStream);

        const end = () => {
            if(recording) {
                socket.emit('stop');
                recording = false;
                stream.destroy();
                stream.unpipe(recognizeStream);
                recognizeStream.destroy();
            }
        }

        const intervalFunc = setTimeout(end, 10000);
    });
});