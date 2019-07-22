import React from 'react';
import { observer } from 'mobx-react';
import styles from './SearchOptions.module.css';

function OptionsComponent(props) {
    const buttonNames = props.buttonNames;
    const buttonDefaultTexts = props.buttonDefaultTexts;
    const buttonOptions = props.buttonOptions;
    const searchText = props.searchText;


    return (
        <div className={styles.search}>
            <div className={styles.searchText}>
                {searchText}
            </div>
            <div className={styles.searchButtonsArea}>
                {
                    buttonNames.map((name, index) => (
                        <select className={styles.dropbtn} name={name} defaultValue="defOpt" key={name}>
                            <option className={styles.dropdownContent} value="defOpt" disabled hidden>
                                    {buttonDefaultTexts[index]}</option>
                            
                            {buttonOptions[index].map((optionText) => (
                                <option className={styles.dropdownContent} key={optionText}>{optionText}</option>
                            ))}
                        </select>

                    ))
                }
                <button className={styles.searchButton}>SEARCH</button>
            </div>
        </div>
    )
}

export const SearchOptions = observer(OptionsComponent);