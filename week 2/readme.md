# Ticket Manager CLI

Simple Ticket Manager CLI built with Node.js using TDD (Test-Driven Development).

## Overview

This project is a simple command-line application (CLI) to manage tickets stored in a local JSON file.

The project focuses on:

- Practicing TDD (Red → Green → Refactor)
- Building a layered CLI structure
- Writing Unit, Integration and End-to-End tests
- Validating business logic through automated testing

---

## Features

Current supported features:

- Add ticket
- List tickets
- Complete ticket
- Delete ticket

---

## Project Structure

```txt
src/
├── cli.js
├── repositories/
│   └── ticket.repository.js
├── services/
│   └── ticket.service.js
└── storage/
    └── ticket.json

tests/
├── unit/
├── integration/
└── e2e/
```

### Layers

#### CLI Layer

Handle command-line arguments and user interaction.

Example:

```bash
node src/cli.js add "Learn Node"
```

#### Service Layer

Contains business logic and validation.

Example validations:

- Title is required
- Ticket must exist before completing/deleting

#### Repository Layer

Responsible for reading/writing ticket data from JSON storage.

#### Storage Layer

Persist data in:

```txt
src/storage/ticket.json
```

---

## Installation

Clone project:

```bash
git clone <your-repo-link>
```

Install dependencies:

```bash
npm install
```

---

## Usage

### Add ticket

```bash
node src/cli.js add "Learn Node"
```

### List tickets

```bash
node src/cli.js list
```

Example output:

```txt
[ ] 1. Learn Node
[x] 2. Learn Testing
```

### Complete ticket

```bash
node src/cli.js complete 1
```

### Delete ticket

```bash
node src/cli.js delete 1
```

---

## Testing

Run all tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### Test Types

#### Unit Test

Test business logic inside service layer.

Examples:

- Validate title
- Add ticket logic
- Complete/delete validation

#### Integration Test

Test repository behavior with JSON storage.

Examples:

- Save ticket
- Read ticket list
- Update ticket
- Delete ticket

#### End-to-End (E2E) Test

Test complete CLI flow.

Examples:

- CLI command execution
- Success/error outputs
- File state changes after commands

---

## TDD Workflow

This project follows the TDD workflow:

1. Write failing test (**Red**)
2. Implement minimal code (**Green**)
3. Refactor while keeping tests passing (**Refactor**)

---

## Tech Stack

- Node.js
- Jest
- JSON file storage