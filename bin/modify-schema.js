#!/usr/bin/env node

const fs = require('fs');
const schemaWalker = require('oas-schema-walker');

const chunks = [];
process.stdin.on('readable', () => {
  let chunk;
  while (null !== (chunk = process.stdin.read()))
    chunks.push(chunk);
});

process.stdin.on('end', () => {

  const schema = JSON.parse(chunks.join(''));

  //const schema = JSON.parse(fs.readFileSync('./schema.json'));

  function callback(schema, parent, state) {
    if (schema.type === 'number') {
      delete schema.type;
      schema.yahooFinanceType = 'number';
    } else if (schema.type === 'string' && schema.format === 'date-time') {
      delete schema.format;
      delete schema.type;
      schema.yahooFinanceType = 'date';
    }
  }

  for (let key of Object.keys(schema.definitions))
    schemaWalker.walkSchema(schema.definitions[key], {}, {}, callback);


  process.stdout.end(JSON.stringify(schema, null, 2) + '\n');
});
