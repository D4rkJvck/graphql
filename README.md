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

<hr style="background: #333">

## Description

This project is about creating a Dashboard representing the Statistics of Zone01's talents within the 01-edu System Platform.  
The program should log the **Talent** in the platform to get a **JSON Web Token (JWT)**.  
That token will be used to send subsequent requests with **GraphQL queries** to Get specific Data from the API.  
Finally, the program will graphically represent the Data in the page using **Scalar Vector Graphics (SVG)**.

<hr style="background: #333">

## Tech Stack

### Languages

Click on badges to get to the code...

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](src/index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](src/styles/global.css/style.css)
[![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](src/app.js)

### API & Auth

[![GRAPHQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)](src/graphql/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](src/components/form.js)

### Development

[![VERCEL](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)]()
[![WARP](https://img.shields.io/badge/warp-01A4FF?style=for-the-badge&logo=warp&logoColor=white)]()
[![SHELL SCRIPT](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)]()
[![MARKDOWN](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)]()

### OS and Version Control

[![MAC OS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white)]()
[![GITHUB](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()

<hr style="background: #333">

## Installation

### Cloning

```bash
$ git clone http://learn.zone01dakar.sn/git/jefaye/graphql
$ cd graphql/
```

### File System

    |
    + -- src/
    |     |
    |     + -- assets/
    |     |     |
    |     |     + -- bg-dark.webp
    |     |
    |     + -- components/
    |     |     |
    |     |     + -- charts/
    |     |     |     |
    |     |     |     + -- bar.js
    |     |     |
    |     |     + -- aside.js
    |     |     |
    |     |     + -- form.js
    |     |     |
    |     |     + -- nav.js
    |     |     |
    |     |     + -- section.js
    |     |
    |     + -- graphql/
    |     |     |
    |     |     + -- charts.gql.js
    |     |     |
    |     |     + -- profile.gql.js
    |     |
    |     + -- services/
    |     |     |
    |     |     + -- services.js
    |     |
    |     + -- styles/
    |     |     |
    |     |     + -- components/
    |     |     |     |
    |     |     |     + -- aside.css
    |     |     |     |
    |     |     |     + -- form.css
    |     |     |     |
    |     |     |     + -- nav.css
    |     |     |     |
    |     |     |     + -- section.css
    |     |     |
    |     |     + -- global.css
    |     |     |
    |     |     + -- variables.css
    |     |
    |     + -- templates/
    |     |     |
    |     |     + -- aside.html.js
    |     |     |
    |     |     + -- form.html.js
    |     |     |
    |     |     + -- nav.html.js
    |     |     |
    |     |     + -- section.html.js
    |     |
    |     + -- utils/
    |     |     |
    |     |     + -- elements.js
    |     |     |
    |     |     + -- format.js
    |     |
    |     + -- app.js
    |     |
    |     + -- index.html
    |
    + -- .gitignore
    |
    + -- gitify.sh
    |
    + -- LICENSE
    |
    + -- README.md

<hr style="background: #333">

## Usage

### Login
<!-- REVIEW: Sequence Diagram -->
```mermaid
  sequenceDiagram
    participant Talent
    participant API

    Talent ->> API: POST Credentials
    API ->> API: CHECK Credentials
    alt Invalid Credentials
      API -->> Talent: Unathorized (401)
    else
      API -->> Talent: GET Token
      Talent ->> Talent: SAVE Token
    end    
```

### Homepage

```mermaid
  sequenceDiagram
    participant Talent
    participant API
    
    Talent ->> API: POST Request + Query + Token
    API ->> API: CHECK Token
    API ->> API: GENERATE Response
    API -->> Talent: GET Data
```

<hr style="background: #333">

## Contributing

<hr style="background: #333">

## Sources

[![YOUTUBE](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)]()

<hr style="background: #333">

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
