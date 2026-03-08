const { program } = require('commander');
const fs = require('fs');

program
  .name('backend-course-cli')
  .description('CLI program for reading and writing JSON data')
  .version('1.0.0');

program
  .option('-i, --input <path>', 'path to file for reading data')
  .option('-o, --output <path>', 'path to file for writing result')
  .option('-d, --display', 'display result in console');

program.parse(process.argv);
const options = program.opts();

if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

const data = fs.readFileSync(options.input, 'utf-8');
const result = data; 

if (options.display) {
  console.log(result);
}

if (options.output) {
  fs.writeFileSync(options.output, result, 'utf-8');
}

