

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
// export const questions = [
//   {
//     id: "arr1",
//     topic: "Arrays",
//     text: "What is the time complexity of accessing an element in an array by its index?",
//     options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
//     correctAnswer: 0,
//     explanation: "Array access by index is a constant time operation O(1) because the memory address can be calculated directly from the index.",
//     difficulty: "easy"
//   },
//   {
//     id: "arr2",
//     topic: "Arrays",
//     text: "Which of the following operations is NOT O(1) for arrays?",
//     options: ["Access by index", "Update an element", "Insertion at the beginning", "Get the length"],
//     correctAnswer: 2,
//     explanation: "Insertion at the beginning of an array requires shifting all existing elements, resulting in O(n) time complexity.",
//     difficulty: "easy"
//   },
//   {
//     id: "ll1",
//     topic: "Linked Lists",
//     text: "What is the time complexity of inserting a node at the beginning of a singly linked list?",
//     options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
//     correctAnswer: 0,
//     explanation: "Inserting at the beginning of a linked list is O(1) as it only requires updating the head pointer and the next pointer of the new node.",
//     difficulty: "easy"
//   },
//   {
//     id: "ll2",
//     topic: "Linked Lists",
//     text: "Which of these is an advantage of linked lists over arrays?",
//     options: [
//       "Random access of elements",
//       "Memory efficiency",
//       "Dynamic size allocation",
//       "Cache locality"
//     ],
//     correctAnswer: 2,
//     explanation: "Linked lists can easily grow or shrink in size during execution, as they don't require contiguous memory allocation like arrays do.",
//     difficulty: "easy"
//   },
//   {
//     id: "stack1",
//     topic: "Stacks",
//     text: "Which data structure follows the Last-In-First-Out (LIFO) principle?",
//     options: ["Queue", "Stack", "Heap", "Tree"],
//     correctAnswer: 1,
//     explanation: "A stack follows the LIFO principle, where the last element added is the first one to be removed.",
//     difficulty: "easy"
//   },
//   {
//     id: "queue1",
//     topic: "Queues",
//     text: "Which of the following applications would most likely use a queue data structure?",
//     options: [
//       "Undo functionality in a text editor",
//       "Function call management in recursion",
//       "Print job scheduling",
//       "Depth-first search in a graph"
//     ],
//     correctAnswer: 2,
//     explanation: "Print job scheduling typically uses a queue to process print jobs in the order they were received (FIFO).",
//     difficulty: "easy"
//   },
//   {
//     id: "tree1",
//     topic: "Trees",
//     text: "What is the maximum number of nodes in a binary tree of height h?",
//     options: ["h", "2h", "2^h - 1", "2^(h+1) - 1"],
//     correctAnswer: 3,
//     explanation: "A binary tree of height h can have at most 2^(h+1) - 1 nodes. This occurs when the tree is a perfect binary tree with all levels completely filled.",
//     difficulty: "medium"
//   },
//   {
//     id: "graph1",
//     topic: "Graphs",
//     text: "Which algorithm finds the shortest path from a single source to all other vertices in a weighted graph?",
//     options: ["Depth-First Search", "Breadth-First Search", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
//     correctAnswer: 2,
//     explanation: "Dijkstra's algorithm finds the shortest paths from a single source vertex to all other vertices in a graph with non-negative edge weights.",
//     difficulty: "medium"
//   },
//   {
//     id: "hash1",
//     topic: "Hash Tables",
//     text: "What is the average time complexity for lookup operations in a hash table?",
//     options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
//     correctAnswer: 0,
//     explanation: "Hash tables provide O(1) average time complexity for lookups, insertions, and deletions, assuming a good hash function and load factor.",
//     difficulty: "easy"
//   },
//   {
//     id: "sort1",
//     topic: "Sorting",
//     text: "Which sorting algorithm has the best average-case time complexity?",
//     options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
//     correctAnswer: 2,
//     explanation: "Quick Sort has an average-case time complexity of O(n log n), which is better than Bubble Sort, Insertion Sort, and Selection Sort.",
//     difficulty: "medium"
//   },
//   {
//     id: "dp1",
//     topic: "Dynamic Programming",
//     text: "Which problem is commonly solved using dynamic programming?",
//     options: ["Finding connected components in a graph", "Determining if a number is prime", "Calculating the nth Fibonacci number", "Finding the median of an array"],
//     correctAnswer: 2,
//     explanation: "The Fibonacci sequence is a classic example of a problem that can be efficiently solved using dynamic programming by storing previously calculated values.",
//     difficulty: "hard"
//   },
//   {
//     id: "greedy1",
//     topic: "Greedy Algorithms",
//     text: "Which of the following problems can be solved optimally using a greedy approach?",
//     options: ["Traveling Salesman Problem", "0/1 Knapsack Problem", "Minimum Spanning Tree", "Longest Common Subsequence"],
//     correctAnswer: 2,
//     explanation: "Minimum Spanning Tree problems (like Prim's or Kruskal's algorithms) can be solved optimally using greedy approaches.",
//     difficulty: "medium"
//   },
//   {
//     id: "rec1",
//     topic: "Recursion",
//     text: "What is a potential issue with recursive algorithms?",
//     options: ["They always have O(n) time complexity", "They can lead to stack overflow", "They cannot be used for sorting", "They always require more memory than iterative solutions"],
//     correctAnswer: 1,
//     explanation: "Recursive algorithms can cause stack overflow errors if the recursion depth is too large, as each recursive call adds a new frame to the call stack.",
//     difficulty: "medium"
//   },
//   {
//     id: "bit1",
//     topic: "Bit Manipulation",
//     text: "Which operation can be used to check if a number is a power of 2?",
//     options: [
//       "n % 2 == 0",
//       "n & (n-1) == 0",
//       "n | 1 == n+1",
//       "n ^ n == 0"
//     ],
//     correctAnswer: 1,
//     explanation: "For powers of 2, the bitwise operation n & (n-1) == 0 returns true because powers of 2 have only one bit set, and n-1 has all bits below that bit set.",
//     difficulty: "medium"
//   },
//   {
//     id: "tc1",
//     topic: "Time Complexity",
//     text: "What is the time complexity of binary search?",
//     options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
//     correctAnswer: 1,
//     explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each comparison.",
//     difficulty: "easy"
//   }
// ];

export const questions = [
  {
    "id": "bin-eggs",
    "topic": "Binary Search & Two Eggs Problem",
    "text": "You are given two identical eggs and a 100-floor building. The eggs may break if dropped from a certain floor. If an egg breaks, you cannot use it again. If an egg survives, you can reuse it. You need to find the highest safe floor using the minimum worst-case number of drops. What is the optimal minimum worst-case number of drops required?",
    "options": ["10", "14", "50", "100"],
    "difficulty": "hard"
  },
  {
    "id": "light-bulbs",
    "topic": "Number Theory",
    "text": "You have 1000 light bulbs, numbered 1 to 1000, all initially OFF. There are 1000 people in a line. The 1st person toggles every bulb. The 2nd person toggles every 2nd bulb. The 3rd toggles every 3rd bulb. This continues until the 1000th person toggles only bulb 1000. After all 1000 people have toggled the bulbs, how many bulbs remain ON?",
    "options": ["31", "100", "500", "250"],
    "difficulty": "medium"
  },
  {
    "id": "graph-traversal",
    "topic": "Graph Algorithms",
    "text": "You are a prisoner trapped in a 10 × 10 grid. Some cells contain guards (you cannot pass through them), and some doors are locked (you need a key to open them). You can only move left, right, up, or down. You must find the shortest path from the top-left corner (0,0) to the bottom-right corner (9,9). You have only one key, and you must decide when to use it on a locked door. Which graph traversal technique should be used to find the shortest escape path?",
    "options": ["DFS (Depth-First Search)", "BFS (Breadth-First Search)", "Dijkstra's Algorithm", "A* (A-Star Algorithm)"],
    "difficulty": "medium"
  },
  {
    "id": "ants-rod",
    "topic": "Physics & Algorithms",
    "text": "100 ants are randomly placed on a 1-meter-long rod (100 cm). Each ant moves left or right at 1 cm/sec. If two ants collide, they simply swap directions but continue moving. What is the longest time required for all ants to leave the rod?",
    "options": ["50 seconds", "75 seconds", "100 seconds", "It depends on collisions"],
    "difficulty": "medium"
  },
  {
    "id": "water-jug",
    "topic": "Puzzle Solving",
    "text": "You have a 3-gallon jug and a 5-gallon jug. You need to measure exactly 4 gallons. Which of the following step sequences correctly achieves this?",
    "options": ["5 3 1 4 6 2", "3 6 1 4 2 5", "1 3 5 2 6 4", "5 1 3 6 2 4"],
    "difficulty": "easy"
  },
  {
    "id": "island-bridge",
    "topic": "Graph Theory",
    "text": "A king wants to build bridges between N islands. The cost of building a bridge between island i and j is |i - j| (absolute difference of indexes). What is the minimum total cost to connect all islands?",
    "options": ["O(N log N)", "O(N²)", "O(N)", "O(N³)"],
    "difficulty": "medium"
  },
  {
    "id": "hash-collision",
    "topic": "Hash Tables",
    "text": "A hash function distributes n keys into m slots using uniform hashing. If n > m, what is the expected number of collisions for a single key?",
    "options": ["O(1)", "O(n/m)", "O(log n)", "O(n²/m)"],
    "difficulty": "hard"
  },
  {
    "id": "recursion-fun",
    "topic": "Recursion",
    "text": "Guess the output of the following program: void fun(int n) { if (n > 0) { printf(\"%d \", n); fun(n--); fun(--n); } }",
    "options": ["3 2 1", "3 2 1 1", "3 2 1 0", "Undefined behavior"],
    "difficulty": "medium"
  },
  {
    "id": "fn-pointer",
    "topic": "Function Pointers",
    "text": "Guess the output: void (*arr[])() = {hello, world}; arr[1](); arr[0]();",
    "options": ["Hello World", "World Hello", "Compilation Error", "Undefined Behavior"],
    "difficulty": "medium"
  },
  {
    "id": "static-recursion",
    "topic": "Recursion & Static Variables",
    "text": "Guess the output of the following code with static variable: void fun(int *p) { static int x = 0; if (*p > 0) { x++; (*p)--; fun(p); } printf(\"%d \", x); }",
    "options": ["3 3 3 3", "0 1 2 3", "3 3 3", "Compilation Error"],
    "difficulty": "easy"
  },
  {
    "id": "activity-selection",
    "topic": "Greedy Algorithms",
    "text": "You are given N activities, each with a start time and end time. The goal is to select the maximum number of non-overlapping activities. Which approach is optimal?",
    "options": ["Sort activities by increasing start time and use recursion", "Sort activities by increasing end time and use a greedy approach", "Use dynamic programming to find the optimal selection", "Use BFS to explore all possible activity selections"],
    "difficulty": "easy"
  },
  {
    "id": "fibonacci",
    "topic": "Time Complexity & Recursion",
    "text": "Consider the following recursive Fibonacci function: int fib(int n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); } What is the time complexity of this function?",
    "options": ["O(N)", "O(log N)", "O(2^N)", "O(N²)"],
    "difficulty": "easy"
  },
  {
    "id": "missing-number",
    "topic": "Arrays & Algorithms",
    "text": "You are given an array of size N-1 containing numbers from 1 to N in random order, with one number missing. What is the most efficient way to find the missing number?",
    "options": ["Sort the array and check for the missing number", "Use XOR to cancel out duplicate numbers and find the missing one", "Use a hash table to mark present numbers and find the missing one", "Iterate through the array, checking for the missing number linearly"],
    "difficulty": "medium"
  },
  {
    "id": "bit-counting",
    "topic": "Bit Manipulation",
    "text": "What is the time complexity of the following code? while (n > 0) { n = n & (n - 1); }",
    "options": ["O(N)", "O(log N)", "O(√N)", "O(1)"],
    "difficulty": "hard"
  },
  {
    "id": "lcs",
    "topic": "Dynamic Programming",
    "text": "Given a string A = \"AGGTAB\" and a string B = \"GXTXAYB\", what is the length of the longest common subsequence (LCS)?",
    "options": ["3", "4", "5", "6"],
    "difficulty": "medium"
  },
  {
    "id": "kmp",
    "topic": "String Matching",
    "text": "Given the pattern \"abc\" and the text \"abcpqrabc\", what will be the output of the KMP algorithm when searching for the pattern in the text?",
    "options": ["2", "5", "3", "4"],
    "difficulty": "medium"
  },
  {
    "id": "bit-clearing",
    "topic": "Bit Manipulation",
    "text": "How do you clear the k-th bit of a number n?",
    "options": ["n | (1 << k)", "n & ~(1 << k)", "n ^ (1 << k)", "n + (1 << k)"],
    "difficulty": "easy"
  },
  {
    "id": "network-loops",
    "topic": "Network Algorithms",
    "text": "In a network, which algorithm is used to detect and remove redundant connections to prevent loops?",
    "options": ["Dijkstra's Algorithm", "Spanning Tree Protocol (STP)", "Kruskal's Algorithm", "Prim's Algorithm"],
    "difficulty": "easy"
  },
  {
    "id": "not-largest",
    "topic": "Comparison Algorithms",
    "text": "Given an array of N distinct elements, what is the minimum number of comparisons required to find an element that is not the largest?",
    "options": ["2N-1", "N-1", "N", "1"],
    "difficulty": "hard"
  },
  {
    "id": "sorting-stability",
    "topic": "Sorting Algorithms",
    "text": "Which of the following sorting algorithms is NOT stable?",
    "options": ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    "difficulty": "medium"
  },
  {
    "id": "min-comparisons",
    "topic": "Sorting Complexity",
    "text": "What is the minimum number of comparisons required to sort an array of N distinct elements in the worst case?",
    "options": ["O(N)", "O(N^2)", "O(N logN)", "O(logN)"],
    "difficulty": "medium"
  },
  {
    "id": "algorithm-riddle",
    "topic": "Algorithm Concepts",
    "text": "I call myself, again and again, Breaking down problems into pieces like rain. From towers to trees, I help explore, What am I? Let's settle the score!",
    "options": ["Dynamic Programming", "Greedy Algorithm", "Recursion", "Divide and Conquer"],
    "difficulty": "easy"
  },
  {
    "id": "linked-list",
    "topic": "Linked Lists",
    "text": "You are given a linked list where each node has two pointers: A pointer to the next node and a random pointer that can point to any node in the list. Which algorithm can duplicate this linked list with O(N) time complexity while preserving the structure?",
    "options": ["Naive Recursion", "Floyd's Tortoise and Hare", "Hash Table Mapping", "In-place Copying with Pointer Manipulation"],
    "difficulty": "medium"
  },
  {
    "id": "lock-sequence",
    "topic": "Graph Algorithms",
    "text": "A security system uses a lock that requires a sequence of digits from 0-9. However, you can only enter a sequence where each digit appears exactly once before unlocking it. To generate the shortest possible valid input that unlocks the system, which algorithm should be used?",
    "options": ["Eulerian Path Construction", "Greedy Huffman Encoding", "Kruskal's Algorithm", "Dynamic Programming"],
    "difficulty": "hard"
  },
  {
    "id": "fibonacci",
    "topic": "Time Complexity & Recursion",
    "text": "Consider the following recursive Fibonacci function: int fib(int n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); } What is the time complexity of this function?",
    "options": ["O(N)", "O(log N)", "O(2^N)", "O(N²)"],
    "difficulty": "easy"
  }
]

