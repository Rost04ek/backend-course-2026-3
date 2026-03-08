const { program } = require('commander');
const fs = require('fs');

program
  .name('backend-course-cli')
  .description('CLI програма для обробки JSON даних польотів (Варіант 2)')
  .version('1.0.0');

program
  .option('-i, --input <path>', 'шлях до файлу для читання')
  .option('-o, --output <path>', 'шлях до файлу для запису результату')
  .option('-d, --display', 'вивести результат у консоль');

program
  .option('--date', 'Відображати дату перед інформацією про відстань та час')
  .option('-a, --airtime <number>', 'Відображати лише записи, час у повітрі яких довший за заданий');

program.parse(process.argv);
const options = program.opts();

// Part 1
if (!options.input) {
  console.error('Please, specify input file');
  process.exit(1);
}

if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Part 2
const rawData = fs.readFileSync(options.input, 'utf-8');
let flightsData;

try {
  const lines = rawData.split('\n').filter(line => line.trim() !== '');
    flightsData = lines.map(line => JSON.parse(line));
} catch (error) {
  console.error('Точна помилка парсингу:', error.message);
  process.exit(1);
}

let processedData = flightsData;

if (options.airtime) {
  const minAirtime = parseInt(options.airtime, 10);
  
  processedData = processedData.filter(flight => {
    const currentAirTime = parseInt(flight.AIR_TIME, 10);
    return !isNaN(currentAirTime) && currentAirTime > minAirtime;
  });
}

const formattedResultArray = processedData.map(flight => {
  if (options.date) {
    return `${flight.FL_DATE} ${flight.AIR_TIME} ${flight.DISTANCE}`;
  }
  return `${flight.AIR_TIME} ${flight.DISTANCE}`;
});

const finalOutputString = formattedResultArray.join('\n');

if (options.display) {
  console.log(finalOutputString);
}

if (options.output) {
  fs.writeFileSync(options.output, finalOutputString, 'utf-8');
}