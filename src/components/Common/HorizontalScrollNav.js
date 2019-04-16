import React from 'react';
import DragScroll from 'react-dragscroll';

class HorizontalScrollNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dragging: false,
          scrollPosition: 0,
        };
    }

    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUpHandle.bind(this));
        window.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
        window.addEventListener('scroll', this.scrollHandle.bind(this));
    }
    
      componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUpHandle.bind(this));
        window.removeEventListener('mousemove', this.mouseMoveHandle.bind(this));
        window.removeEventListener('scroll', this.scrollHandle.bind(this));
    }

    scrollHandle(e){
        this.setState({scrollPosition: window.scrollY});
    }

    mouseUpHandle(e) {
        if (this.state.dragging) {
          const dragging = false;
          this.setState(this.state);
        }
      }

    mouseDownHandle(e) {
        if (!this.state.dragging) {
          this.state.dragging = true;
          this.setState(this.state);
          this.lastClientX = e.clientX;
          this.lastClientY = e.clientY;
          e.preventDefault();
        }
      }
    
      mouseMoveHandle(e) {
        if (this.state.dragging) {
          this.refs.container.scrollLeft -=
            (-this.lastClientX + (this.lastClientX = e.clientX));
          this.refs.container.scrollTop -=
            (-this.lastClientY + (this.lastClientY = e.clientY));
        }
      }

    render() {
        const { sectionPositions, sectionNames } = this.props;
        const sections = Object.keys(sectionPositions);
        return (
            <div
                className="selectSection"
                onMouseUp={this.mouseUpHandle.bind(this)}
                onMouseMove={this.mouseMoveHandle.bind(this)}
                ref="container">
                {sections.map((section,index)  => {
                    const y = this.state.scrollPosition;
                    const sectionPosition = sectionPositions[section];
                    const nextPosition = sectionPositions[sections[index + 1]];
                    const nextValue = nextPosition ? nextPosition : -1;
                    const className = (y >= sectionPosition && y < nextValue) ? "red" : ''; 
                    console.log({
                        section, y, sectionPosition, nextPosition, className
                    })

                    return (
                        <span id={`$scroll-nav-${section}`}
                            className={className}>
                            {section}
                        </span>
                    );
                })}     
            </div>
        );
    }
};

export default HorizontalScrollNav;
