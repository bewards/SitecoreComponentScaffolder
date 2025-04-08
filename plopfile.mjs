import * as fs from "fs";
import * as path from "path";

/* eslint-disable import/no-anonymous-default-export */
export default function (plop) {
  plop.setActionType("customActionOne", function (answers, config, plop) {
    console.log(answers);
    console.log(config);
    console.log(plop);
    return "success status message";
  });

  // GENERATOR: REACT NEXT.JS COMPONENT
  plop.setGenerator("scaffold-react-component", {
    description: "generates a react component with Next.js flavor",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (no spaces)",
        validate: (data) => {
          if (!data?.length) {
            console.log("Please provide a valid component name.");
            return false;
          }
          return true;
        },
      },
      {
        type: "confirm",
        name: "hasDatasource",
        message: "Will the component have a Datasource?",
      },
      {
        type: "confirm",
        name: "hasStyles",
        message: "Will the component have SXA styling?",
      },
      {
        type: "confirm",
        name: "hasRenderingParams",
        message: "Will the component have Rendering Parameters?",
      },
      {
        type: "list",
        name: "componentPath",
        message: "What Feature does this component belong to?",
        choices: GetFeatures(),
      },
      {
        when(context) {
          // only allow this prompt when a new feature is selected
          return context.componentPath === null;
        },
        type: "input",
        name: "featureName",
        message:
          "Choose a name for your Feature (optional, left empty will result in a Folder with the same name as the Component)",
      },
    ],
    actions: function (data) {
      var actions = [];

      var pascalCaseHelper = plop.getHelper("pascalCase");
      var componentName = pascalCaseHelper(data.name);
      var featureName = data.featureName ? pascalCaseHelper(data.featureName) : "";

      var baseFeaturePath = data.componentPath;
      if (baseFeaturePath === null) {
        // new feature - build path
        var featureName = data.featureName.length ? pascalCaseHelper(data.featureName) : componentName;
        baseFeaturePath = `src/components/${featureName}`;
        // if the optional feature name was provided and is different than the component name, create another folder structure /FeatureName/ComponentName/ComponentName.tsx
        if (featureName.length && featureName !== componentName) {
          baseFeaturePath = `${baseFeaturePath}/${componentName}`;
        }
      } else {
        // using existing feature
        baseFeaturePath = `${baseFeaturePath}\\${componentName}`;
      }
      console.log(`generated base feature path: ${baseFeaturePath}`);

      actions.push({
        type: "add",
        path: `${baseFeaturePath}/{{pascalCase name}}.tsx`,
        templateFile: "./plop-templates/scaffold-react-component/component.hbs",
      });

      actions.push({
        type: "add",
        path: `${baseFeaturePath}/{{pascalCase name}}.types.tsx`,
        templateFile: "./plop-templates/scaffold-react-component/component.types.hbs",
      });

      actions.push({
        type: "add",
        path: `${baseFeaturePath}/{{pascalCase name}}.module.scss`,
        templateFile: "./plop-templates/scaffold-react-component/styles.hbs",
      });

      return actions;
    },
  });
}

/**
 * @description Read files synchronously from a folder, with natural sorting
 * @param {String} dir Absolute path to directory
 * @returns {Object[]} List of object, each object represent a file
 * structured like so: `{ filepath, name, ext, stat }`
 */
function readFilesSync(dir, onlyFolders) {
  const files = [];
  const useOnlyFolders = onlyFolders || false;

  fs.readdirSync(dir).forEach((filename) => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    const filepath = path.resolve(dir, filename);
    const stat = fs.statSync(filepath);
    const isFile = stat.isFile();

    if (useOnlyFolders && stat.isDirectory()) {
      // console.log(stat);
      files.push({ filepath, name, ext, stat });
    } else if (isFile && !useOnlyFolders) {
      files.push({ filepath, name, ext, stat });
    }
  });

  files.sort((a, b) => {
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });
  });

  return files;
}

/**
 * Retrieves a list of directory choices for the user to select from in the prompt!
 * @returns [] array of name value options where value is an absolute path to the Feature
 */
const GetFeatures = () => {
  let fileData = readFilesSync("src/components/", true);
  const fileDataRecords = fileData.map((fObj) => {
    return { name: fObj.name, value: fObj.filepath };
  });
  // console.log(fileDataRecords);
  fileDataRecords.unshift({ name: "This is a new Feature", value: null });
  return fileDataRecords;
};
