# Week 1 - AI Assisted TDD

## Project Structure

### Documentation
- [Research Notes](./research-notes.md)
- [AI Workflow Notes](https://chatgpt.com/share/6a05f88a-e5f0-83ec-8f82-3c53c2d15008)

### Source Code
- [CLI Entry](./src/cli.js)

### Tests
- [Unit Tests](./tests/unit/unit.test.js)

# Todo Manager CLI
## 1. Project Overview
A simple CLI application built with Node.js using TDD principles.


## 2. Features
- Add todo
- List todos
- Complete todo
- Delete todo
- File storage
- Validation

## 3. TDD Workflow
This project follows the Red → Green → Refactor cycle.

1. Write failing test
2. Implement minimal code
3. Refactor safely

## 4. Run Project
```
npm install
```
```
npm test
```
```
node src/cli.js add "Test Create"
```