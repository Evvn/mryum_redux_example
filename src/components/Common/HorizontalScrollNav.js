import React from 'react';
import DragScroll from 'react-dragscroll';

const HorizontalScrollNav = (props) => {
    const { sections } = props;

    if (sections) {
      return (
        <div className="selectSection">
            <DragScroll>
                { sections.map(section => (
                    <span className="red">
                        {section}
                    </span>
                ))}
            </DragScroll>
        </div>
      )
    } else {
      return ('')
    }
};

export default HorizontalScrollNav;
