
import { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import SearchInput from '../Components/SearchInput'
import CountriesTable from '../Components/CountriesTable'
import styles from '../styles/Home.module.css'
/**
 * Home Component
 */

const Home = ({ countries }) => {
    const [keyword, setKeyword] = useState("");
    const filteredCoountries = countries.filter(country =>
        country.name.toLowerCase().includes(keyword) ||
        country.region.toLowerCase().includes(keyword) ||
        country.subregion.toLowerCase().includes(keyword)

    )

    const handleInputChange = (e) => {
        e.preventDefault();

        setKeyword(e.target.value.toLowerCase())
    }
    return (
        <Layout>
            <div className={styles.top_bar}>
                <div className={styles.counts}>Found {countries.length} countries</div>
                <div className={styles.input}>
                    <SearchInput placeholder="Filter by Name, Region or SubRegion" onChange={handleInputChange} />
                </div>
            </div>
            <CountriesTable countries={filteredCoountries} />
        </Layout>
    )
}

export default Home;

export const getStaticProps = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all')
    const countries = await res.json();
    return {
        props: {
            countries,
        }
    }
}