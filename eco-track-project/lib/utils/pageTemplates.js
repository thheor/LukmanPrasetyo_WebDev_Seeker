import { readFileSync } from "fs";
import { join } from "path";

export const pageDirectory = () => {
  const root = process.cwd();
  const staticDirectory = join(root, "public");
  const mainFile = join(staticDirectory, "index.html");
  const notFound = join(staticDirectory, "ui", "404.html");
  const calculator = join(staticDirectory, "calculate", "page.html");

  return { mainFile, calculator, notFound, staticDirectory, root };
};

export const renderPage = ({ page, components = [] }) => {
  let layout = readFileSync(page, "utf-8");

  components.forEach((element) => {
    const component = readFileSync(element.directory, "utf-8");

    layout = layout.replaceAll(`{{${element.name}}}`, component);
  });

  return layout;
};
