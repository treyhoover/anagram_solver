var fs = require('fs');
var _ = require('lodash');
var prompt = require('prompt');
var pl = require('pluralize');
var DICTIONARY_WORDS = fs.readFileSync('./dictionary.txt', 'utf-8').split('\n');

prompt.message = '';
prompt.delimiter = '';
prompt.colors = false;
prompt.start();

main();

function main() {
  prompt.get({
    properties: {
      word: {
        description: 'Word:'
      }
    }
  }, function (err, result) {
    if (err) return;
    var anagrams = findAnagrams(result['word']);
    var n = anagrams.length;
    console.log(`Found ${n} matching ${pl('anagrams', n)}:`, anagrams);

    prompt.get({
      properties: {
        again: {
          description: 'Again? (Y/n)'
        }
      }
    }, function (err, result) {
      if (err) return;
      return result['again'][0].toLowerCase() != 'n' ? main() : goodbye();
    });
  });
}

function findAnagrams(word) {
  var sortedWord = word.split('').sort().join();
  return _.chain(DICTIONARY_WORDS)
          .filter(w => w.length === word.length && w !== word)
          .filter(w => w.split('').sort().join() === sortedWord)
          .value();
}

function goodbye() {
  console.log('Thanks for using anagram solver!');
}