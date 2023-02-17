# hello-cli

A Node cli starter project in TypeScript.

After installing and building the project, run `npm link` to link the bin globally and enable running this as `hello-cli hello world`. In reality, a cli would need to be published to npm to be able to install it globally and use the bin as any other globally installed project.

Project is set up to run on Node 14 or higher since it relies on native ESM support. Some configuration changes will be needed to target CommonJS.

Unit tests are setup with [vitest](https://vitest.dev/)
