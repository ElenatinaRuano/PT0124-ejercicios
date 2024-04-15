import "./Image.css"

export const Image = ({src, alt, width, height}) => {

    return (
        <figure>
            <img src={src} alt={alt} width={width} height={height} />
            <h3>{alt}</h3>
        </figure>
    )
}