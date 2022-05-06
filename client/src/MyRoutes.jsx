import { lazy, Suspense } from "react"
import { useRoutes } from "react-router-dom";
import ProgressBar from "src/components/UI/ProgressBar/ProgressBar";
import AddPostSkeleton from "./pages/admin/AddPostSkeleton";

// this function function for lazy route load...........
const ReactLazyPreload  = (importStatement)=>{
  const Component = lazy(importStatement)
  // Component.preload call when preload link clicked
  // @ts-ignore
  Component.preload = importStatement
  return Component
}


const AllSignInLite  = ReactLazyPreload(()=>import("./pages/auth/AllSignInLite"));
const AuthService = ReactLazyPreload(()=>import("./pages/auth/AuthService"));
const PostsFilterPageLite = ReactLazyPreload(()=>import("./pages/postFilterPage/PostsFilterPageLite"));
const HomePageLite = ReactLazyPreload(()=>import("./pages/homePage/HomePageLite"));
const About = ReactLazyPreload(()=>import("./components/about/About"));

const PostDetailSimple = ReactLazyPreload(()=>import("./pages/postDetails/PostDetailSimple"));
const AddPost = ReactLazyPreload(()=>import("src/pages/admin/AddPostSimple"));
const Dashboard = ReactLazyPreload(()=>import("src/pages/admin/Dashboard"));
const ProfilePageSimple = ReactLazyPreload(()=>import("src/pages/profilePage/ProfilePageSimple"));


export let myRoutes = []

let isAuth = null;

function MyRoutes(props){
  
  const { authState, isAuthLoaded } = props
  
    // isAuth = auth.isAuthenticated
  
  
  // if(isAuth){
  myRoutes = [
  
    { path: "/", index: true, element: <HomePageLite/>},
    { path: "/search", index: true, element: <PostsFilterPageLite/>},
    {
      path: "/author/profile/:username/:id",
      index: true,
      element: <ProfilePageSimple/>
    },
    {path: "/posts/:slug/:id", index: true, element: <PostDetailSimple/>},
    {path: "/about", index: true, element: <About/>},
    
    {path: "/auth/callback/:authServiceName", index: false, element: <AuthService/> },
    {
      path: "/admin/dashboard",
      element: <Dashboard/>,
      protected: true,
      redirectUrl: "/auth/join",
      authFetchInLoading: AddPostSkeleton
    },  // nested routes
    {
      path: "/auth/add-post/null",
      element: <AddPost/>,
      protected: true,
      redirectUrl: "/auth/join",
      authFetchInLoading: AddPostSkeleton
    },  // nested routes
    {
      path: "/auth/join",
      index: false,
      unProtected: true,
      redirectUrl: "/",
      element: <AllSignInLite/>
    }, // nested routes
    
    // { path: "/products", index: true ,  element: <ProductPage/> },
    // { path: "/products/:slug", index: true, element: <MoreProducts/> },
    // { path: "/q",  element: <ProductPage/> },
    // { path: "/product/:title/:productId",  element: <ProductDetails/> },
    // { path: "/auth/customer",  element: <CustomerDashboardHome/> },
    //
    // { path: "/faqs",  element: <Faq/> },
    // { path: "/about-me",  element: <AboutMe/> },
    // { path: "/contact-me",  element: <ContactMe/> },
    //
    // // { path: "/add-product", index: true,  element: <AddProduct/> },
    // // { path: "/update-product/:productId", index: true, element: <AddProduct/> },
    // // { path: "/auth/profile",  element: <ProfilePage/ },
    // { path: "/products/:authorId", index: true, element: <ProductPage/> },
    // // { path: "/admin/dashboard",  element: <AdminDashboard/> },
    // { path: "/auth/login", index: true, element: <LoginPage/> },
    // { path: "/auth/signup", index: true, element: <SignupPage/> },
    // {
    //   path: "/admin/dashboard",  element: <AdminDashboard/>,
    //   children: [
    //     {path: "products/product-list", index: true, element: <ProductList/>},
    //     {path: "products/category", index: true, element: <Category/>},
    //     {path: "products/add-product/:productId", index: true, element: <AddProduct/>},
    //     {path: "products/server/logs", index: true, element: <Logs/>}
    //   ]
    // },
    // { path: "/cart",  element: <CartPage/> },
    // { path: "/wishlist",  element: <Wishlist/> },
    // { path: "/order", element: <OrderHomePage/>,
    //   children: [
    //     { path: "checkout",  index: true, element: <CheckoutPage/> },
    //     { path: "payment",  index: true, element: <PaymentPage/> },
    //   ]
    // },
    // { path: "/admin/dashboard/products/physical/category",  component: Category },
    // { path:"*", element: <main style={{ padding: "1rem" }}>
    //       <p>There's nothing here!</p>
    //     </main>
    // }
    ]
  // } else {
  //   routes = [
  //     ...myRoutes,
  //     { path: "/auth/login", element: <LoginPage/> },
  //     // { path: "/auth/signup", component: signupPage }
  //   ]
  // }
  
  return (
    <Suspense fallback={<ProgressBar />}>
      
      {/*<Routes>*/}
      {/*  { routes.map(route=>(*/}
      {/*    <Route {...route} />*/}
      {/*  )) }*/}
      {/*</Routes>*/}
      
      {useRoutes(myRoutes)}
      
    </Suspense>
  )
}



export default MyRoutes


















