import "./Footer.css";

const template = () =>`<div id="footer">
    <div id="vide"></div>
    <div id="footer-test" class="align">
        <h2 id="footerText">¡Hazte con todos!</h2>
        <p>Un proyecto de NEOLAND ft. POKEMON</p>
        <p id="creator">Creado por Elena Ruano Herrera</p>
    </div>

    <div class="social-icons">
    <a class="profile-link" href="https://twitter.com/eleruano94" target="_blank">
        <i class="fab fa-twitter"></i>
    </a>
    <a class="profile-link" href="https://www.instagram.com/elenaruano94/" target="_blank">
        <i class="fab fa-instagram"></i>
    </a>
    <a class="profile-link" href="https://www.linkedin.com/in/elena-ruano-44723a194/" target="_blank">
        <i class="fab fa-linkedin-in"></i>
    </a>
    </div>
</div>
`;

export const PrintTemplateFooter = () => {
    document.querySelector("footer").innerHTML = template();
};