import React from 'react';
import './Triangle.scss';

class Triangle extends React.Component {
    render() {
        return(
            <>
                <div className={this.props.passedClassOuter}></div>
                <div className={this.props.passedClassInner}></div>
            </>
        )
    }
}

export default Triangle;