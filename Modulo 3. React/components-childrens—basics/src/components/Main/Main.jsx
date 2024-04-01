import { Image } from "../Image/Image";
import { SubTitle } from "../SubTitle/SubTitle";

export const Main = () => {
    return (
        <figure>
            <SubTitle text="Este es mi primer ejercicio de childrens. Este es el main de mi ejercicio"/>
            <Image 
                src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20220321104813/parentcom.png"
                alt = {"Estamos haciendo un ejercicio para entender como funcionan los childrens en Reacts"}
                width = "50%"
                heigth = "70%"/>
        </figure>
    )
}