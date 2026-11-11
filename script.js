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

/* ========== روابط التواصل (عدّلها بروابطك) ========== */
const socialLinks = [
  {
    name: "Instagram",
    url: "https://instagram.com/lawndy.visuals",
    icon: `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>`,
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1C5n7bKZMd/",
    icon: `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>`,
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/201113165466",
    icon: `<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>`,
  },
  {
    name: "Email",
    url: "fadysameh05@gmail.com",
    // أيقونة إيميل خطية
    icon: `<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 5h18v14H3zM3 7l9 6 9-6"/>`,
  },
];

function renderSocials() {
  const html = socialLinks
    .map(
      (s) => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}" title="${s.name}"
      class="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-panel text-zinc-400 transition duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent">
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">${s.icon}</svg>
    </a>`
    )
    .join("");

  document.querySelectorAll(".social-links").forEach((el) => (el.innerHTML = html));
}

renderSocials();
renderGallery();
