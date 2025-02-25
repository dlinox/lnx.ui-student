const fs = require("fs");
const path = require("path");

const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Debes proporcionar un nombre para el módulo.");
  process.exit(1);
}

const modulePath = path.join(__dirname, "../src/app/modules", moduleName);
const moduleNameLower = moduleName.toLowerCase(); // Convertir a minúsculas

const directories = [
  "components/DataTable",
  "components/Form",
  "routes",
  "services",
  "types",
  "views",
];

// Crear directorios
directories.forEach((dir) => {
  const dirPath = path.join(modulePath, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Carpeta creada: ${dirPath}`);
  }
});

// Plantillas base
const stubPath = path.join(__dirname, "../stubs/vue-module");
const stubs = {
  "DataTable.constants.stub": "components/DataTable/constants.ts",
  "DataTable.vue.stub": "components/DataTable/DataTable.vue",
  "Form.constants.stub": "components/Form/constants.ts",
  "Form.vue.stub": "components/Form/Form.vue",
  "routes.stub": "routes/index.ts",
  "services.stub": "services/index.ts",
  "types.stub": "types/index.ts",
  "Module.types.stub": `types/${moduleName}.types.ts`,
  "Module.form.types.stub": `types/${moduleName}.form.types.ts`,
  "ModuleView.vue.stub": `views/${moduleName}View.vue`,
};

// Crear archivos desde plantillas
Object.entries(stubs).forEach(([stubFile, targetFile]) => {
  const stubFilePath = path.join(stubPath, stubFile);
  const targetFilePath = path.join(modulePath, targetFile);

  if (!fs.existsSync(stubFilePath)) {
    console.error(`⚠️ Archivo stub no encontrado: ${stubFilePath}`);
    return;
  }

  let content = fs.readFileSync(stubFilePath, "utf8");
  
  // Reemplazar variables en los stubs
  content = content
    .replace(/{{moduleName}}/g, moduleName)
    .replace(/{{moduleNameLower}}/g, moduleNameLower); // Sustituir por la versión en minúsculas

  fs.writeFileSync(targetFilePath, content);
  console.log(`📄 Archivo creado: ${targetFilePath}`);
});

console.log(`✅ Módulo Vue "${moduleName}" generado correctamente.`);
