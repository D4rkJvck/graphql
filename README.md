# GraphQL

## Table of Contents

- [**Description**](#description)
- [**Tech Stack**](#tech-stack)
  - [Languages](#languages)
  - [API & Auth](#api--auth)
  - [Development](#development)
  - [OS & Version Control](#os--version-control)
- [**Installation**](#installation)
  - [Cloning](#cloning)
  - [File System](#file-system)
- [**Usage**](#usage)
  - [Login](#login)
  - [Homepage](#homepage)
- [**Aknowledgements**](#aknowledgements)
- [**Sources**](#sources)
- [**License**](#license)

<hr style="background: #333">

## Description 

This project is about creating a Dashboard representing the Statistics of Zone01's talents within the 01-edu System Platform.  
The program should log the **Talent** in the platform to get a **JSON Web Token (JWT)**.  
That token will be used to send subsequent requests with **GraphQL queries** to Get specific Data from the API.  
Finally, the program will graphically represent the Data in the page using **Scalar Vector Graphics (SVG)**.

###### [*Table of Content ⤴️*](#table-of-contents)

<hr style="background: #333">

## Tech Stack

### Languages

Click on badges to get to the code...

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](src/index.html)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](src/styles/global.css/style.css)
[![JAVASCRIPT](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](src/app.js)

### API & Auth

Click on badges to get to the code...

[![GRAPHQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)](src/graphql/profile.gql.js)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)](src/components/form.js)

### Development

[![VERCEL](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://graph01.vercel.app/)
[![WARP](https://img.shields.io/badge/warp-01A4FF?style=for-the-badge&logo=warp&logoColor=white)]()
[![SHELL SCRIPT](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)](./gitify.sh)
[![MARKDOWN](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](#table-of-contents)

### OS & Version Control

[![MAC OS](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white)]()
[![GITHUB](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/D4rkJvck/graphql.git)

###### [*Table of Content ⤴️*](#table-of-contents)

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
    |     |     |     + -- area.js
    |     |     |     |
    |     |     |     + -- bar.js
    |     |     |     |
    |     |     |     + -- donut.js
    |     |     |     |
    |     |     |     + -- pie.js
    |     |     |     |
    |     |     |     + -- radar.js
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
    |     |     + -- extract.js
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

###### [*Table of Content ⤴️*](#table-of-contents)

<hr style="background: #333">

## Usage

The first step is to get to [Graph01](https://graph01.vercel.app/) in your browser. The address will automatically send to the Login page.

### Login

The login form should be filled with the user GIT pseudo (for ex. jefaye) and the corresponding password. This should send the homepage data suffice it the user is a Talent of the Zone 01 of Dakar.

![LOGIN](src/assets/screenshot-login-page.png)

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

The fetched data from the Graph queries are then displayed in the Dashboard as such:
  - Profile Section:
    - Git pseudo, Complete Name and Avatar depending on the Gender
    - XP with the amount and suitable unit from conversion depending on the amount
    - Rank Denomination depending on the Level
    - Audit Ratio with a representation of the proportion of received audits and audits done

  - Graph Section:
    - XP Progression in an year interval from the current date
    - Top 5 Projects with the largest amount of XP
    - Top 10 Skills with the highest percentage
    - XP amount per month in a year interval from the current date


```mermaid
  sequenceDiagram
    participant Talent
    participant API
    
    Talent ->> API: POST Request + Query + Token
    API ->> API: CHECK Token
    API ->> API: GENERATE Response
    API -->> Talent: GET Data
```

![HOME](src/assets/screenshot-home-page.png)

###### [*Table of Content ⤴️*](#table-of-contents)

<hr style="background: #333">

## Aknowledgements

[![PEER](https://img.shields.io/badge/Zone01-mamoundiaye-blue)](https://learn.zone01dakar.sn/git/mamoundiaye)  
[![PEER](https://img.shields.io/badge/Zone01-khthiam-blue)](https://learn.zone01dakar.sn/git/khthiam)  
[![PEER](https://img.shields.io/badge/Zone01-mandaw-blue)](https://learn.zone01dakar.sn/git/mandaw)  
[![PEER](https://img.shields.io/badge/Zone01-cheikhndiaye-blue)](https://learn.zone01dakar.sn/git/cheikhndiaye)  

###### [*Table of Content ⤴️*](#table-of-contents)

<hr style="background: #333">

## Sources

[![YOUTUBE](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://www.youtube.com)  
[![GEMINI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://gemini.google.com/app)  

###### [*Table of Content ⤴️*](#table-of-contents)

<hr style="background: #333">

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
