document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("mp3FileInput");
  const burnButton = document.getElementById("burnButton");
  const base64Content = document.getElementById("base64Content");
  const base64Textarea = document.getElementById("base64Textarea");
  const copyButton = document.getElementById("copyButton");
  const downloadButton = document.getElementById("downloadButton");

  burnButton.addEventListener("click", handleUpload);
  copyButton.addEventListener("click", copyBase64);
  downloadButton.addEventListener("click", downloadIndexHtml);

  function handleUpload() {
    console.log("Upload button clicked");
    const file = fileInput.files[0];
    if (!file && !fileInput.value) {
      alert("Woah! First choose an .mp3 file then 🔥");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      console.log("File successfully read");
      const base64Data = event.target.result.split(",")[1];
      base64Textarea.value = base64Data;
      base64Content.classList.remove("hidden");
    };

    reader.readAsDataURL(file);
  }

  function copyBase64() {
    base64Textarea.select();
    document.execCommand("copy");
    alert("Code is copied and ready");
  }

  function downloadIndexHtml() {
    const base64Data = base64Textarea.value;
    const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Mp3 Player</title>
            </head>
            <body>
                <audio controls>
                    <source src="data:audio/mp3;base64,${base64Data}" type="audio/mp3">
                    Your browser does not support the audio element.
                </audio>
            </body>
            </html>
        `;

    const downloadLink = document.createElement("a");
    downloadLink.setAttribute(
      "href",
      "data:text/html;charset=utf-8," + encodeURIComponent(htmlContent)
    );
    downloadLink.setAttribute("download", "index.html");
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
});