const QUALITIES = [100, 90, 80, 70, 60, 50, 40, 30];
let selectedVariant = null;
let variants = [];

const fileInput = document.getElementById("fileInput");
const fileNameLabel = document.getElementById("fileName");
const qualityOptions = document.getElementById("qualityOptions");
const skeleton = document.getElementById("skeleton");

fileInput.addEventListener("change", async () => {
  const file = fileInput.files[0];
  if (!file) return;

  fileNameLabel.textContent = file.name;
  skeleton.classList.remove("hidden");
  qualityOptions.innerHTML = "";

  const reader = new FileReader();
  reader.onload = async e => {
    const img = new Image();
    img.onload = async () => {
      const width = img.width;
      const height = img.height;
      const sizeMB = (file.size / 1024 / 1024).toFixed(2);

      await generateVariants(img);
      skeleton.classList.add("hidden");
      renderQualityButtons();
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

async function generateVariants(img) {
  variants = [];
  for (const q of QUALITIES) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const blob = await new Promise(res =>
      canvas.toBlob(res, "image/webp", q / 100)
    );
    const sizeMB = (blob.size / 1024 / 1024).toFixed(2);
    variants.push({
      quality: q,
      resolution: `${img.width}x${img.height}`,
      size: `${sizeMB} MB`,
      blob,
      width: img.width,
      height: img.height
    });

  }
}

function renderQualityButtons() {
  qualityOptions.innerHTML = "";
  variants.forEach(v => {
    const btn = document.createElement("button");
    btn.className = "quality-btn";
    btn.textContent = `${v.quality}% • ${v.size} • ${v.resolution}`;
    btn.addEventListener("click", (event) => selectQuality(v, event));
    qualityOptions.appendChild(btn);
  });
}

function selectQuality(v, event) {
  selectedVariant = v;

  // Снимаем подсветку со всех кнопок
  document.querySelectorAll(".quality-btn").forEach(btn => {
    btn.classList.remove("active");
  });

  // Подсветка нажатой кнопки
  event.target.classList.add("active");

  const a = document.createElement("a");
  a.href = URL.createObjectURL(selectedVariant.blob);
  a.download = fileInput.files[0].name.replace(/\.[^/.]+$/, "") + ".webp";
  a.click();
}