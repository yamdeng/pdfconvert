var fs = require("fs");
var pdf = require("html-pdf");
var html = fs.readFileSync("./c.html", "utf8");
var options = { format: "A3", renderDelay: 2000 };

pdf.create(html, options).toFile("./c.pdf", function (err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});

// "format": "Letter",        // allowed units: A3, A4, A5, Legal, Letter, Tabloid
