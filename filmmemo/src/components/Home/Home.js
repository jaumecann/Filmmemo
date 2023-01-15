import { LastFive } from '../../components/LastFive/LastFive';
import * as React from 'react'
import { SameDay } from '../SameDay/SameDay';

const Home = () => {
    return (
        <React.Fragment>
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