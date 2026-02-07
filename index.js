const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("landing", { title: "Student Stress & Burnout Analyzer" });
});

app.get("/checkin", (req, res) => {
  res.render("checkin", { title: "Stress Check-In" });
});

app.get("/report", (req, res) => {
  res.render("report", { title: "Your Burnout Report" });
});

app.all("*", (req, res) => {
  res.status(404).render("error", {
    title: "Page Not Found",
    code: 404,
    message: "The page you requested does not exist.",
  });
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).render("error", {
    title: "Error",
    code: status,
    message: err.message || "Something went wrong.",
  });
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
