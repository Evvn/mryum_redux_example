import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';
import classNames from 'classnames';


const HorizontalScrollNav = (props) => {

    const { sections } = props;
    console.log(sections)
    return (
        <div className="selectSection">
            <HorizontalScroll>
                {sections.map(section => (
                    <span className="red">
                        {section}
                    </span>
                ))}
            </HorizontalScroll>
        </div>
    )

};

export default HorizontalScrollNav;