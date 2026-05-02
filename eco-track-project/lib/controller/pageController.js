import { join } from "path";
import { renderPage, pageDirectory } from "../utils/pageTemplates.js";

const { mainFile, calculator, notFound, staticDirectory } = pageDirectory();

export const mainPage = (req, res) => {
  const components = [
    {
      name: "navbar",
      directory: join(staticDirectory, "ui", "navbar.html"),
    },
    {
      name: "hero",
      directory: join(staticDirectory, "ui", "main", "hero.html"),
    },
    {
      name: "why-track",
      directory: join(staticDirectory, "ui", "main", "why-track.html"),
    },
    {
      name: "how-it-works",
      directory: join(staticDirectory, "ui", "main", "how-it-works.html"),
    },
    {
      name: "impact",
      directory: join(staticDirectory, "ui", "main", "impact.html"),
    },
    {
      name: "start-now",
      directory: join(staticDirectory, "ui", "main", "start-now.html"),
    },
    {
      name: "footer",
      directory: join(staticDirectory, "ui", "footer.html"),
    },
  ];

  const page = renderPage({ page: mainFile, components: components });

  res.status(200).send(page);
};

export const calculatorPage = (req, res) => {
  const components = [
    {
      name: "navbar",
      directory: join(staticDirectory, "ui", "navbar.html"),
    },
    {
      name: "form",
      directory: join(staticDirectory, "ui", "calculate", "form.html"),
    },
    {
      name: "result",
      directory: join(staticDirectory, "ui", "calculate", "result.html"),
    },
    {
      name: "tips",
      directory: join(staticDirectory, "ui", "calculate", "tips.html"),
    },
    {
      name: "footer",
      directory: join(staticDirectory, "ui", "footer.html"),
    },
  ];
  const page = renderPage({ page: calculator, components: components });

  res.status(200).send(page);
};

export const notFoundPage = (req, res) => {
  const components = [
    {
      name: "navbar",
      directory: join(staticDirectory, "ui", "navbar.html"),
    },
  ];
  const page = renderPage({ page: notFound, components: components });

  res.status(404).send(page);
};
