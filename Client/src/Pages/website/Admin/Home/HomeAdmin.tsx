import React from 'react'
import HeroAdmin from './HeroAdmin'
import PresentationAdmin from './PresentationAdmin'
import ValueAdmin from './ValueAdmin'

const HomeAdmin: React.FC = () => {
    return (
        <div className='space-y-6 md:space-y-8' >
            <HeroAdmin />
            <PresentationAdmin />
            <ValueAdmin />
        </div>
    )
}

export default HomeAdmin