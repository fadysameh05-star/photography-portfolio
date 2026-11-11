/* ========== بيانات الصور ========== */
const photos = [
  {
    id: 1,
    title: "لقطة من الشارع المصري",
    place: "مصر",
    src: "1792961441923.jpg",
    thumb: "1792961441923.jpg",
    alt: "صورة فوتوغرافية التقطها فادي لاوندي",
    gear: {
      camera: "Samsung Galaxy A36 5G",
      lens: "الكاميرا الأساسية للموبايل",
      iso: "تلقائي (Auto)",
      shutter: "تلقائي",
      aperture: "f/1.8",
      focal: "26mm",
    },
    story:
      "لحظة مميزة لقطها بعدستي وأنا في جولة، الإضاءة والتفاصيل في الشارع وقتها كانت تستحق التوثيق.",
    editing: [
      "استيراد الصورة وتعديل الإضاءة والـ Exposure في Lightroom.",
      "رفع التباين (Contrast) لإبراز تفاصيل الظلال.",
      "ضبط درجات الألوان وتطبيق الـ Color Grading المفضل.",
    ],
  },
  {
    id: 2,
    title: "ضوء غروب الشمس امام البحر",
    place: "راس سدر، مصر",
    src: "794241607_2501038370410485_1495443456220880996_n.jpg",
    thumb: "794241607_2501038370410485_1495443456220880996_n.jpg",
    alt: "منظر طبيعي وقت الفجر",
    gear: {
      camera: "Samsung Galaxy A36 5G",
      lens: "الكاميرة الاساسية بالهاتف",
      iso: "تلقائي (Auto)",
      shutter: " تلقائي",
      aperture: "f/1.8",
      focal: "26mm",
    },
    story:
      "كنت في رحلة مع العائلة الي مدينة راس سدر في شمال سينا وعند الوصل كان ضوء الشمس يسيح علي موج المياه ، ثم اخرجت هاتفي و فتحت الكاميرة الخاصة بيه ، ثم اخرجت روح الساموراي الخاصة بي لالتقاط افضل صورة ",
    editing: [
      "استيراد ملف RAW إلى Adobe Lightroom وتصحيح العدسة.",
      "خفض Highlights إلى -60 واستعادة تفاصيل السماء.",
      "رفع Shadows إلى +35 لإظهار تفاصيل الأرض.",
      "تدفئة الألوان: Temp +8 وVibrance +15.",
    ],
  },
  {
    id: 3,
    title: "الي طريقي للعمل",
    place: "العمرانيه ، الجيزة",
    src: "810450946_2511887342658921_6169615037081010671_n.jpg",
    thumb: "810450946_2511887342658921_6169615037081010671_n.jpg",
    alt: "شارع قديم بإضاءة دافئة",
    gear: {
     camera: "Samsung Galaxy A36 5G",
      lens: "الكاميرا الأساسية للموبايل",
      iso: "تلقائي",
      shutter: "تلقائي",
      aperture: "f/1.8",
      focal: "26mm",
    },
    story:
      "بينما كنت في طريقي إلى العمل صباحاً، لفت انتباهي هذا القط وهو نائم بعمق شديد وبوضعية دائرية هادئة أمام باب قديم، فلم أتمالك نفسي عن توثيق هذه اللحظة المليئة بالسكينة.",
    editing: [
      "Adobe Lightroom: رفع الـ Contrast وتقليل الـ Highlights لإبراز ملمس الباب القديم ودرجات ألوان الفراء.",
      "Snapseed: استخدام أداة Details لزيادة وضوح تفاصيل النقوش الحجريّة والخشبية.",
      "تطبيق Vignette خفيف لتوجيه العين نحو القط النائم.",
    ],
  },
];

/* ========== عناصر الصفحة ========== */
const grid = document.getElementById("gallery-grid");
const modal = document.getElementById("modal");
const backdrop = document.getElementById("modal-backdrop");
const mImg = document.getElementById("m-img");
const mTitle = document.getElementById("m-title");
const mPlace = document.getElementById("m-place");
const tabContent = document.getElementById("tab-content");
const tabButtons = document.querySelectorAll(".tab-btn");

let currentIndex = 0;
let currentTab = "gear";

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ========== بناء شبكة الصور ========== */
function renderGallery() {
  if (!grid) return;
  grid.innerHTML = photos
    .map(
      (p, i) => `
    <button data-index="${i}"
      class="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-xl border border-line bg-panel text-start animate-rise focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      style="animation-delay:${i * 90}ms">
      <img src="${p.thumb}" alt="${p.alt}" loading="lazy"
        class="w-full transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-75" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 class="font-semibold text-white">${p.title}</h3>
        <p class="text-xs text-zinc-300">${p.place}</p>
      </div>
    </button>`
    )
    .join("");
}

if (grid) {
  grid.addEventListener("click", (e) => {
    const card = e.target.closest("[data-index]");
    if (card) openModal(Number(card.dataset.index));
  });
}

/* ========== محتوى التبويبات ========== */
function gearRow(label, value) {
  return `
    <div class="flex items-center justify-between border-b border-line py-3">
      <span class="text-sm text-zinc-400">${label}</span>
      <span class="font-semibold text-white" dir="ltr">${value}</span>
    </div>`;
}

function renderTab() {
  if (!tabContent) return;
  const p = photos[currentIndex];
  let html = "";

  if (currentTab === "gear") {
    const g = p.gear;
    html =
      gearRow("الكاميرا", g.camera) +
      gearRow("العدسة", g.lens) +
      gearRow("البعد البؤري", g.focal) +
      gearRow("ISO", g.iso) +
      gearRow("سرعة الغالق (Shutter)", g.shutter) +
      gearRow("فتحة العدسة (Aperture)", g.aperture);
  } else if (currentTab === "story") {
    html = `<p class="leading-8 text-zinc-300">${p.story}</p>`;
  } else {
    html =
      `<ol class="space-y-4">` +
      p.editing
        .map(
          (step, i) => `
        <li class="flex gap-3">
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm font-bold text-accent">${i + 1}</span>
          <span class="leading-7 text-zinc-300">${step}</span>
        </li>`
        )
        .join("") +
      `</ol>`;
  }

  tabContent.innerHTML = `<div class="animate-fadeIn">${html}</div>`;

  tabButtons.forEach((btn) => {
    const active = btn.dataset.tab === currentTab;
    btn.setAttribute("aria-selected", active);
    btn.classList.toggle("text-accent", active);
    btn.classList.toggle("border-b-2", active);
    btn.classList.toggle("border-accent", active);
    btn.classList.toggle("text-zinc-400", !active);
    btn.classList.toggle("hover:text-white", !active);
  });
}

tabButtons.forEach((btn) =>
  btn.addEventListener("click", () => {
    currentTab = btn.dataset.tab;
    renderTab();
  })
);

/* ========== التحكم في النافذة ========== */
function fillModal() {
  const p = photos[currentIndex];
  if (mImg) {
    mImg.src = p.src;
    mImg.alt = p.alt;
  }
  if (mTitle) mTitle.textContent = p.title;
  if (mPlace) mPlace.textContent = p.place;
  renderTab();
}

function openModal(index) {
  currentIndex = index;
  currentTab = "gear";
  fillModal();
  if (modal) modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (modal) modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function step(dir) {
  currentIndex = (currentIndex + dir + photos.length) % photos.length;
  fillModal();
}

const mClose = document.getElementById("m-close");
if (mClose) mClose.addEventListener("click", closeModal);
if (backdrop) backdrop.addEventListener("click", closeModal);

const mPrev = document.getElementById("m-prev");
if (mPrev) mPrev.addEventListener("click", () => step(-1));

const mNext = document.getElementById("m-next");
if (mNext) mNext.addEventListener("click", () => step(1));

document.addEventListener("keydown", (e) => {
  if (!modal || modal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") step(-1);
  if (e.key === "ArrowLeft") step(1);
});

renderGallery();
