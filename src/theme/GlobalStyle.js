import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&display=swap');
    *, *::before, *::after {
        box-sizing: border-box;
        // Font Antialiasing https://devhints.io/css-antialias
        // Fonty są faktycznie cieńsze niż gdybyśmy nie dodali tych dwóch linijek
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    html {
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem;
        font-family: "Montserrat", sans-serif;
        background: #222831;
        margin: 0;
        padding: 0;
    }
    
    // This styles are here because I don't figure out how to add styles to the flatpickr input that was on top of datetime picker...
    // So I turn off this and I solve my problem in another way
    input{
      display: none;
    }
`;

export default GlobalStyle;
