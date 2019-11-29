import React from 'react';
import './SearchPage.scss';
import SearchIcon from '../../assets/icons/search-icon.svg';
import JobComponent from '../JobComponent/JobComponent.js';
import Axios from 'axios';

class SearchPage extends React.Component {

    state = {
        postingData : null
    }

    postingGenerator = () => {
        let postings = this.state.postingData;
        let postingsArray = []
        console.log(postings);
        if (postings) {
            for (let i = 0; i<10; i++) {
                postingsArray.push(<JobComponent {...postings[i]} />)  
            }
            return postingsArray;
        } else {
            return null;
        }
    }

    postingsQuery = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080"
        const path = "/search"
        Axios.get(url+path)
            .then((res) => {
                this.setState({
                    postingData : res.data
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return(
            <>
                <div className="search">
                    <div className="search__hero">
                        <form className="search__form" onSubmit={(e) => {this.postingsQuery(e)}}>
                            <input className="search__search-input" type= "text" name="search" id="search"/>
                            <button className="search__submit-button" type="submit" id="search-btn">
                                {/* <img className="search__icon" src={SearchIcon} /> */}
                            </button> 
                        </form>
                    </div>
                    <div className="search__section-content">
                        {this.postingGenerator()}
                    </div>
                </div>
                
            </>
        )
    }
}

export default SearchPage;