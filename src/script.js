function updateText() {
  const el = document.getElementById("hero-sub2");
  const heading = document.getElementById("hero-head1");

  if (window.innerWidth < 769) {
      el.textContent = "M.Sc CS. Student & Freelance Designer";
      heading.textContent = "Love Larsson";
  } else {
    el.textContent = "Freelance Designer";
    heading.textContent = "Love";

  }
}

window.addEventListener("resize", updateText);
updateText();