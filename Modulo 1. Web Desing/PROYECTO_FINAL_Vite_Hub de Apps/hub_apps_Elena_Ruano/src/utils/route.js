import { getUser } from "../global/state/globalState";
import { Login, printTemplateDashboard, PrintPokedexPage, PrintPokeQuizPage} from "../pages";

export const initControler = (pagesRender) => {
    console.log("soy el user", getUser().name);

    switch (pagesRender) {
        case undefined:
            localStorage.getItem(getUser().name) ? printTemplateDashboard() : Login();
            break;

        case "Dashboard":
            printTemplateDashboard();
            break;

        case "Pokedex":
            PrintPokedexPage();
            break;

        case "Pokequiz":
            PrintPokeQuizPage();
            break;
    
        case "Login":
            Login();
            break;
        }
};