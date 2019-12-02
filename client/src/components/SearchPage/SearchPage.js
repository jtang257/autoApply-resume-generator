import React from 'react';
import './SearchPage.scss';
import SearchIcon from '../../assets/icons/search-icon.svg';
import JobComponent from '../JobComponent/JobComponent.js';
import Axios from 'axios';
import Fuse from 'fuse.js';
import postingBackgrounds from '../../assets/images/posting-backgrounds/postingBackgroundImages.js';

class SearchPage extends React.Component {

    state = {
        postingData : null,
        searchToggle : false,
    }


    postingGenerator = () => {
        let postings = this.state.postingData;
        let postingsArray = []
        if (postings) {
            for (let i = 0; i < postings.length; i++) {
                let randomImageIndex = this.imageRandomizer(postings.length);
                postingsArray.push(<JobComponent {...postings[i]} image={postingBackgrounds[randomImageIndex]} />)  
            }
            return postingsArray;
        } else {
            return null;
        }
    }

    imageRandomizer = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    postingsQuery = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080"
        const path = "/search"
        const searchTerm = event.target.search.value;
        Axios.get(url+path)
            .then((res) => {
                console.log(this.searchQuery(searchTerm, res.data))
                let stateCopy = this.state;
                stateCopy.postingData = this.searchQuery(searchTerm, res.data)
                this.setState({
                    stateCopy
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    searchQuery = (searchTerm, postings) => {
        const search = searchTerm;
        const allJobPostings = postings;

        const options = {
            keys : ['category', 'city', 'companyName', 'position', 'pay', 'rating', 'urgency'],
            threshold : 0.2

        }
        let fuse = new Fuse(allJobPostings, options);
        return fuse.search(search);
    }

    searchBarSwitch = () => {
        const stateCopy = this.state;
        stateCopy.searchToggle = true;

        this.setState({
            stateCopy
        })
    }

    searchBarRender = () => {
        if (this.state.searchToggle) {
            return (
                <form className="search__form" onSubmit={(e) => {this.postingsQuery(e)}}>
                    <input className="search__search-input" type= "text" name="search" id="search" placeholder="search for a job posting"/>
                    <button className="search__submit-button" type="submit" id="search-btn" onMouseEnter={this.searchBarSwitch}>
                        <img className="search__icon" src={SearchIcon} />
                    </button> 
                </form>
            )} else {
                return (
                    <form className="search__form" onSubmit={(e) => {this.postingsQuery(e)}}>
                        <button className="search__submit-button" type="submit" id="search-btn" onMouseEnter={this.searchBarSwitch}>
                            <img className="search__icon" src={SearchIcon} />
                        </button> 
                    </form>
                )
        }
    }

    render() {
        return(
            <>
                <div className="search">
                    <div className="search__hero">
                        {this.searchBarRender()}
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