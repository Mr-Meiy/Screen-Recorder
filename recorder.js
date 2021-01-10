const start = document.getElementById("start");
const stop = document.getElementById("stop");
const video = document.querySelector("video");
const download = document.getElementById("download");
const message = document.getElementById("message");
let recorder, stream;

async function startRecording() {
  stream = await navigator.mediaDevices.getDisplayMedia({
    video: { mediaSource: "screen" }
  });
  recorder = new MediaRecorder(stream);

  const chunks = [];
  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = e => {
    const completeBlob = new Blob(chunks, { type: chunks[0].type });
    video.src = URL.createObjectURL(completeBlob);
    download.href=video.src;
    download.hidden=false;
  };

  recorder.start();
  video.hidden=false;
    message.hidden=true;
}

start.addEventListener("click", () => {
  start.setAttribute("disabled", true);
  stop.removeAttribute("hidden");

  startRecording();
  //stop.hidden=false;
});

stop.addEventListener("click", () => {
  stop.setAttribute("disabled", true);
  start.removeAttribute("disabled");

  recorder.stop();
  stream.getVideoTracks()[0].stop();
});
