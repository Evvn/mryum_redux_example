import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';

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
