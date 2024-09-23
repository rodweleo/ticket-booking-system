import "./App.css"
import AdminAccount from "./pages/accounts/admin"
import Root from "./pages/root"
export const App = () => {

  const activeUser:string = "user"

  if(activeUser === "admin"){
    return <AdminAccount/>
  }

  return <main>
    <Root/>  
  </main >
}