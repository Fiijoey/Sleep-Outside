export default class Alert {
  constructor(message, scroll = true, duration = 3000) {
    this.message = message;
    this.scroll = scroll;
    this.duration = duration;
    this.alertElement = null;
  }

  show() {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = `<p>${this.message}</p><span>X</span>`;

    alert.addEventListener("click", (event) => {
      if (event.target.tagName === "SPAN") {
        this.remove();
      }
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alert);
    }

    this.alertElement = alert;

    if (this.scroll) window.scrollTo(0, 0);

    // Auto removal of the alert is currently disabled as per original utils implementation
    // setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    if (this.alertElement && this.alertElement.parentElement) {
      this.alertElement.parentElement.removeChild(this.alertElement);
      this.alertElement = null;
    }
  }

  static removeAll() {
    const alerts = document.querySelectorAll(".alert");
    const main = document.querySelector("main");
    alerts.forEach((alert) => {
      if (main && alert.parentElement === main) {
        main.removeChild(alert);
      }
    });
  }

  static async displayAlerts() {
    try {
      const response = await fetch("../public/json/alerts.json");
      if (!response.ok) throw new Error("Network response was not ok");
      const alerts = await response.json();
      if (alerts && alerts.length > 0) {
        const section = document.createElement("section");
        section.className = "alert-list";

        alerts.forEach((alert) => {
          const p = document.createElement("p");
          p.innerText = alert.message;
          p.style.backgroundColor = alert.background;
          p.style.color = alert.color;
          section.appendChild(p);
        });

        const main = document.querySelector("main");
        if (main) {
          main.prepend(section);
        }
      }
    } catch (error) {
      console.error("Failed to load alerts:", error);
    }
  }
}
