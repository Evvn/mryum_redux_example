import React from 'react';
import HorizontalScroll from 'react-scroll-horizontal';

const HorizontalScrollNav = (props) => {

    const { sections } = props;

    return (
        <div>
            <HorizontalScroll>
                {sections.map(section => (
                    <div>
                        {section}
                    </div>
                ))}
            </HorizontalScroll>
        </div>
    )

};

export default HorizontalScrollNav;