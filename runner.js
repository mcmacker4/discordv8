
const vm = require("vm");

const code = process.argv[2];

vm.runInThisContext(code, {timeout: 3000});
