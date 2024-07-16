import React from 'react';
import {useNavigate} from "react-router-dom";

class ScrollToTopBase extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}

// Wrapper functional component to use hooks
function ScrollToTop(props) {
    const navigate = useNavigate();

    return <ScrollToTopBase {...props} navigate={navigate} />;
}

export default ScrollToTop;