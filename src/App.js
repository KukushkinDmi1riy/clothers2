import React, {useEffect, lazy, Suspense} from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';

// import ShopPage from './pages/shop/shop.component.jsx'
//import CheckoutPage from './pages/chekcout/checkout.component.jsx'
// import HomePage from './pages/homepage/hompage.component'
//import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'
import Header from './components/header/header.component.jsx';
import Spinner from './components/spinner/spinner.component.jsx';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

import { GlobalStyle } from './global.styles'

import { checkUserSession } from './redux/user/user.actions'

const HomePage = lazy(() => import('./pages/homepage/hompage.component'));
const ShopPage = lazy(() => import( './pages/shop/shop.component.jsx'));
const SignInAndSignUpPage = lazy(() => import( './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx'));
const CheckoutPage = lazy(()=> import('./pages/chekcout/checkout.component.jsx'))
// const ErrorBoundaryPage = lazy(()=> import('./components/error-boundary/error-boundary.component'))

const App = ({checkUserSession, currentUser}) => {

  useEffect(()=>{
    checkUserSession()
  }, [checkUserSession])

    return (
      <div>
        <GlobalStyle/>
        <Header/>
        <Switch>
        <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path="/" component={HomePage}/>
              <Route path="/shop" component={ShopPage}/>
              <Route 
              exact 
              path="/signin" 
              render = {()=> 
                currentUser ? (
                  <Redirect to='/' />
                  ) : (
                  <SignInAndSignUpPage/>
                  ) 
            }
            />
              <Route exact path="/checkout" component={CheckoutPage}/>
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
  }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: ()=>dispatch(checkUserSession())
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
