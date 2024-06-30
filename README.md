# GraphQL

## Table of Contents

- [**Description**](#description)
- [**Tech Stack**](#tech-stack)
  - [Languages](#languages)
- [**Installation**](#installation)
  - [Cloning](#cloning)
  - [File System](#file-system)
- [**Usage**](#usage)
  - [Login](#login)
- [**Contributing**](#contributing)
- [**Sources**](#sources)
- [**License**](#license)

## Description

## Tech Stack

### Languages

Click on badges to get to the code...

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](css/style.css)
[![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](js/app.js)

### API & Auth
[![GRAPHQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)]()
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)]()

### Development
[![VERCEL](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)]()
[![WARP](https://img.shields.io/badge/warp-01A4FF?style=for-the-badge&logo=warp&logoColor=white)]()
[![SHELL SCRIPT](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)]()
[![MARKDOWN](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)]()

### OS and Version Control
[![MAC OS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white)]()
[![GITHUB](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()

## Installation

### Cloning

```bash
$ git clone http://learn.zone01dakar.sn/git/jefaye/graphql
$ cd graphql/
```

### File System

    |
    + -- css/
    |     |
    |     + -- style.css
    |
    + -- img/
    |     |
    |     + -- bg-dark.webp
    |
    + -- js/
    |     |
    |     + -- components/
    |     |     |
    |     |     + -- form-login.js
    |     |     |
    |     |     + -- section-graphs.js
    |     |     |
    |     |     + -- section-profile.js
    |     |
    |     + -- gql/
    |     |      |
    |     |      + -- profile.js
    |     |
    |     + -- svg/
    |     |     |
    |     |     + -- bar-chart.js
    |     |
    |     + -- utils/
    |     |     |
    |     |     + -- elements.js
    |     |     |
    |     |     + -- fetch.js
    |     |
    |     + -- app.js
    |
    + -- git-script.sh
    |
    + -- index.html
    |
    + -- LICENSE
    |
    + -- README.md

## Usage

### Login

```mermaid
  sequenceDiagram
    participant Client
    participant API

    loop until Valid Credentials
      Client ->> API: POST Credentials
      Note right of API: CHECK Credentials
      alt Invalid Credentials
        API -->> Client: Unathorized (401)
      else
        Note right of API: GENERATE Token
        API -->> Client: GET Token
        Note left of Client: SAVE Token
      end
    end
    Client ->> API: POST Request + Query + Token
    Note right of API: CHECK Token
    Note right of API: GENERATE Response
    API -->> Client: GET Data
```

## Contributing

## Sources

[![MDN WEB DOCS](https://img.shields.io/badge/MDN_Web_Docs-black?style=for-the-badge&logo=mdnwebdocs&logoColor=white)]()
[![YOUTUBE](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)]()

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
