import React from 'react';
import DragScroll from 'react-dragscroll';
import classNames from 'classnames';


const HorizontalScrollNav = (props) => {

    const { sections } = props;
    console.log(sections)
    return (
        <div className="selectSection">
            <DragScroll>
                {sections.map(section => (
                    <span className="red">
                        {section}
                    </span>
                ))}
            </DragScroll>
        </div>
    )

};

export default HorizontalScrollNav;
