// ============================================================
//  script.js — Aymen Mrizel Portfolio
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
  hamburger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });
}

/* ── Active nav link (scroll spy) ─────────────────────────── */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach((s) => spyObserver.observe(s));

/* ── Modal (index.html) ────────────────────────────────────── */
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((m) => {
      closeModal(m.id);
    });
  }
});

/* ── Terminal interactif ───────────────────────────────────── */
(function () {
  let termHistory = [];
  let historyIndex = -1;
  let termReady = false;

  const $ = (id) => document.getElementById(id);

  function openTerminal() {
    const overlay = $("termOverlay");
    if (!overlay) return;
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    if (!termReady) {
      showWelcome();
      termReady = true;
    }
    setTimeout(() => {
      const inp = $("termInput");
      if (inp) inp.focus();
    }, 360);
  }

  function closeTerminal() {
    const overlay = $("termOverlay");
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  window.openTerminal = openTerminal;
  window.closeTerminal = closeTerminal;

  function showWelcome() {
    appendLine("┌─────────────────────────────────────────────────────┐", "accent");
    appendLine("│        aymen@portfolio  —  Terminal Interactif        │", "accent");
    appendLine("└─────────────────────────────────────────────────────┘", "accent");
    appendLine("", "blank");
    appendLine("  Bienvenue ! Explore mon portfolio directement ici.", "dim");
    appendLine('  Tape  help  pour voir toutes les commandes disponibles.', "dim");
    appendLine("", "blank");
  }

  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function appendLine(text, cls) {
    const out = $("termOut");
    if (!out) return;
    const div = document.createElement("div");
    div.className = "tl " + (cls || "output");
    div.textContent = text;
    out.appendChild(div);
    scrollBottom();
  }

  function appendHTML(html, cls) {
    const out = $("termOut");
    if (!out) return;
    const div = document.createElement("div");
    div.className = "tl " + (cls || "output");
    div.innerHTML = html;
    out.appendChild(div);
    scrollBottom();
  }

  function echoCmd(raw) {
    const out = $("termOut");
    if (!out) return;
    const div = document.createElement("div");
    div.className = "tl cmd";
    div.innerHTML = '<span class="tps1">aymen@portfolio:~$</span> ' + escHtml(raw);
    out.appendChild(div);
    scrollBottom();
  }

  function scrollBottom() {
    const body = $("termBody");
    if (body) body.scrollTop = body.scrollHeight;
  }

  const CMDS = {
    help() {
      const rows = [
        ["help", "Afficher toutes les commandes"],
        ["ls", "Lister les fichiers du portfolio"],
        ["pwd", "Afficher le chemin actuel"],
        ["cd projets", "Aller sur la page Projets"],
        ["cd parcours", "Aller sur la page Parcours"],
        ["cd contact", "Scroller vers la section Contact"],
        ["cat about.txt", "Présentation personnelle"],
        ["cat skills.txt", "Compétences techniques"],
        ["cat projet1.txt", "SAÉ 1.05 — Analyse & Nettoyage Disque"],
        ["cat projet2.txt", "SAÉ 1.02 — Architecture Réseau"],
        ["cat projet3.txt", "Labs Réseaux & Cybersécurité"],
        ["open cv", "Ouvrir le CV PDF"],
        ["open github", "Ouvrir GitHub"],
        ["open linkedin", "Ouvrir LinkedIn"],
        ["clear", "Vider le terminal"],
        ["exit", "Fermer le terminal"],
      ];
      appendLine("", "blank");
      appendLine("  COMMANDES DISPONIBLES", "header");
      appendLine("  ─────────────────────────────────────────────", "dim");
      rows.forEach(([cmd, desc]) => {
        appendHTML(
          '  <span class="tc">' + escHtml(cmd).padEnd(18, "\u00a0") + "</span>" +
          '  <span class="td">' + escHtml(desc) + "</span>",
          "output"
        );
      });
      appendLine("", "blank");
    },

    ls() {
      appendLine("", "blank");
      appendHTML(
        '  <span class="tc">about.txt</span>   ' +
        '<span class="tc">skills.txt</span>   ' +
        '<span class="tf">projets/</span>   ' +
        '<span class="tf">links/</span>',
        "output"
      );
      appendLine("", "blank");
    },

    pwd() {
      appendLine("/home/aymen/portfolio", "success");
    },

    "cd projets"() {
      appendLine("  → Navigation vers Projets...", "success");
      setTimeout(() => {
        window.location.href = "Projets.html";
      }, 700);
    },

    "cd parcours"() {
      appendLine("  → Navigation vers Parcours...", "success");
      setTimeout(() => {
        window.location.href = "Parcours.html";
      }, 700);
    },

    "cd contact"() {
      appendLine("  → Scroll vers la section Contact...", "success");
      setTimeout(() => {
        closeTerminal();
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 500);
    },

    "cd /"() {
      appendLine("/home/aymen/portfolio", "success");
    },

    "cd ~"() {
      appendLine("/home/aymen/portfolio", "success");
    },

    "cat about.txt"() {
      appendLine("", "blank");
      appendLine("  ── about.txt ──────────────────────────────────────", "header");
      appendLine("", "blank");
      appendLine("  Nom        :  Aymen Mrizel", "output");
      appendLine("  Formation  :  B.U.T. Réseaux & Télécommunications", "output");
      appendLine("  École      :  IUT de Colmar — Université de Haute-Alsace", "output");
      appendLine("  Année      :  1ère année BUT R&T", "output");
      appendLine("  Statut     :  Disponible pour alternance 2026/27", "success");
      appendLine("", "blank");
      appendLine("  Passionné par la cybersécurité, les infrastructures réseau", "dim");
      appendLine("  et la sécurisation des systèmes. Rigoureux et curieux,", "dim");
      appendLine("  je cherche une alternance en Réseaux & Cybersécurité.", "dim");
      appendLine("", "blank");
    },

    "cat skills.txt"() {
      appendLine("", "blank");
      appendLine("  ── skills.txt ─────────────────────────────────────", "header");
      appendLine("", "blank");
      appendLine("  [RÉSEAU]", "accent");
      appendLine("  ├ Cisco IOS — routeurs & switches", "output");
      appendLine("  ├ VLANs, VTP, routage inter-VLAN", "output");
      appendLine("  ├ ACL, DHCP, DNS, services réseau", "output");
      appendLine("  └ Cisco Packet Tracer & EVE-NG", "output");
      appendLine("", "blank");
      appendLine("  [SYSTÈMES]", "accent");
      appendLine("  ├ Linux Debian 12/13 — administration système", "output");
      appendLine("  ├ VirtualBox — virtualisation", "output");
      appendLine("  └ Firewall, utilisateurs, services", "output");
      appendLine("", "blank");
      appendLine("  [DÉVELOPPEMENT]", "accent");
      appendLine("  ├ Python — PyQt5, JSON, traitement données", "output");
      appendLine("  ├ PowerShell — scripting & automatisation", "output");
      appendLine("  └ HTML5 & CSS3", "output");
      appendLine("", "blank");
    },

    "cat projet1.txt"() {
      appendLine("", "blank");
      appendLine("  ── SAÉ 1.05 — Analyse & Nettoyage de Disque ──────", "header");
      appendLine("", "blank");
      appendLine("  Stack   :  Python, PowerShell, PyQt5, JSON", "output");
      appendLine("  Type    :  DEV — Architecture logicielle modulaire", "output");
      appendLine("", "blank");
      appendLine("  Solution pour identifier et supprimer les fichiers", "dim");
      appendLine("  volumineux sur un serveur. Composée d'un orchestrateur", "dim");
      appendLine("  PowerShell, d'un moteur Python et d'une interface Qt.", "dim");
      appendLine("", "blank");
      appendLine('  → tape "cd projets" pour voir tous les projets', "accent");
      appendLine("", "blank");
    },

    "cat projet2.txt"() {
      appendLine("", "blank");
      appendLine("  ── SAÉ 1.02 — Architecture Réseau d'Entreprise ───", "header");
      appendLine("", "blank");
      appendLine("  Stack   :  EVE-NG, Cisco IOS, VLAN, VTP, DHCP Linux", "output");
      appendLine("  Type    :  RÉSEAU — Déploiement LAN d'entreprise", "output");
      appendLine("", "blank");
      appendLine("  Conception d'un LAN structuré sous EVE-NG avec", "dim");
      appendLine("  segmentation VLAN, propagation VTP, DHCP Linux", "dim");
      appendLine("  et routage inter-VLAN via Router-on-a-Stick / SVI.", "dim");
      appendLine("", "blank");
      appendLine('  → tape "cd projets" pour voir tous les projets', "accent");
      appendLine("", "blank");
    },

    "cat projet3.txt"() {
      appendLine("", "blank");
      appendLine("  ── LABS PERSO — Réseaux & Cybersécurité ──────────", "header");
      appendLine("", "blank");
      appendLine("  Stack   :  Packet Tracer, VirtualBox, ACL, Linux", "output");
      appendLine("  Type    :  CYBER — Labs pratiques personnels", "output");
      appendLine("", "blank");
      appendLine("  Entraînements : ACL, topologies complexes,", "dim");
      appendLine("  virtualisation, admin Linux, analyse de trafic.", "dim");
      appendLine("  Approche Blue Team — cybersécurité défensive.", "dim");
      appendLine("", "blank");
      appendLine('  → tape "cd projets" pour voir tous les projets', "accent");
      appendLine("", "blank");
    },

    "open cv"() {
      appendLine("  → Ouverture du CV PDF...", "success");
      setTimeout(() => {
        window.open("https://aymen68212-create.github.io/Mon-CV-/Mon%20CV.pdf", "_blank", "noopener,noreferrer");
      }, 300);
    },

    "open github"() {
      appendLine("  → Ouverture de GitHub...", "success");
      setTimeout(() => {
        window.open("https://github.com/aymen68212-create", "_blank", "noopener,noreferrer");
      }, 300);
    },

    "open linkedin"() {
      appendLine("  → Ouverture de LinkedIn...", "success");
      setTimeout(() => {
        window.open("https://www.linkedin.com/in/aymen-mrizel-6b898a3b0/", "_blank", "noopener,noreferrer");
      }, 300);
    },

    clear() {
      const out = $("termOut");
      if (out) out.innerHTML = "";
    },

    exit() {
      closeTerminal();
    },
  };

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    echoCmd(raw.trim());
    if (CMDS[cmd]) {
      CMDS[cmd]();
    } else {
      appendLine("  bash: commande introuvable : " + raw.trim(), "error");
      appendLine('  Tape "help" pour voir les commandes disponibles.', "dim");
      appendLine("", "blank");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const input = $("termInput");
    const overlay = $("termOverlay");
    const body = $("termBody");
    const dotR = $("termDotR");

    if (!input) return;

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value;
        if (val.trim()) {
          termHistory.unshift(val);
          historyIndex = -1;
        }
        runCommand(val);
        input.value = "";
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex < termHistory.length - 1) {
          historyIndex++;
          input.value = termHistory[historyIndex];
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          input.value = termHistory[historyIndex];
        } else {
          historyIndex = -1;
          input.value = "";
        }
      } else if (e.key === "Escape") {
        closeTerminal();
      }
    });

    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeTerminal();
      });
    }

    if (dotR) dotR.addEventListener("click", closeTerminal);

    if (body) body.addEventListener("click", () => input.focus());
  });

})();

/* ── Contact form EmailJS ─────────────────────────────────── */
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      emailjs.sendForm("service_el3jhfn", "template_6bt4yvf", this)
        .then(function () {
          alert("✅ Message envoyé !");
          form.reset();
        }, function (error) {
          alert("❌ Erreur : " + JSON.stringify(error));
        });
    });
  }
});