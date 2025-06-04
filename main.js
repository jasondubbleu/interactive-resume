// main.js
console.log("Fade-in script loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  const fadeInElements = document.querySelectorAll(".fade-in-section");
  console.log("Found fade-in elements:", fadeInElements.length);

  const observerOptions = {
    root: null,                // viewport
    rootMargin: "0px 0px -20px 0px",
    threshold: 0.1             // 10% of element visible → trigger
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Element is visible now:", entry.target.id || entry.target.tagName);
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => observer.observe(el));
});
// main.js

// 1) Fade‐in logic (unchanged)
console.log("Fade-in script loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded");
  const fadeInElements = document.querySelectorAll(".fade-in-section");
  console.log("Found fade-in elements:", fadeInElements.length);

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -20px 0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("Element is visible now:", entry.target.id || entry.target.tagName);
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeInElements.forEach(el => observer.observe(el));

  // 2) NAV‐DIAL + SCROLL‐SPY logic

  // Grab each section’s element in the same order as our dial labels:
  const sections = [
    document.getElementById("summary"),
    document.getElementById("experience"),
    document.getElementById("skills"),
    document.getElementById("goals"),
    document.getElementById("hobbies"),
    document.getElementById("contact"),
  ];

  // Map section IDs to the angle we set in the HTML:
	const sectionAngles = {
	  summary:   -30,  // instead of -30
	  experience: 30,
	  skills:     90,
	  goals:     150,
	  hobbies:   210,
	  contact:   270   // instead of -90
};


  // All the <a class="dial-label" data-section="..."> elements
  const dialLabels = document.querySelectorAll(".dial-label");
  const pointerEl = document.querySelector(".dial-pointer");

  function rotatePointerTo(angle) {
    pointerEl.style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg)`;
  }

function setActiveLabel(id) {
  dialLabels.forEach(label => {
    if (label.dataset.section === id) {
      label.classList.add("active-label");
    } else {
      label.classList.remove("active-label");
    }
  });
}

  // Simplified scroll‐spy: pick the last section whose top ≤ 100px from viewport top
  function onScrollSpy() {
    let activeSection = sections[0];

    for (let sec of sections) {
      const rect = sec.getBoundingClientRect();
      // If this section’s top is at or above 100px from the viewport top, mark it active
      if (rect.top <= 100) {
        activeSection = sec;
      }
    }

    const id = activeSection.id;
    const angle = sectionAngles[id];
    rotatePointerTo(angle);
    setActiveLabel(id);
  }

  // Fire once on load
  onScrollSpy();

  // Throttle scroll events
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        onScrollSpy();
        ticking = false;
      });
      ticking = true;
    }
  });

  // 3) Click‐to‐scroll: scrollIntoView with block:"start"
  dialLabels.forEach(label => {
    label.addEventListener("click", e => {
      e.preventDefault();
      const id = label.dataset.section;
      const target = document.getElementById(id);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

function toggleDetails(id) {
  const elem = document.getElementById(id);
  // Locate the button that was clicked. Since we passed `id`, find the <button> inside the same parent.
  const btn = elem.previousElementSibling.querySelector('.expand-btn');

  if (elem.classList.contains('expanded')) {
    // collapse
    elem.classList.remove('expanded');
    btn.textContent = '+';   // revert to plus
  } else {
    // expand
    elem.classList.add('expanded');
    btn.textContent = '−';   // change to minus sign
  }
}
