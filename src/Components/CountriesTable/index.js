import { useState } from 'react'
import Link  from 'next/link'
import styles from './CountriesTable.module.css'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

const orderBy = (countries, value, direction) => {

	console.log(value);
	if (direction === 'asc') {
		return [...countries].sort((a, b) => a[value] > b[value] ? 1 : -1)
	} else if (direction === 'desc') {
		return [...countries].sort((a, b) => a[value] > b[value] ? -1 : 1)
	}

	return countries;
}

const SortArrow = ({ direction }) => {
	if (!direction) {
		return null;
	}
	if (direction === 'desc') {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowDown />
			</div>
		);
	} else {
		return (
			<div className={styles.heading_arrow}>
				<KeyboardArrowUp />
			</div>
		)
	}
}

const CountriesTable = ({ countries }) => {

	const [direction, setDirection] = useState();
	const [value, setValue] = useState();

	const orderedCountries = orderBy(countries, value, direction);
	const switchDirection = () => {
		if (!direction) {
			setDirection('desc');
		} else if (direction === 'desc') {
			setDirection('asc');
		} else {
			setDirection(null);
		}
	}
	const setValueAndDiretion = (value) => {
		switchDirection();
		setValue(value)
	}
	return (
		<div>
			<div className={styles.heading}>
				<div className={styles.heading_flag}></div>
				<button className={styles.heading_name} onClick={() => setValueAndDiretion("name")}>
					<div>Name</div>
					{value === "name" && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_population} onClick={() => setValueAndDiretion("population")}>
					<div>Population</div>
					{value === "population" && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_area} onClick={() => setValueAndDiretion("area")}>
					<div>Area (km <sup style={{fontSize: "0.5rem"}}>2</sup>)</div>
					{value === "area" && <SortArrow direction={direction} />}
				</button>

				<button className={styles.heading_gini} onClick={() => setValueAndDiretion("gini")}>
					<div>Gini</div>
					{value === "gini" && <SortArrow direction={direction} />}
				</button>
			</div>
			{orderedCountries.map((country, index) => (
				<Link href={`/country/${country.alpha3Code}`} key={index}>
					<div className={styles.row}>
						<div className={styles.flag}>
							<img src={country.flag} alt={country.name}/>
						</div>
						<div className={styles.name}>
							{country.name}
						</div>
						<div className={styles.population}>
							{country.population}
						</div>
						<div className={styles.area}>
							{country.area || 0}
						</div>
						<div className={styles.gini}>
							{country.gini || 0}
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default CountriesTable