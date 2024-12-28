const imageInput = document.getElementById('imageInput');
const messageInput = document.getElementById('messageInput');
const encodeButton = document.getElementById('encodeButton');
const downloadButton = document.getElementById('downloadButton');
const decodeInput = document.getElementById('decodeInput');
const decodeButton = document.getElementById('decodeButton');
const decodedMessage = document.getElementById('decodedMessage');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

encodeButton.addEventListener('click', () => {
  const file = imageInput.files[0];
  const message = messageInput.value;

  if (file && message) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = canvas.toDataURL();
        const encodedImage = steg.encode(message, imageData);
        const imgTag = new Image();
        imgTag.src = encodedImage;
        document.body.appendChild(imgTag);
        downloadButton.href = encodedImage;
        downloadButton.download = 'encoded_image.png';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload an image and enter a message.');
  }
});

decodeButton.addEventListener('click', () => {
  const file = decodeInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const decodedMessageContent = steg.decode(canvas.toDataURL());
        decodedMessage.textContent = `Decoded message: ${decodedMessageContent}`;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload an image to decode.');
  }
});
