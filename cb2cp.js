#!/usr/bin/env node

const fs = require("fs");

// Load asciidoctor, which converts asciidoc to html
const Asciidoctor = require("asciidoctor");
var asciidoctor = Asciidoctor();

// Load turndown, which converts html to markdown
var TurndownService = require("turndown");

// Process the commandline options
var argv = require("minimist")(process.argv.slice(2));

// Make sure they've specified a file.  If not, error out
if (argv["f"] == undefined) {
  console.error("You must supply a file to convert. \nconvert -f fn.adoc");
  process.exit();
}
filename = argv["f"];

// Convert a string to a filename
function slugify(s) {
  return s
    .replace(/\s/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// Grab a default language type
var language = argv["l"] || "javascript";
const fLookup = {
  javascript: ["function", "/*", "*/", "console.log", "js"],
  python: ["def", '"""', '"""', "print", "py"],
  go: ["func", "/*", "*/", "fmt.Println", "go"],
  java: ["void function", "/*", "*/", "system.out.println", "java"],
};

// Process the file with asciidoctor
data = asciidoctor.convertFile(argv["f"], { safe: "safe" });
// Loop through it all and do the things!
data
  .getBlocks()[0]
  .getBlocks()
  .map((recipe, idx) => {
    if (recipe.title.length) {
      var functionKeyword = fLookup[language] || "function";
      var recipe_number = "recipe-" + ("000" + idx).slice(-3);
      var cookbookName = argv["f"]
        .split(".")[0]
        .toLowerCase()
        .split("/")
        .slice(-2)
        .join("-");
      var title_slug = slugify(recipe.title.toLowerCase());
      var filename =
        cookbookName +
        "-" +
        recipe_number +
        "-" +
        title_slug +
        "." +
        functionKeyword[4];
      console.log("filename is", filename);

      var problem = recipe.blocks[0];
      // Convert the selected recipe to markdown
      var turndownService = new TurndownService({
        codeBlockStyle: "fenced",
        preformattedCode: true,
      });
      var markdown = turndownService.turndown(problem.getContent());
      var output = `
${functionKeyword[1]}
${markdown}
${functionKeyword[2]}
${functionKeyword[0]} 

${functionKeyword[3]}(\"Print test value for ${recipe.title}\")`;

      fs.writeFile("./seeds/" + filename, output, (err) => {
        // In case of a error throw err.
        if (err) throw err;
      });
    }
  });
