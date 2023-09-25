#! /usr/bin/env node
import yargs from "yargs";
import inquirer from "inquirer";

import fs from "fs/promises";
import path from "path";

async function createComponentFiles(options) {
  const componentDir = path.join(process.cwd(), options.component);

  // Create the component directory
  await fs.mkdir(componentDir);

  // Determine the component file extension based on the template
  const componentFileExt = options.template === "TypeScript" ? "tsx" : "jsx";

  // Create the component file (e.g., Component/Component.jsx or Component/Component.tsx)
  await fs.writeFile(
    path.join(componentDir, `${options.component}.${componentFileExt}`),
    `import React from "react";\n\nimport styles from "./${options.component}.module.scss";\n\nfunction Component() {\n  return (\n    <div>\n      {/* Your component code here */}\n    </div>\n  );\n}\n\nexport default Component;\n`
  );

  // Create the style file (e.g., Component/Component.module.scss)
  await fs.writeFile(
    path.join(componentDir, `${options.component}.module.scss`),
    `/* Your component styles here */\n`
  );

  if (options.hooksPattern || options["hooks-pattern"]) {
    // Create the hook file (e.g., Component/useComponent.jsx or Component/useComponent.tsx)
    const hookFileExt = options.template === "TypeScript" ? "tsx" : "jsx";
    await fs.writeFile(
      path.join(componentDir, `use${options.component}.${hookFileExt}`),
      `import React from 'react';\n\nfunction useComponent() {\n  // Your custom hook logic here\n}\n\nexport default useComponent;\n`
    );
  }

  if (options.testCase || options["test-case"]) {
    // Create the test file (e.g., Component/__test__/Component.test.jsx or Component/__test__/Component.test.tsx)
    const testFileExt = options.template === "TypeScript" ? "tsx" : "jsx";
    const testDir = path.join(componentDir, "__test__");
    await fs.mkdir(testDir);
    await fs.writeFile(
      path.join(testDir, `${options.component}.test.${testFileExt}`),
      `import React from 'react';\nimport { render } from '@testing-library/react';\nimport Component from '../Component';\n\nit('renders without crashing', () => {\n  render(<Component />);\n});\n`
    );
  }
}
function parseArgumentsIntoOptions(rawArgs) {
  const { argv } = yargs(process.argv);
  // ...
  return argv;
}

async function promptForMissingOptions(options) {
  const questions = [];
  const defaultTemplate = "Typescript";
  if (options.skip) {
    if (!options.component) {
      questions.push({
        type: "input",
        name: "component",
        message: "Please enter the component name..",
        default: "Test",
      });
    }
    const answers = await inquirer.prompt(questions);

    return {
      ...options,
      component: options.component || answers.component || "Test",
      template: options.template || defaultTemplate,
    };
  }

  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: ["TypeScript", "JavaScript"],
      default: defaultTemplate,
    });
  }

  if (!options.hooksPattern) {
    questions.push({
      type: "confirm",
      name: "hooksPattern",
      message: "Do you want to use hooks pattern?",
      default: false,
    });
  }
  if (!options.testCases) {
    questions.push({
      type: "confirm",
      name: "testCase",
      message: "Do you want to have test cases?",
      default: false,
    });
  }
  if (!options.component) {
    questions.push({
      type: "input",
      name: "component",
      message: "Please enter the component name..",
      default: "Test",
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    hooksPattern: options.hooksPattern || answers.hooksPattern,
    component: options.component || answers.component,
    testCase: options.testCase || answers.testCase,
  };
}
export async function cli() {
  let options = parseArgumentsIntoOptions();
  options = await promptForMissingOptions(options);
  // Create component files based on selected options
  try {
    await createComponentFiles(options);
    console.log("Component files created successfully!");
  } catch (error) {
    console.error("Error creating component files:", error);
  }
}

cli();
