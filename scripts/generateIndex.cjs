const fs = require("node:fs")
const path = require("node:path")

function main() {
  let files
  try {
    files = fs.readdirSync("public/items", { withFileTypes: true })
  } catch (error) {
    console.error(error)
    return
  }
  const index = new Array()
  files.map(file => {
    if (!file.isFile()) { return }
    const fileName = file.name
    const ext = path.extname(fileName)
    if (ext !== ".md") { return }
    const fileNameWithoutExt = fileName.substring(0,
      fileName.length - ext.length
    )
    index.push(fileNameWithoutExt)
  })
  console.log(index.join("\n"))
}

main()
