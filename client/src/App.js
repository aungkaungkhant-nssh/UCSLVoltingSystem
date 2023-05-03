import UserAuth from './pages/auth/UserAuth';
import AdminAuth from './pages/auth/AdminAuth';
import Home from './pages/user/Home'
import {createTheme,colors,ThemeProvider} from "@mui/material";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom';
import ProtectedUserRoute from './middleware/ProtectedUserRoute';
import ProtectedAdminRoute from './middleware/ProtectedAdminRoute';
import Dashboard from './pages/admin/Dashboard';
import AddCategory from './pages/admin/category/AddCategory';
import CategoryLists from './pages/admin/category/CategoryLists';
import AddVoted from './pages/admin/voted/AddVoted';
import VotedLists from './pages/admin/voted/VotedLists'
const theme = createTheme ({
  palette:{
    primary:{
      main:colors.lime[500]
    }
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>  
          <Route path="/" element={<UserAuth />} />
          <Route path='/vote' element={<ProtectedUserRoute><Home /></ProtectedUserRoute>} />
          <Route path='/admin/login' element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>} />
          <Route path="/admin/add-category" element={<ProtectedAdminRoute><AddCategory /></ProtectedAdminRoute>}></Route>
          <Route path="/admin/lists-category" element={<ProtectedAdminRoute><CategoryLists /></ProtectedAdminRoute>}></Route>
          <Route path="/admin/edit-category/:id" element={<ProtectedAdminRoute><AddCategory /></ProtectedAdminRoute>}></Route>
          <Route path="/admin/add-voted" element={<ProtectedAdminRoute><AddVoted /></ProtectedAdminRoute>}></Route>
          <Route path='/admin/lists-voted' element={<ProtectedAdminRoute><VotedLists /></ProtectedAdminRoute>}></Route>
          <Route path="/admin/edit-voted/:id" element={<ProtectedAdminRoute><AddVoted /></ProtectedAdminRoute>}></Route>
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
