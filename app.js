var fs = require('fs');
var _ = require('lodash');
var prompt = require('prompt');
var pl = require('pluralize');
var DICTIONARY_WORDS = fs.readFileSync('./dictionary.txt', 'utf-8').split('\n');

prompt.start();

main();

function main() {
  prompt.get('word', function (err, result) {
    if (err) return;
    var anagrams = findAnagrams(result['word']);
    var n = anagrams.length;
    console.log(`Found ${n} matching ${pl('anagrams', n)}:`, anagrams);
    main();
  });
}

function findAnagrams(word) {
  var sortedWord = word.split('').sort().join();
  return _.chain(DICTIONARY_WORDS)
          .filter(w => w.length === word.length && w !== word)
          .filter(w => w.split('').sort().join() === sortedWord)
          .value();
}