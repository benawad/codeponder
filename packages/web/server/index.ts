import { createServer } from "http";
import * as next from "next";
import { join } from "path";
import * as serveFavicon from "serve-favicon";
import { parse } from "url";
import { routes } from "./routes";

const port = parseInt(process.env.PORT!, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const faviconLoader = serveFavicon(
  join(__dirname, "/../../../assets/favicon.ico")
);

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    const rootStaticFiles = ["/favicon.ico"];
    if (rootStaticFiles.indexOf(parsedUrl.pathname!) > -1) {
      faviconLoader(req as any, res as any, (err: any) => {
        console.log(err);
        res.statusCode = 404;
        res.end("error");
      });
    } else {
      handle(req, res);
    }
  }).listen(port, (err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
