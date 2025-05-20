function getAverageColor(image, yStart, yEnd) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);

  const imgData = ctx.getImageData(0, yStart * height, width, (yEnd - yStart) * height);
  const data = imgData.data;

  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }
  return {
    r: Math.round(r / count),
    g: Math.round(g / count),
    b: Math.round(b / count),
  };
}

function rgbToCss(rgb, alpha=1) {
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

function applyDynamicGradient() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach(item => {
    const img = item.querySelector("img");
    if (!img.complete) {
      // Warte, bis Bild geladen ist
      img.addEventListener("load", () => applyDynamicGradientToItem(item, img));
    } else {
      applyDynamicGradientToItem(item, img);
    }
  });
}

function applyDynamicGradientToItem(item, img) {
  const topColor = getAverageColor(img, 0, 0.15);
  const bottomColor = getAverageColor(img, 0.85, 1);

  const gradient = `radial-gradient(circle at top, ${rgbToCss(topColor, 0.4)}, ${rgbToCss(bottomColor, 0.7)})`;

  // Erstelle oder nutze ein ::before Pseudo-Element via inline style mit einem zusätzlichen Layer
  // Da ::before nicht direkt per JS, hier als inline Hintergrund:
  item.style.position = "relative";
  item.style.zIndex = "0";
  item.style.background = gradient;
  item.style.borderRadius = "12px";

  // Inhalt über den Hintergrund legen
  [...item.children].forEach(child => {
    child.style.position = "relative";
    child.style.zIndex = "1";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyDynamicGradient();
});
