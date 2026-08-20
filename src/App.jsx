import {BrowserRouter as Router,Routes,Route} from "react-router";
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

import OrderDashboard from "./pages/OrderDashboard";
import OrderPendingPage from "./pages/OrderPendingPage";
import OrderConfirmPage from "./pages/OrderConfirmPage";

import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartsPage from "./pages/CartsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";

import ShirtsPage from "./pages/ShirtsPage";
import JeansPage from "./pages/JeansPage";
import JacketsPage from "./pages/JacketsPage";
import DressesPage from "./pages/DressesPage";
import TopsPage from "./pages/TopsPage";
import SkirtsPage from "./pages/SkirtsPage";
import SneakersPage from "./pages/SneakersPage";
import HeelsPage from "./pages/HeelsPage";
import SlippersPage from "./pages/SlippersPage";
import NecklacesPage from "./pages/NecklacesPage";
import RingsPage from "./pages/RingsPage";
import HandchainsPage from "./pages/HandchainsPage";
import DrawingPage from "./pages/DrawingPage";
import PaintingPage from "./pages/PaintingPage";
import SmartphonesPage from "./pages/SmartphonesPage";
import ComputersPage from "./pages/ComputersPage";
import PowerbanksPage from "./pages/PowerbanksPage";
import ElectornicaccessoriesPage from "./pages/ElectornicaccessoriesPage";
import PlantsPage from "./pages/PlantsPage";
import GardeningToolsPage from "./pages/GardeningToolsPage";
import BabyClothesPage from "./pages/BabyClothesPage";
import ToysPage from "./pages/ToysPage";
import BabyCareitemsPage from "./pages/BabyCareItemsPage";
import AuthenticsPage from "./pages/AuthenticsPage";
import InspirePage from "./pages/InspirePage";
import SkincarePage from "./pages/SkincarePage";
import MakeupPage from "./pages/MakeupPage";
import StationeryPage from "./pages/StationeryPage";
import MusicPage from "./pages/MusicPage";
import SportPage from "./pages/SportPage";
import KitchenPage from "./pages/KitchenPage";
import BooksPage from "./pages/BooksPage";
import PetSuppliesPage from "./pages/PetSuppliesPage";
import DecorationPage from "./pages/DecorationPage";
import GamingPage from "./pages/GamingPage";
import BagsPage from "./pages/BagsPage"; 
import WatchesPage from "./pages/WatchesPage";
import AboutusPage from "./pages/AboutusPage";
import LaptopsPage from "./pages/LaptopsPage";
import OtherElectronicsPage from "./pages/OtherElectronicsPage";


function App() {

  return (
    <>
      <div className="app">
        <Routes>

          <Route path="/dashboard" element={<OrderDashboard />} />
          

          <Route path="/orderpending" element={<OrderPendingPage />} />
          <Route path="/orderconfirm" element={<OrderConfirmPage />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/allproducts/:id" element={<ProductDetailPage />} />
          <Route path="/carts" element={<CartsPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/aboutus" element={<AboutusPage />} />

          <Route path="/category/menfashion/shirts" element={<ShirtsPage />} />
          <Route path="/category/menfashion/jeans" element={<JeansPage />}/>
          <Route path="/category/menfashion/jackets" element={<JacketsPage />} />

          <Route path="category/girlfashion/dresses" element={<DressesPage />} />
          <Route path="category/girlfashion/tops" element={<TopsPage />} />
          <Route path="category/girlfashion/skirts" element={<SkirtsPage />} />

          <Route path="category/shoes/sneakers" element={<SneakersPage />} />
          <Route path="category/shoes/heels" element={<HeelsPage />} />
          <Route path="category/shoes/slippers" element={<SlippersPage />} />

          <Route path="category/jewellerys/necklaces" element={<NecklacesPage />} />
          <Route path="category/jewellerys/rings" element={<RingsPage />} />
          <Route path="category/jewellerys/handchains" element={<HandchainsPage />} />

          <Route path="category/drawing/drawingaccessories" element={<DrawingPage />} />
          <Route path="category/drawing/artsupplies" element={<PaintingPage />} />

          <Route path="category/electornics/smartphones" element={<SmartphonesPage />} />
          <Route path="category/electornics/computers" element={<LaptopsPage />} />
          <Route path="category/electornics/powerbanks" element={<PowerbanksPage />} />
          <Route path="category/electornics/electornicsupplies" element={<OtherElectronicsPage />} />

          <Route path="category/gardening/plantsandseeds" element={<PlantsPage />} />
          <Route path="category/gardening/gardeningtools" element={<GardeningToolsPage />} />

          <Route path="category/babyandkid/babyclothes" element={<BabyClothesPage />} />
          <Route path="category/babyandkid/toys" element={<ToysPage />} />
          <Route path="category/babyandkid/babycareitems" element={<BabyCareitemsPage />} />

          <Route path="category/perfumes/authentics" element={<AuthenticsPage />} />
          <Route path="category/perfumes/inspires" element={<InspirePage />} />

          <Route path="category/cosmetics/skincares" element={<SkincarePage />} />
          <Route path="category/cosmetics/makeups" element={<MakeupPage />} />

          <Route path="category/stationery" element={<StationeryPage />} />
          <Route path="category/music" element={<MusicPage />} />
          <Route path="category/sport" element={<SportPage />} />
          <Route path="category/kitchen" element={<KitchenPage />} />
          <Route path="category/books" element={<BooksPage />} />
          <Route path="category/petsupplies" element={<PetSuppliesPage />} />
          <Route path="category/decorations" element={<DecorationPage />} />
          <Route path="category/gamingaccessories" element={<GamingPage />} />
          <Route path="category/bags" element={<BagsPage />} />
          <Route path="category/watches" element={<WatchesPage />} />

          


        </Routes>
      </div>
    </>
  )
}

export default App
