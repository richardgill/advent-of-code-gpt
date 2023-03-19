// main.ts
import * as path from "https://deno.land/std@0.101.0/path/mod.ts";

const readRelativeInput = (importUrl: string, inputFile: string) => {
  const dirname = path.dirname(path.fromFileUrl(importUrl));
  const filePath = path.join(dirname, "data", inputFile);
  return Deno.readTextFileSync(filePath);
};

const input = readRelativeInput(import.meta.url, "puzzleInput.txt");

const examples: string[] = [
  `cd /
ls
dir a
14848514 b.txt
8504156 c.dat
dir d
cd a
ls
dir e
29116 f
2557 g
62596 h.lst
cd e
ls
584 i
cd ..
cd ..
cd d
ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
];

type FileSystemNode = {
  name: string;
  size: number;
  children: FileSystemNode[];
};

const parseInput = (input: string): FileSystemNode => {
  const lines = input.split("\n");
  const root: FileSystemNode = { name: "/", size: 0, children: [] };
  let currentNode = root;

  for (const line of lines) {
    if (line.startsWith("cd")) {
      const dir = line.split(" ")[1];
      if (dir === "/") {
        currentNode = root;
      } else if (dir === "..") {
        currentNode = currentNode.children.find((child) =>
          child.name === ".."
        )!;
      } else {
        const newNode: FileSystemNode = {
          name: dir,
          size: 0,
          children: [{ name: "..", size: 0, children: [] }],
        };
        currentNode.children.push(newNode);
        newNode.children[0].children = currentNode.children;
        currentNode = newNode;
      }
    } else if (line.startsWith("dir")) {
      const dir = line.split(" ")[1];
      const newNode: FileSystemNode = {
        name: dir,
        size: 0,
        children: [{ name: "..", size: 0, children: [] }],
      };
      currentNode.children.push(newNode);
    } else {
      const [size, name] = line.split(" ");
      currentNode.children.push({ name, size: parseInt(size), children: [] });
    }
  }

  return root;
};

const calculateTotalSize = (node: FileSystemNode): number => {
  if (node.children.length === 0) {
    return node.size;
  }

  let totalSize = 0;
  for (const child of node.children) {
    totalSize += calculateTotalSize(child);
  }

  node.size = totalSize;
  return totalSize;
};

const findDirectoriesWithSizeAtMost = (
  node: FileSystemNode,
  maxSize: number,
): FileSystemNode[] => {
  const result: FileSystemNode[] = [];

  if (node.size <= maxSize) {
    result.push(node);
  }

  for (const child of node.children) {
    if (child.children.length > 0) {
      result.push(...findDirectoriesWithSizeAtMost(child, maxSize));
    }
  }

  return result;
};

const solve = (input: string): number => {
  const fileSystem = parseInput(input);
  calculateTotalSize(fileSystem);
  const directories = findDirectoriesWithSizeAtMost(fileSystem, 100000);
  return directories.reduce((sum, dir) => sum + dir.size, 0);
};

console.log("Running examples...");
for (const example of examples) {
  console.log("Example:");
  console.log(example);
  console.log("Answer:", solve(example));
}

console.log("\n", solve(input));
