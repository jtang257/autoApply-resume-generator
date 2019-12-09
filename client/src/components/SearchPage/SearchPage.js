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
        jobProfiles : null,
        loadingSpinnerSwitch : false
    }

    // this function takes the postingData stored in state and renders JobComponent for all the postings stored 
    // in the array, and passed down as props
    postingGenerator = () => {
        let postings = this.state.postingData;
        let profiles = this.state.jobProfiles;
        let postingsArray = [];
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
                this.setState({
                    postingData : this.searchQuery(searchTerm, res.data)
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
                this.setState({
                    jobProfiles : res.data
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
        this.setState({
            searchToggle : true
        })
    }
    
    // this function renders the search bar based on what is stored in state. If searchToggle is true, the full
    // bar is rendered

    searchBarRender = () => {
        if (this.state.searchToggle) {
            return (
                <div className="search__bar-container">
                    <form className="search__form" onSubmit={(e) => {this.postingsQuery(e)}}>
                        <input className="search__search-input" type= "text" name="search" id="search" placeholder="search for a job posting"/>
                        <button className="search__submit-button" type="submit" id="search-btn" onMouseEnter={this.searchBarSwitch} onClick={this.loadingSpinnerSwitch}>
                            <img className="search__icon" src={SearchIcon} />
                        </button>
                    </form>
                    {this.loadingSpinnerRender()}
                </div> 
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

    // Loading spinner render & toggle switch

    loadingSpinnerRender = () => {
        if (this.state.loadingSpinnerSwitch) {
            return (
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            )
        }
    }

    loadingSpinnerSwitch = () => {
        this.setState({
            loadingSpinnerSwitch : true
        })
        setTimeout(() => {
            this.scrollToRef();
        }, 2001)

    }

    componentDidUpdate() {
        if (this.state.loadingSpinnerSwitch) {            
            setTimeout(() => {
                this.setState({loadingSpinnerSwitch : false}) 
            }, 2000)   
        } else {
            return
        }
    }

    // Creating a ref to access the section div on scroll

    myRef = React.createRef();

    scrollToRef = () => {
        console.log("test");
        window.scrollTo({
        left : 0, 
        top : this.myRef.current.offsetTop,
        behavior: 'smooth'})     
    }

    render() {
        console.log("ran");
        
        return(
            <>
                <div className="search">
                    <div className="search__hero">
                        {this.searchBarRender()}
                    </div>
                    <div className="search__section-content" ref={this.myRef}>
                        {this.postingGenerator()}
                    </div>
                </div>
                
            </>
        )
    }
}

export default SearchPage;