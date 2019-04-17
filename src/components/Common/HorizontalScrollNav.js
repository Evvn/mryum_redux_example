import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash'
// import DragScroll from 'react-dragscroll';

class HorizontalScrollNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          dragging: false,
          scrollPosition: 0,
          current: false,
        };
        this.current = false;
        this.scrollPosition = 0;
    }


    componentDidMount() {
        window.addEventListener('mouseup', this.mouseUpHandle.bind(this));
        window.addEventListener('mousemove', this.mouseMoveHandle.bind(this));
        // add event listener on scroll with throttling to prevent excessive events being fired
        window.addEventListener('scroll', _.throttle(this.scrollHandle.bind(this), 300, { trailing: true, leading: true }))
        // window.addEventListener('scroll', this.scrollHandle.bind(this));
        
        
    }

      componentWillUnmount() {
        window.removeEventListener('mouseup', this.mouseUpHandle.bind(this));
        window.removeEventListener('mousemove', this.mouseMoveHandle.bind(this));
        window.removeEventListener('scroll', this.scrollHandle.bind(this));
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        this.current = false;
    }

    sortByValue(obj){
        const newObj = {};
        const sortable = Object.keys(obj).map((key,index) => [key, obj[key], obj[Object.keys(obj)[index+1]]]);
        sortable.sort((a,b) => a[1] - b[1]);
        sortable.forEach(obj => {
          newObj[obj[0]] = [obj[1], obj[2] ? obj[2] : Infinity]; 
        });

    
        return newObj;
      } 


    componentDidUpdate(){
        if (this.current){
            document.getElementById(this.current).classList.add("red")
        }
    }

    scrollHandle(e){
        this.scrollPosition= window.scrollY;
    }

    autoChangeSection(ref){
        const { current } = this;
        if (!current){
            this.current = ref;
        } else if(current !== ref && this[ref]){
                this.refs.container.scrollLeft = this[ref].offsetLeft
                this.current = ref;
        }
    }

    sectionClickHandle(e, offset, ref){
        document.getElementById(ref).classList.add("red")
        document.getElementById(this.current).classList.remove("red")
        this.refs.container.scrollLeft = this[ref].offsetLeft;
        window.removeEventListener('scroll', this.scrollHandle.bind(this));
        window.scrollTo({
            top: offset,
            behavior: 'smooth',
        });
        window.addEventListener('scroll', this.scrollHandle.bind(this));
        this.current = ref;
        e.preventDefault();
    }

    mouseUpHandle(e) {
        if (this.state.dragging) {
          // const dragging = false;
          this.setState(this.state);
        }
      }

    mouseDownHandle(e) {
        if (!this.state.dragging) {
          // this.state.dragging = true;
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
        // eslint-disable-next-line
        const { sectionPositions} = this.props;
        const sectionNames = Object.keys(sectionPositions);
        const sortedPositions = this.sortByValue(sectionPositions);
        return (
            <div
                className="selectSection"
                onMouseUp={this.mouseUpHandle.bind(this)}
                onMouseMove={this.mouseMoveHandle.bind(this)}
                ref="container"
            >
                    {sectionNames.map((section,index)  => {
                        const y = this.scrollPosition;
                        const sectionInterval = sortedPositions[section];
                        if (y >= sectionInterval[0] && y < sectionInterval[1]){
                            this.autoChangeSection(`$scroll-nav-${section}`);
                        }

                        return (
                            <span 
                                onClick={(e) => {this.sectionClickHandle(e, sectionPositions[section], `$scroll-nav-${section}`)}} 
                                ref={(ref) => this[`$scroll-nav-${section}`]=ref}
                                id={`$scroll-nav-${section}`}
                            >
                                {section}
                            </span>
                        );
                    })}
            </div>
        );
    }
};

export default HorizontalScrollNav;
