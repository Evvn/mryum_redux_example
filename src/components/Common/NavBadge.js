import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import uuid from 'uuid/v4';

class NavBadge extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if(this.className === 'red'){
            const { updateSection } = this.props;
            const offset = ReactDOM
            .findDOMNode(this).offsetLeft;
            updateSection(offset);
        }
    }

    render(){
    // eslint-disable-next-line
        const { section, onSelect, currentPosition, interval } = this.props;
        this.className = currentPosition >= interval[0]-50 && currentPosition < interval[1]-50 ? 'red' : '';

        return (
            <span
                style={{cursor: 'pointer'}}
                onClick={(e) => {onSelect(e)}}
                id={`$scroll-nav-${section}`}
                key={uuid()}
                className={this.className}
            >
                {section}
            </span>
        );
    }
}

export default NavBadge;
