import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            let result = null;
            if(this.state.error) {
                result = <div style = {{textAlign : 'center', font : 'message-box', marginTop : '80px'}}> Some Error Occured !</div>;
            }

            else{
                result = <WrappedComponent {...this.props} />;
            }
            return (
                <Aux>
                    {result}
                </Aux>
            );
        }
    }
}

export default withErrorHandler;