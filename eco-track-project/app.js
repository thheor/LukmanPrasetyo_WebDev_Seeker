import express from "express";
import carbonRoutes from "./lib/routes/carbonRoutes.js";
import pageRoutes from "./lib/routes/pageRoutes.js";
import deniedPageRoutes from "./lib/routes/deniedPageRoutes.js";
import { pageDirectory } from "./lib/utils/pageTemplates.js";

const app = express();
const PORT = 3000;

const { staticDirectory } = pageDirectory();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ui", deniedPageRoutes);

app.use(express.static(staticDirectory, { index: false }));

app.use("/carbon", carbonRoutes);

app.use("/", pageRoutes);

app.use(pageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
