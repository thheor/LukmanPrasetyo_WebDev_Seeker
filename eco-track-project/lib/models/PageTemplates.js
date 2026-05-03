import { readFileSync } from "fs";
import { join } from "path";

export class PageTemplates {
  pageDirectory() {
    const root = process.cwd();
    const staticDirectory = join(root, "public");
    const mainFile = join(this.staticDirectory, "index.html");
    const notFound = join(this.staticDirectory, "ui", "404.html");
    const calculator = join(this.staticDirectory, "calculate", "page.html");

    return { mainFile, calculator, notFound, staticDirectory, root };
  }

  renderPage() {
    let layout = readFileSync(page, "utf-8");

    components.forEach((element) => {
      const component = readFileSync(element.directory, "utf-8");

      layout = layout.replaceAll(`{{${element.name}}}`, component);
    });

    return layout;
  }
}
