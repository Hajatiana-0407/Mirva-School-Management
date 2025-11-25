import React from 'react'
import HeroAdmin from './HeroAdmin'
import PresentationAdmin from './PresentationAdmin'
import ValueAdmin from './ValueAdmin'

const HomeAdmin: React.FC = () => {
    return (
        <div className='space-y-6 md:space-y-8' >
            <section data-section='admin-hero'>
                <HeroAdmin />
            </section>
            <section data-section='admin-presentation'>
                <PresentationAdmin />
            </section>
            <section data-section='admin-value'>
                <ValueAdmin />
            </section>
        </div>
    )
}

export default HomeAdmin