require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");


async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./README.template.md"))
    ).toString("utf-8");

    const content = await (
        await fetch("https://api.quotable.io/random")
    ).json();

    console.log(content);


    const readme = readmeTemplate
        .replace("{content}", content.data.content)
        .replace("{author}", `- ${content.data.author.firstname} ${content.data.author.lastname}`)

    await fs.writeFile("README.md", readme);
}

main();
