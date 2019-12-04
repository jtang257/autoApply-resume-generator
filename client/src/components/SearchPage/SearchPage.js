import React from 'react';
import './SearchPage.scss';
import SearchIcon from '../../assets/icons/search-icon.svg';
import JobComponent from '../JobComponent/JobComponent.js';
import Axios from 'axios';
import Fuse from 'fuse.js';
import postingBackgrounds from '../../assets/images/posting-backgrounds/postingBackgroundImages.js';

class SearchPage extends React.Component {

    // State houses job posting data, which is populated by function postingsQuery
    // State houses searchToggle, which determines onHover whether function searchBarRender shows the search icon
    // or the full search bar
    // State houses job profiles, which is populated by function profileQuery  
    state = {
        postingData : null,
        searchToggle : false,
        jobProfiles : null
    }

    // this function takes the postingData stored in state and renders JobComponent for all the postings stored 
    // in the array, and passed down as props
    postingGenerator = () => {
        let postings = this.state.postingData;
        let profiles = this.state.jobProfiles;
        let postingsArray = []
        if (postings) {
            for (let i = 0; i < postings.length; i++) {
                let randomImageIndex = this.imageRandomizer(postings.length);
                postingsArray.push(<JobComponent {...postings[i]} profiles={profiles} image={postingBackgrounds[randomImageIndex]} />)  
            }
            return postingsArray;
        } else {
            return null;
        }
    }

    // this function determines which stored background image is rendered for each JobComponent

    imageRandomizer = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // this function is an API GET request for all JobPostings. The full object is returned and then passed to
    // a fuse.js search function (searchQuery) which parses out the postings that match the search query, before setting state
    // with the queried job postings. Postings are then rendered by function postingGenerator
    postingsQuery = (event) => {
        event.preventDefault();
        const url = "http://localhost:8080"
        const path = "/search"
        const searchTerm = event.target.search.value;
        Axios.get(url+path)
            .then((res) => {
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

    // searchQuery uses fuse.js library to parse out the JobPostings based on the search term
    // In fuse.js, options are passed to the fuse object as search parameters. Keys determined which keys in the
    // object will be searched, and threshold determines how close the match needs to be to be returned
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

    profileQuery = () => {
        const url = "http://localhost:8080/";
        const path = "profiles";

        Axios.get(url+path)
            .then((res) => {
                let stateCopy = this.state;
                stateCopy.jobProfiles = res.data;
                this.setState({
                    stateCopy
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidMount() {
        this.profileQuery();
    }

    // onHover, this function setsState for search toggle to true
    searchBarSwitch = () => {
        const stateCopy = this.state;
        stateCopy.searchToggle = true;

        this.setState({
            stateCopy
        })
    }
    
    // this function renders the search bar based on what is stored in state. If searchToggle is true, the full
    // bar is rendered

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