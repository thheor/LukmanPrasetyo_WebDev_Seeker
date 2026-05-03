export class Observer {
  constructor() {
    this.sections = document.querySelectorAll("section[id]");
    this.navbarLinks = document.querySelectorAll(".nav-link");
  }

  activeLink(id) {
    const activeLinkStyles = ["text-dark-green", "after:scale-x-100"];

    this.navbarLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `/#${id}`;
      activeLinkStyles.forEach((cls) => link.classList.toggle(cls, isMatch));
    });
  }

  navbarEffects() {
    const navbarObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    this.sections.forEach((section) => {
      navbarObserver.observe(section);
    });
  }

  scrollEffects() {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0");
            entry.target.classList.add("opacity-100");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    this.sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
}
