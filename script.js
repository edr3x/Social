// Nav scroll effect
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

// Hamburger
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const spans = burger.querySelectorAll("span");
  if (navLinks.classList.contains("open")) {
    spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans[0].style.transform = "";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "";
  }
});
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.querySelectorAll("span").forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "1";
    });
  });
});

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Terminal typing animation
const termLines = [
  { prompt: "$ ", cmd: "kubectl get pods -n production", delay: 60 },
  { output: "NAME                        READY   STATUS    RESTARTS" },
  {
    output:
      'api-gateway-7d4f8b6c9-x2k   <span class="val">1/1</span>     <span class="str">Running</span>   0',
  },
  {
    output:
      'auth-svc-5c8d9e7f1-m9p      <span class="val">1/1</span>     <span class="str">Running</span>   0',
  },
  {
    output:
      'worker-6b3a2c8d4-t5n        <span class="val">3/3</span>     <span class="str">Running</span>   0',
  },
  { output: "" },
  { prompt: "$ ", cmd: "uptime: 99.97% | latency: 12ms", delay: 40 },
];

const termBody = document.getElementById("termBody");
let lineIdx = 0;

function typeLine() {
  if (lineIdx >= termLines.length) return;
  const line = termLines[lineIdx];
  const div = document.createElement("div");

  if (line.cmd) {
    div.innerHTML =
      '<span class="prompt">' +
      line.prompt +
      '</span><span class="cmd"></span>';
    termBody.appendChild(div);
    const cmdSpan = div.querySelector(".cmd");
    let charIdx = 0;
    const typeChar = () => {
      if (charIdx < line.cmd.length) {
        cmdSpan.textContent += line.cmd[charIdx++];
        setTimeout(typeChar, line.delay || 50);
      } else {
        lineIdx++;
        setTimeout(typeLine, 300);
      }
    };
    setTimeout(typeChar, 500);
  } else {
    div.innerHTML = '<span class="output">' + line.output + "</span>";
    termBody.appendChild(div);
    lineIdx++;
    setTimeout(typeLine, 80);
  }
}
setTimeout(typeLine, 1500);
