import { LastFive } from '../../components/LastFive/LastFive';
import * as React from 'react'
import { SameDay } from '../SameDay/SameDay';
import LookupFilm from '../LookupFilm/LookupFilm';

const Home = () => {
    return (
        <React.Fragment>
            <div>
            <LookupFilm/>
            </div>
            <div>
            <SameDay/>
            </div>
            <div>
            <LastFive/>
            </div>
        </React.Fragment>
    )
}

export default Home