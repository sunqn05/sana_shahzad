import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import OceanIntro from "../OceanIntro";
import SkillsLoop from "../SkillsLoop";
import Cards from "../Cards";
import Archive from "../Archive";
import Footer from '../Footer';

function Home () {
    return (
        <>
        <HeroSection/>
        <SkillsLoop />
        <OceanIntro />
        <Cards />
        <Archive />
        <Footer />
        </>
    )
};

export default Home;