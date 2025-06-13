// main.js
console.log("Script loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");

  // 1) FADE-IN LOGIC (unchanged)
  const fadeInElements = document.querySelectorAll(".fade-in-section");
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -20px 0px",
    threshold: 0.1
  };
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  fadeInElements.forEach(el => fadeObserver.observe(el));

  // 2) NAV-DIAL POINTER + SCROLL-SPY
  const ANGLES = {
    summary:    -30,
    goals:      30,
    experience: 80,
    skills:     125,
	projects:   180,
    hobbies:    235,
    contact:    280
  };

  const pointerEl  = document.querySelector(".dial-pointer");
  const dialLabels = document.querySelectorAll(".dial-label");

  function rotatePointer(deg) {
    pointerEl.style.transform =
      `translateX(-50%) translateY(-100%) rotate(${deg}deg)`;
  }

  function setActiveLabel(id) {
    dialLabels.forEach(label => {
      label.classList.toggle("active-label",
        label.dataset.section === id
      );
    });
  }

  // Click → scroll to section + immediate pointer move
  dialLabels.forEach(label => {
    label.addEventListener("click", e => {
      e.preventDefault();
      const id = label.dataset.section;
      document.getElementById(id)
              .scrollIntoView({ behavior: "smooth", block: "start" });
      rotatePointer(ANGLES[id]);
      setActiveLabel(id);
    });
  });

// Remove the old immediate scroll handler, and add this instead:
let scrollTimeout;
window.addEventListener("scroll", () => {
  // Clear any pending handler
  clearTimeout(scrollTimeout);

  // Schedule the work to run 100ms after scrolling stops
  scrollTimeout = setTimeout(() => {
    let active = "summary";
    const offset = 100;

    dialLabels.forEach(label => {
      const sec = document.getElementById(label.dataset.section);
      if (sec.getBoundingClientRect().top <= offset) {
        active = label.dataset.section;
      }
    });

    rotatePointer(ANGLES[active]);
    setActiveLabel(active);
  }, 100);  // 100ms debounce delay
});

	  // Initialize on page load
	rotatePointer(ANGLES["summary"]);
	setActiveLabel("summary");
});

// 3) EXPAND / COLLAPSE DETAILS (unchanged)
function toggleDetails(id) {
  const elem = document.getElementById(id);
  const btn  = elem.previousElementSibling.querySelector(".expand-btn");
  if (elem.classList.contains("expanded")) {
    elem.classList.remove("expanded");
    btn.textContent = "+";
  } else {
    elem.classList.add("expanded");
    btn.textContent = "−";
  }
}

