import React from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ErrorBoundary } from "react-error-boundary";
import AppNavbar from "./AppNavbar";
import Home from "./home";
import PrivateRoute from "./privateRoute";
import PricingPlan from "./owner/plan";
import Register from "./auth/register";
import Login from "./auth/login";
import Logout from "./auth/logout";
import OwnerPetList from "./owner/pets/petList";
import OwnerPetEdit from "./owner/pets/petEdit";
import OwnerVisitEdit from "./owner/visits/visitEdit";
import PlanList from "./public/plan";
import tokenService from "./services/token.service";
import OwnerDashboard from "./owner/dashboard";
import OwnerConsultationList from "./owner/consultations/consultationList";
import OwnerConsultationEdit from "./owner/consultations/consultationEdit";
import OwnerConsultationTickets from "./owner/consultations/tickets/ticketList";
import VetConsultationList from "./vet/consultations/consultationList";
import VetConsultationTickets from "./vet/consultations/tickets/ticketList";
import PetEditAdmin from "./admin/pets/PetEditAdmin";
import PetListAdmin from "./admin/pets/PetListAdmin";
import UserListAdmin from "./admin/users/UserListAdmin";
import UserEditAdmin from "./admin/users/UserEditAdmin";
import OwnerListAdmin from "./admin/owners/OwnerListAdmin";
import OwnerEditAdmin from "./admin/owners/OwnerEditAdmin";
import SpecialtyListAdmin from "./admin/vets/SpecialtyListAdmin";
import SpecialtyEditAdmin from "./admin/vets/SpecialtyEditAdmin";
import VetListAdmin from "./admin/vets/VetListAdmin";
import VetEditAdmin from "./admin/vets/VetEditAdmin";
import VisitListAdmin from "./admin/visits/VisitListAdmin";
import VisitEditAdmin from "./admin/visits/VisitEditAdmin";
import ConsultationListAdmin from "./admin/consultations/ConsultationListAdmin";
import TicketListAdmin from "./admin/consultations/TicketListAdmin";
import ConsultationEditAdmin from "./admin/consultations/ConsultationEditAdmin";
import SwaggerDocs from "./public/swagger";
import ClinicsList from "./clinicOwner/clinicsList"
import EditClinic from "./clinicOwner/clinicEdit"
import OwnerListClinicOwner from "./clinicOwner/ownersList"
import ClinicOwnerListAdmin from "./admin/clinicOwners/ClinicOwnerListAdmin";
import ClinicOwnerEditAdmin from "./admin/clinicOwners/ClinicOwnerEditAdmin";
import ClinicListAdmin from "./admin/clinics/ClinicListAdmin";
import ClinicEditAdmin from "./admin/clinics/ClinicEditAdmin";
import ConsultationListClinicOwner from "./clinicOwner/consultations/ConsultationListClinicOwner";
import ConsultationEditClinicOwner from "./clinicOwner/consultations/ConsultationEditClinicOwner";
import VetListClinicOwner from "./clinicOwner/vets/VetListClinicOwner";
import VetEditClinicOwner from "./clinicOwner/vets/VetEditClinicOwner";
import MisDiseños from "./diseños"
import PedidosCliente from "./pedidosCliente"
import PedidosMontador from "./pedidosMontador"
import PedidosInteriorista from "./pedidosInteriorista"
import TodosLosPedidos from "./pedidosAdmin"
import AdministrarUsuarios from "./administrarUsuarios"
import Perfil from "./mi perfil"
import Chats from "./chats"

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const jwt = tokenService.getLocalAccessToken();
  let roles = []
  if (jwt) {
    roles = getRolesFromJWT(jwt);
  }

  function getRolesFromJWT(jwt) {
    return jwt_decode(jwt).authorities;
  }

  let adminRoutes = <></>;
  let clienteRoutes = <></>;
  let interioristaRoutes = <></>;
  let montadorRoutes = <></>;
  let userRoutes = <></>;

  let publicRoutes = <></>;

  roles.forEach((role) => {
    if (role === "ADMIN") {
      adminRoutes = (
        <>
          <Route path="/pedidosAdmin" exact={true} element={<PrivateRoute><TodosLosPedidos /></PrivateRoute>} />
          <Route path="/administrarUsuarios" exact={true} element={<PrivateRoute><AdministrarUsuarios /></PrivateRoute>} />          
        </>)
    }
    if (role === "CLIENTE") {
      clienteRoutes = (
        <>
          <Route path="/diseños" exact={true} element={<PrivateRoute><MisDiseños /></PrivateRoute>} />   
          <Route path="/pedidosCliente" exact={true} element={<PrivateRoute><PedidosCliente /></PrivateRoute>} />  
        </>)
    }
    if (role === "INTERIORISTA") {
      interioristaRoutes = (
        <>
          <Route path="/pedidosInteriorista" exact={true} element={<PrivateRoute><PedidosInteriorista /></PrivateRoute>} />  
          <Route path="/chats" exact={true} element={<PrivateRoute><Chats /></PrivateRoute>} />  
        </>)
    }
    if (role === "MONTADOR") {
      montadorRoutes = (
        <>
          <Route path="/pedidosMontador" exact={true} element={<PrivateRoute><PedidosMontador /></PrivateRoute>} />  
        </>)
    }
  })
  if (!jwt) {
    publicRoutes = (
      <>        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  } else {
    userRoutes = (
      <>
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}        
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Perfil />}/>
        <Route path="/home" element={<Home />}/>
      </>
    )
  }

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
        <AppNavbar />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/plans" element={<PlanList />} />
          <Route path="/docs" element={<SwaggerDocs />} />
          {publicRoutes}
          {userRoutes}
          {adminRoutes}
          {clienteRoutes}
          {interioristaRoutes}
          {montadorRoutes}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
