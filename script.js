// ============================================================
//  Script.js — Aymen Mrizel Portfolio — Palette Royale
// ============================================================

/* ── Scroll Reveal ─────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ── Mobile menu ───────────────────────────────────────────── */
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileMenu.classList.remove("open"));
  });
}

/* ── Modals ────────────────────────────────────────────────── */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
}
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => {
      m.classList.remove("open"); document.body.style.overflow = "";
    });
    closeTerminal();
  }
});

/* ── Terminal interactif ────────────────────────────────────── */
const COMMANDS = {
  help: `<span class="t-gold">Commandes disponibles :</span>
  <span class="t-green">whoami</span>     — qui suis-je ?
  <span class="t-green">skills</span>     — mes compétences
  <span class="t-green">projects</span>   — mes projets
  <span class="t-green">contact</span>    — me contacter
  <span class="t-green">clear</span>      — effacer le terminal
  <span class="t-green">alternance</span> — recherche d'alternance`,

  whoami: `<span class="t-gold">Aymen Mrizel</span>
Étudiant B.U.T. Réseaux & Télécommunications — IUT Colmar
Représentant de promotion — Passionné cybersécurité & IA
<span class="t-muted">Lutterbach → Colmar quotidiennement depuis 2025</span>`,

  skills: `<span class="t-gold">── RT1 : Administrer les réseaux ──</span>
  Cisco IOS, VLANs, VTP, ACL, DHCP, DNS, EVE-NG, pfSense

<span class="t-gold">── RT2 : Connecter les entreprises ──</span>
  Wi-Fi (HeatMaps Acrylic), PoE, câblage baie de brassage
  Supports de transmission, mesures RSSI

<span class="t-gold">── RT3 : Créer des outils R&T ──</span>
  Python, Django, MariaDB, n8n, PowerShell, HTML/CSS`,

  projects: `<span class="t-gold">── Projets SAÉ ──</span>
  <span class="t-green">SAÉ 1.02</span>  — Architecture réseau EVE-NG (RT1)
  <span class="t-green">SAÉ 1.03</span>  — HeatMaps Wi-Fi UHA (RT2)
  <span class="t-green">SAÉ 1.05</span>  — Outil analyse disque Python (RT3)
  <span class="t-green">SAÉ 2.03</span>  — Application Drive Django (RT3)
  <span class="t-green">Agent IA</span>  — Automatisation n8n (RT3)`,

  contact: `<span class="t-gold">── Contact ──</span>
  Email   : aymen68212@gmail.com
  GitHub  : github.com/aymen68212-create
  LinkedIn: linkedin.com/in/aymen-mrizel-6b898a3b0`,

  alternance: `<span class="t-gold">── Recherche d'alternance ──</span>
  Disponible pour la rentrée 2026/27
  Orientation : Réseaux & Cybersécurité
  Candidature en cours : Électricité de Strasbourg (ÉS)
  <span class="t-green">→ Voir mon CV ou me contacter directement</span>`,

  clear: "__CLEAR__",
};

const INTRO = `<span class="t-gold">Bienvenue dans le terminal d'Aymen Mrizel</span>
<span class="t-muted">Tapez 'help' pour voir les commandes disponibles.</span>
`;

let termInitialized = false;

function openTerminal() {
  const overlay = document.getElementById("termOverlay");
  if (!overlay) return;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  const input = document.getElementById("termInput");
  const out = document.getElementById("termOut");
  if (!termInitialized) {
    out.innerHTML = INTRO;
    termInitialized = true;
  }
  setTimeout(() => input && input.focus(), 50);
}

function closeTerminal() {
  const overlay = document.getElementById("termOverlay");
  if (overlay) { overlay.classList.remove("open"); document.body.style.overflow = ""; }
}

document.getElementById("termDotR")?.addEventListener("click", closeTerminal);
document.getElementById("termOverlay")?.addEventListener("click", (e) => {
  if (e.target === document.getElementById("termOverlay")) closeTerminal();
});

document.getElementById("termInput")?.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  const input = document.getElementById("termInput");
  const out = document.getElementById("termOut");
  const cmd = input.value.trim().toLowerCase();
  input.value = "";
  if (!cmd) return;
  const echo = `\n<span class="t-green">aymen@portfolio:~$</span> ${cmd}\n`;
  if (cmd === "clear") { out.innerHTML = ""; return; }
  const response = COMMANDS[cmd] || `<span class="t-red">Commande introuvable : '${cmd}'</span>\nTapez 'help' pour la liste des commandes.`;
  out.innerHTML += echo + response + "\n";
  const body = document.getElementById("termBody");
  if (body) body.scrollTop = body.scrollHeight;
});

/* ── EmailJS ────────────────────────────────────────────────── */
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    emailjs.sendForm("default_service", "template_portfolio", contactForm)
      .then(() => showToast("Message envoyé !"))
      .catch(() => showToast("Erreur — réessayez.", true));
  });
}

function showToast(msg, error = false) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = msg;
  if (error) t.style.background = "var(--red)";
  document.body.appendChild(t);
  requestAnimationFrame(() => { requestAnimationFrame(() => t.classList.add("show")); });
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 400); }, 3500);
}
