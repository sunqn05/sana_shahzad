import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import Quote from "../Quote";
import OceanIntro from "../OceanIntro";
import SkillsLoop from "../SkillsLoop";
import Cards from '../Cards';
import Footer from '../Footer';

function Home () {
    return (
        <>
        <HeroSection/>
        <SkillsLoop />
        <OceanIntro />
        <Quote />
        <Cards />
        <Footer />
        </>
    )
};

export default Home;