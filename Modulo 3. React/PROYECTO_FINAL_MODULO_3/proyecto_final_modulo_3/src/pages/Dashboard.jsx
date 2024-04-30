import './Dashboard.css'

export const Dashboard = () => {
    return(
        <>
            <div className='homePage'>
                <h2 className='animate__animated animate__backInDown welcomeText'>DASHBOARD</h2>
                <h3 className='subTitleHome'>¡Vaya! Parece que esta página aun está en construccion</h3>
                <h3 className='subTitleHome'>Vuelva en otro momento por favor</h3>
            </div>

            <div className="whiteContainer"></div>
            <iframe src="https://giphy.com/embed/srH7tMXG0tXymEPHJU" width="200" height="200" frameBorder="0" className="dashboardGif_1" ></iframe>
        </>
    )
};