import fs from 'fs/promises';

const components = ['button'];

const cssMapping = {
    'color-bg': 'background-color',
    'color-fg': 'color',
    'typography': 'font',
    'min-height': 'min-height',
    'min-width': 'min-width',
    'color-border': 'border-color',
    'border-width': 'border-width',
    'elevation': 'box-shadow',
    'spacing-padding': 'padding',
    'spacing-gap': 'gap',
    'spacing': 'margin',
    'radius': 'border-radius',
    'sizing-min-inline': 'min-inline-size',
    'sizing-min-block': 'min-block-size'
}

const stateMapping = {
    'enabled': '',
    'pressed': 'active',
    'hover': 'hover',
    'focus': 'focus',
    'disabled': 'disabled'
}

function transformMetaToMetadata(meta) {
  const metadata = {};

  meta.forEach(item => {
    const state = item.state || ''; // Default state to empty string if undefined

    if (!metadata[state]) {
      metadata[state] = [];
    }

    let currentLevel = metadata[state];

    item.classNames.forEach((className, index) => {
      let foundItem = currentLevel.find(entry => entry.class === className);

      if (!foundItem) {
        foundItem = { class: className, items: [] };
        currentLevel.push(foundItem);
      }

      // If last className, add the final properties (css, value)
      if (index === item.classNames.length - 1) {
        foundItem.css = item.css;
        foundItem.value = item.value;
      }

      currentLevel = foundItem.items;
    });
  });

  // Convert metadata object to array
  const transformedMetadata = Object.keys(metadata).map(state => ({
    state: state,
    items: metadata[state]
  }));

  return transformedMetadata;
}
  

const extractVariablesFromFile = async (filePath) => {
    try {
      // Read the content of the file
      const fileContent = await fs.readFile(filePath, 'utf8');
      // Regular expression to match SCSS variable declarations
      const regex = /\$([\w-]+):\s*([^;!]+)(?:\s*!default)?;/g;
  
      let match;
      const variables = [];
  
      // Iterate over each match
      while ((match = regex.exec(fileContent)) !== null) {
        const variableName = match[1]; // Capture group 1: variable name
        const variableValue = match[2].trim(); // Capture group 2: variable value
  
        // Push each variable and its value into the array
        variables.push({ name: variableName, value: variableValue });
      }
  
      return variables;
    } catch (err) {
      console.error('Error reading the file:', err);
      return [];
    }
  }
// Function to parse the input string
function parseInput(input) {
    // Remove 'comp-' prefix from the input
    let inputWithoutComp = input.replace(/^comp-/, '');

    // Initialize variables
    let state = '';
    let css = '';
    let classNames = [];

    // Identify and remove entries from cssMapping from input
    Object.keys(cssMapping).forEach(key => {
        if (inputWithoutComp.includes(key)) {
            css = cssMapping[key]; // Assign css
            inputWithoutComp = inputWithoutComp.replace(key, '');
        }
    });

    // Remove component name from the input
    const componentName = inputWithoutComp.split('-')[0];
    if (components.includes(componentName)) {
        inputWithoutComp = inputWithoutComp.slice(componentName.length + 1); // Remove the component name
    }

    // Split the remaining parts by '-'
    const parts = inputWithoutComp.split('-');

    // Iterate through remaining parts to identify state and classNames
    parts.forEach(part => {
        // Check if part matches stateMapping
        if (Object.keys(stateMapping).includes(part)) {
            state = stateMapping[part];
            return;
        }

        // Otherwise, add non-empty parts to classNames
        if (part !== '') {
            classNames.push(part);
        }
    });

    return { state, css, classNames };
}

function transformToSCSS(data, indent = 0) {
  let result = '';

  data.forEach(item => {
    const currentIndent = '  '.repeat(indent);

    if (item.items && item.items.length > 0) {
      result += `${currentIndent}&.${item.class} {\n`;
      result += transformToSCSS(item.items, indent + 1);
      result += `${currentIndent}}\n`;
    } else {
      result += `${currentIndent}&.${item.class} {\n`;
      result += `${currentIndent}  ${item.css}: ${item.value};\n`;
      result += `${currentIndent}}\n`;
    }
  });

  return result;
}

function generateSCSS(data) {
  let result = '';

  data.forEach(item => {
    if (item.state !== '') {
      result += `&:${item.state} {\n`;
    }
    result += transformToSCSS(item.items, item.state === '' ? 0 : 1);
    if (item.state !== '') {
      result += `}\n`;
    }
  });

  return result;
}

const extract = async (component) => {
    const cssVars = await extractVariablesFromFile('./button.scss');
    const meta = [];

    cssVars.forEach(({ name, value }) => {
        const metadata = parseInput(name);
        meta.push({ ...metadata, value });
    });
    console.log('meta =', meta)
  // Transform meta into metadata
  const metadata = transformMetaToMetadata(meta);
    console.log('metadata =', JSON.stringify(metadata, null, 2));
    const b = generateSCSS(metadata)
    // console.log('b =', b);
    // const b = generateSCSS(meta);
    // console.log('b =', b);
      // Generate SCSS content
  const scssContent = `:host {\n${b}}`;
  // console.log('scssContent =', scssContent)
    const fileName = 'mossa.scss';
    await fs.writeFile(fileName, scssContent, err => {
        if (err) {
            console.error('Error writing SCSS file:', err);
        } else {
            console.log(`SCSS file "${fileName}" has been successfully generated.`);
        }
    });
}

components.forEach(component => {
    extract(component);
});
