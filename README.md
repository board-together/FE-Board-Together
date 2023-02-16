# Board-Together FE

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/board-together">
    <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/board-together.png" alt="Logo">
  </a>

  <h1 align="center">Board (games) Together!</h3>

  <h3 align="center">
    Board Game Swap Application
    <br />
  </h3>
</div>

<!-- TABLE OF CONTENTS -->
<h4>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#deployment-information">Deployment Information</a></li>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#database-schema">Database Schema</a></li>
        <li><a href="#learning-goals">Learning Goals</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
          <li><a href="#repositories">Repositories</a></li>
          <li><a href="#frontend-repository-installation">Frontend Repository Installation</a></li>
          <li><a href="#available-endpoints">Available Endpoints</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</li>
    <li><a href="#license">License</a></li></a>
  </ol>
</h4>

<!-- ABOUT THE PROJECT -->
## About The Project

Board Together is a board game platform that allows users to create their own profiles and list their favorite board games. It utilizes GraphQL and PostgreSQL to create a seamless user experience and features API calls to the popular Board Game Atlas API to provide up-to-date information about various board games. With this platform, board game enthusiasts can keep track of their collection, discover new games to play, and connect with others who share their interests. The platform is easy to use and accessible to anyone who loves board games or wants to learn more about them.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Deployment Information -->
### Deployment Information

Board Together is a full-stack application combining a React frontend deployed to Surge, and Ruby on Rails backend deployed to Heroku. The frontend handles client-side tasks and displays data from the backend, which handles server-side logic and database operations. Deployment involves building the React frontend, integrating it with the Rails backend, and pushing the code to Heroku. The application can be accessed at the Surge URL.

* <a href="https://board-together.surge.sh/" alt="Surge Deployment">Frontend Surge Deployment</a><br>
* <a href="https://board-together.herokuapp.com/" alt="Heroku Deployment">Backend Heroku Deployment</a><br>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Built With -->
### Built With
<img width="90%" height="90%" alt="Board Together-FE-Tech Stack" src="https://user-images.githubusercontent.com/74210902/219136560-e6e6ce33-a3d9-497d-b022-71ed91a1604a.png">

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- Learning Goals -->
### Learning Goals

* Implement GraphQL/Apollo into React application to make API calls.
* Work in a full-stack development team.
* Utilize continuous integration with CircleCI.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Board Together utilizes a service oriented architecture with separate backend and frontend services. Installation instructions for the backend repository below. Frontend installation instructions can be found in the repository section. The Postman mock server below can be used to test the available endpoints. Expected request and response formats are listed for CRUD functionality.

<!-- Repositories -->
### Repositories

* <b>Frontend:</b> https://github.com/board-together/FE-Board-Together <br />
* <b>Backend:</b> https://github.com/board-together/BE-Board-Together <br />

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- Frontend Repository Installation -->
### Frontend Repository Installation

## Set Up

### Deployed at [board-together.surge.sh](https://board-together.surge.sh/)

### Local Installation
1. Clone the repo
   ```sh
   https://github.com/board-together/FE-Board-Together
   ```
2. Enter the directory and install NPM packages
   ```sh
   npm install
   npm start
   ``` 
3. Enter the following url in your browser: http://localhost:3000/
4. Explore the website



<p align="right">(<a href="#top">back to top</a>)</p>


```
</details><br>
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

MVP

* CRUD functionality for User and UserGames.
* Search for a board game utilizing [Board Game Atlas API](https://www.boardgameatlas.com/api/docs/search).
* Add board games to User collection.
* Track board games you have borrowed and board games you have lent out.

Stretch Goals

* Add friends feature, allowing a User to add friends and see that friend's games instead of all User's games.
* Implement User authentication using a OAuth provider.
* Create board game parties, where friends can arrange get togethers to play a certain game.
* Ability to add comments or reviews to games you have, or have borrowed.
* Email notifications for requests to borrow games.

See the [open issues](https://github.com/board-together/FE-Board-Together/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

<table>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/110054994?s=150&v=4"></td>
    <td><img src="https://avatars.githubusercontent.com/u/74210902?s=150&v=4"></td>
    <td><img src="https://avatars.githubusercontent.com/u/105405396?s=150&v=4"></td>
  </tr>
  <tr>
    <td>Brett Kuhn</td>
    <td>Spencer Haka</td>
    <td>Thomas Peterson</td>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/bkuhn2">GitHub</a><br>
      <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/brett-kuhn/">LinkedIn</a>
    </td>
    <td>
      <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/Speekins">GitHub</a><br>
      <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/spencer-haka/">LinkedIn</a>
    </td>
    <td>
      <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/github-logo.png" alt="github"> <a href="https://github.com/thomedpete">GitHub</a><br>
      <img src="https://github.com/board-together/BE-Board-Together/raw/main/public/linkedin-logo.png" alt="linkedin"> <a href="https://www.linkedin.com/in/thomas-peterson-web-dev/">LinkedIn</a>
    </td>
  </tr>
</table>

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Turing School of Software Design: [https://turing.edu/](https://turing.edu/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/board-together/FE-Board-Together.svg?style=for-the-badge
[contributors-url]: https://github.com/board-together/FE-Board-Together/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/board-together/FE-Board-Together.svg?style=for-the-badge
[forks-url]: https://github.com/board-together/FE-Board-Together/network/members
[stars-shield]: https://img.shields.io/github/stars/board-together/FE-Board-Together.svg?style=for-the-badge
[stars-url]: https://github.com/board-together/FE-Board-Together/stargazers
[issues-shield]: https://img.shields.io/github/issues/board-together/FE-Board-Together.svg?style=for-the-badge
[issues-url]: https://github.com/board-together/FE-Board-Together/issues
[license-shield]: https://img.shields.io/github/license/board-together/FE-Board-Together.svg?style=for-the-badge
[license-url]: https://github.com/board-together/FE-Board-Together/blob/master/LICENSE.txt
