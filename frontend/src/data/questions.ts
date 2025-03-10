

// Sample questions for the game
// DSA topics for the bingo board
export const topics = [
  'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Trees',
  'Graphs', 'Hash Tables', 'Heaps', 'Sorting', 'Searching',
  'Recursion', 'Dynamic Programming', 'Backtracking', 'Greedy',
  'Bit Manipulation', 'Math', 'Strings', 'Binary Search',
  'Two Pointers', 'Sliding Window', 'Trie', 'Matrix', 'Design'
];

// Sample questions for the game with fixed difficulty levels
export const questions = [
  {
    id: "arr1",
    topic: "Arrays",
    text: "What is the time complexity of accessing an element in an array by its index?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Array access by index is a constant time operation O(1) because the memory address can be calculated directly from the index.",
    difficulty: "easy"
  },
  {
    id: "arr2",
    topic: "Arrays",
    text: "Which of the following operations is NOT O(1) for arrays?",
    options: ["Access by index", "Update an element", "Insertion at the beginning", "Get the length"],
    correctAnswer: 2,
    explanation: "Insertion at the beginning of an array requires shifting all existing elements, resulting in O(n) time complexity.",
    difficulty: "easy"
  },
  {
    id: "ll1",
    topic: "Linked Lists",
    text: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 0,
    explanation: "Inserting at the beginning of a linked list is O(1) as it only requires updating the head pointer and the next pointer of the new node.",
    difficulty: "easy"
  },
  {
    id: "ll2",
    topic: "Linked Lists",
    text: "Which of these is an advantage of linked lists over arrays?",
    options: [
      "Random access of elements",
      "Memory efficiency",
      "Dynamic size allocation",
      "Cache locality"
    ],
    correctAnswer: 2,
    explanation: "Linked lists can easily grow or shrink in size during execution, as they don't require contiguous memory allocation like arrays do.",
    difficulty: "easy"
  },
  {
    id: "stack1",
    topic: "Stacks",
    text: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
    options: ["Queue", "Stack", "Heap", "Tree"],
    correctAnswer: 1,
    explanation: "A stack follows the LIFO principle, where the last element added is the first one to be removed.",
    difficulty: "easy"
  },
  {
    id: "queue1",
    topic: "Queues",
    text: "Which of the following applications would most likely use a queue data structure?",
    options: [
      "Undo functionality in a text editor",
      "Function call management in recursion",
      "Print job scheduling",
      "Depth-first search in a graph"
    ],
    correctAnswer: 2,
    explanation: "Print job scheduling typically uses a queue to process print jobs in the order they were received (FIFO).",
    difficulty: "easy"
  },
  {
    id: "tree1",
    topic: "Trees",
    text: "What is the maximum number of nodes in a binary tree of height h?",
    options: ["h", "2h", "2^h - 1", "2^(h+1) - 1"],
    correctAnswer: 3,
    explanation: "A binary tree of height h can have at most 2^(h+1) - 1 nodes. This occurs when the tree is a perfect binary tree with all levels completely filled.",
    difficulty: "medium"
  },
  {
    id: "graph1",
    topic: "Graphs",
    text: "Which algorithm finds the shortest path from a single source to all other vertices in a weighted graph?",
    options: ["Depth-First Search", "Breadth-First Search", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    correctAnswer: 2,
    explanation: "Dijkstra's algorithm finds the shortest paths from a single source vertex to all other vertices in a graph with non-negative edge weights.",
    difficulty: "medium"
  },
  {
    id: "hash1",
    topic: "Hash Tables",
    text: "What is the average time complexity for lookup operations in a hash table?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 0,
    explanation: "Hash tables provide O(1) average time complexity for lookups, insertions, and deletions, assuming a good hash function and load factor.",
    difficulty: "easy"
  },
  {
    id: "sort1",
    topic: "Sorting",
    text: "Which sorting algorithm has the best average-case time complexity?",
    options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
    correctAnswer: 2,
    explanation: "Quick Sort has an average-case time complexity of O(n log n), which is better than Bubble Sort, Insertion Sort, and Selection Sort.",
    difficulty: "medium"
  },
  {
    id: "dp1",
    topic: "Dynamic Programming",
    text: "Which problem is commonly solved using dynamic programming?",
    options: ["Finding connected components in a graph", "Determining if a number is prime", "Calculating the nth Fibonacci number", "Finding the median of an array"],
    correctAnswer: 2,
    explanation: "The Fibonacci sequence is a classic example of a problem that can be efficiently solved using dynamic programming by storing previously calculated values.",
    difficulty: "hard"
  },
  {
    id: "greedy1",
    topic: "Greedy Algorithms",
    text: "Which of the following problems can be solved optimally using a greedy approach?",
    options: ["Traveling Salesman Problem", "0/1 Knapsack Problem", "Minimum Spanning Tree", "Longest Common Subsequence"],
    correctAnswer: 2,
    explanation: "Minimum Spanning Tree problems (like Prim's or Kruskal's algorithms) can be solved optimally using greedy approaches.",
    difficulty: "medium"
  },
  {
    id: "rec1",
    topic: "Recursion",
    text: "What is a potential issue with recursive algorithms?",
    options: ["They always have O(n) time complexity", "They can lead to stack overflow", "They cannot be used for sorting", "They always require more memory than iterative solutions"],
    correctAnswer: 1,
    explanation: "Recursive algorithms can cause stack overflow errors if the recursion depth is too large, as each recursive call adds a new frame to the call stack.",
    difficulty: "medium"
  },
  {
    id: "bit1",
    topic: "Bit Manipulation",
    text: "Which operation can be used to check if a number is a power of 2?",
    options: [
      "n % 2 == 0",
      "n & (n-1) == 0",
      "n | 1 == n+1",
      "n ^ n == 0"
    ],
    correctAnswer: 1,
    explanation: "For powers of 2, the bitwise operation n & (n-1) == 0 returns true because powers of 2 have only one bit set, and n-1 has all bits below that bit set.",
    difficulty: "medium"
  },
  {
    id: "tc1",
    topic: "Time Complexity",
    text: "What is the time complexity of binary search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 1,
    explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each comparison.",
    difficulty: "easy"
  }
];

// score txt 
// store answers 