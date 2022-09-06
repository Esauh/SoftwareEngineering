/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */
 exports.findAllSolutions = function (grid, dictionary) {
    let solutions = [];
  
    if (grid == null || dictionary == null){ 
      return solutions;
    }
    let number = grid.length;
  
    for (let i = 0; i < number; i++) {
      if (grid[i].length != number) {
        return solutions;
      }
    }
  
    lowerCase(grid, dictionary);
  
    let trie = hashMap(dictionary);
    let truesolution = new Set();
  
    for (let y = 0; y < number; y++) {
      for (x = 0; x < number; x++) {
        let word = "";
        let visited = new Array(number)
          .fill(false)
          .map(() => new Array(number).fill(false));
        findWords(word, y, x, grid, visited, trie, truesolution);
      }
    }
  
    solutions = Array.from(truesolution);
    return solutions;
  };
  
  lowerCase = function (grid, dict) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = grid[i][j].toLowerCase();
      }
    }
  
    for (let i = 0; i < dict.length; i++) {
      dict[i] = dict[i].toLowerCase();
    }
  };
  
  findWords = function (word, y, x, grid, visited, trie, truesolution) {
    let nearMatrix = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
  
    if (y < 0 || x < 0 || y >= grid.length || x >= grid.length ||visited[y][x] == true){
      return;
    }
    word += grid[y][x];
  
  
    if (isPrefix(word, trie)) {
      visited[y][x] = true;
  
      if (isWord(word, trie)) {
        if (word.length >= 3) truesolution.add(word);
      }
  
      for (let i = 0; i < 8; i++) {
        findWords( word,y + nearMatrix[i][0],x + nearMatrix[i][1],grid,visited,trie,truesolution);
      }
    }
  
    visited[y][x] = false;
  };
  
  isPrefix = function (word, trie) {
    return trie[word] != undefined;
  };
  
  isWord = function (word, trie) {
    return trie[word] == 1;
  };
  
  hashMap = function (dictionary) {
    var dict = {};
    for (let i = 0; i < dictionary.length; i++) {
      dict[dictionary[i]] = 1;
      let wordlength = dictionary[i].length;
      var str = dictionary[i];
  
      for (let j = wordlength; wordlength > 1; wordlength--) {
        str = str.substr(0, wordlength - 1);
  
        if (str in dict) 
        {
          if (str == 1) 
          {
            dict[str] = 1;
          }
        } 
        else
         {
          dict[str] = 0;
        }
      }
    }
    return dict;
  };
  
   
  var grid = [['T', 'W', 'Y', 'R'],
                ['E', 'N', 'P', 'H'],
                ['G', 'Z', 'Qu', 'R'],
                ['St', 'N', 'T', 'A']];
  var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                      'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                      'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
  
  console.log(exports.findAllSolutions(grid, dictionary));
  