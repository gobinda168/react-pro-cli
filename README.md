# react-pro-cli-x 

![npm](https://www.npmjs.com/package/react-pro-cli-x)
![GitHub](https://github.com/gobinda168/react-pro-cli)

React Pro CLI-X is a powerful command-line tool for quickly generating React components with various options. It simplifies the process of creating React components with different templates, hooks patterns, and test cases.

## Installation

You can install RPX globally using npm or yarn:

```bash
npm install -g react-pro-cli-x
# or
yarn global add react-pro-cli-x
```

## Usage

To create a React component with RPX, use the following command:

```bash
rpx
```


This command will initiate an interactive prompt that will guide you through the component creation process. You can choose the project template (TypeScript or JavaScript), specify whether you want to use hooks patterns, and decide if you want to generate test cases.

## Options
--skip-prompts: Use this option to skip the interactive prompts and provide all options directly through command-line arguments.

--template: Specify the project template (TypeScript or JavaScript).

--hooks-pattern: Enable hooks pattern for the component.

--test-cases: Generate test cases for the component.

--component: Specify the component name.

## Examples
Create a TypeScript Component with Hooks and Test Cases:

```bash
rpx --template TypeScript --hooks-pattern --test-cases --component MyComponent
```