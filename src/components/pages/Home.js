import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import SkillsLoop from "../SkillsLoop";
import Cards from '../Cards';
import Footer from '../Footer';

function Home () {
    return (
        <>
        <HeroSection/>
        <SkillsLoop />
        <Cards />
        <Footer />
        </>
    )
};

export default Home;