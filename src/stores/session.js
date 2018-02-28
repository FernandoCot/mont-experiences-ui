import { Connect, mix } from 'fronto-connect';
import scopes from './scopes';
import { observable, action } from 'mobx';
import { browserHistory } from 'react-router';

class Session extends Connect {
    namespace = 'v1';
    resource = 'sessions';

    @observable signedIn = false;
    @observable email = null;

    @action setSignedIn(status, email) {
        this.signedIn = status;
        if (status && email) {
            this.email = email;
        }
    }
    @action signOut(){
        localStorage.removeItem('email');
        localStorage.removeItem('token');

        this.signedIn = false;
        this.email = null;
        this.isLoading = false;
    }
    
    signIn(email = null, password = null) {
        const store = {
            authentication_token: localStorage.getItem('token'),
            email: localStorage.getItem('email')
        }


        if (store.authentication_token && store.email) {
            this.signInFromStorage(store.email);
        } else if (email && password) {
            this.setIsLoading(true);
            this.create({}, { email, password }, {
                201: (body) => {
                    const { authentication_token, email } = body;
                    localStorage.setItem('email', email);
                    localStorage.setItem('token', authentication_token);

                    this.signInFromStorage(email);
                },
                401: () => {
                    // this.setState(response);
                    // console.log(this.state.errors.name[0]);
                }
            })
        }
    }
    @action signInFromStorage(email) {
        this.findAll({}, {
            200: () => {
                this.email = email;
                this.signedIn = true;
                this.isLoading = false;
            },
            default: () => {
                this.signOut();
            }
        });
        this.email = localStorage.getItem('email');
        this.signedIn = true;
        this.isLoading = false;
    }
}

mix(Session, scopes.readable);
mix(Session, scopes.writable);

export default Session;