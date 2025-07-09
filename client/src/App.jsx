import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import PostList from './pages/posts/PostList';
import PostDetail from './pages/posts/PostDetail';
import CreatePost from './pages/posts/CreatePost';
import EditPost from './pages/posts/EditPost';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/auth/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/posts" component={PostList} />
              <Route exact path="/posts/:id" component={PostDetail} />
              <ProtectedRoute exact path="/posts/create" component={CreatePost} />
              <ProtectedRoute exact path="/posts/:id/edit" component={EditPost} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/register" component={Register} />
              <Route path="*" component={NotFound} />
            </Switch>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;