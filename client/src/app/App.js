import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from '../routes/Home';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ManageAccount from '../components/Account/ManageAccount/ManageAccount';
import MyAccount from '../components/Account/MyAccount/MyAccount';
import Shop from '../components/Shop/Shop';
import ItemView from '../routes/ItemView';
import CategoryView from '../routes/CategoryView';
import SearchView from '../routes/Search';
import Login from '../components/Authentication/Login/Login';
import Register from '../components/Authentication/Register/Register';
import Wishlist from '../components/Wishlist';
import Checkout from '../components/Checkout/Checkout';

import CartItemsProvider from '../Context/CartItemsProvider';
import WishItemsProvider from '../Context/WishItemsProvider';
import SearchProvider from '../Context/SearchProvider';

function App() {
  return (
    <CartItemsProvider>
      <WishItemsProvider>
        <SearchProvider>
          <Router>
            <Header />

            <Routes>
              {/* Home */}
              <Route index element={<Home />} />

              {/* Account routes */}
              <Route path="/account">
                <Route path="me" element={<MyAccount />} />
                <Route path="manage" element={<ManageAccount />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<Login />} />
              </Route>

              {/* Shop */}
              <Route path="/shop" element={<Shop />} />

              {/* Category */}
              <Route path="/category/:id" element={<CategoryView />} />

              {/* Item routes */}
              <Route path="/item/:category/:id" element={<ItemView />} />

              {/* Wishlist */}
              <Route path="/wishlist" element={<Wishlist />} />

              {/* Search */}
              <Route path="/search/*" element={<SearchView />} />

              {/* Admin (example) */}
              <Route path="/admin" element={<Wishlist />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Home />} />
            </Routes>

            <Footer />
          </Router>
        </SearchProvider>
      </WishItemsProvider>
    </CartItemsProvider>
  );
}

export default App;
