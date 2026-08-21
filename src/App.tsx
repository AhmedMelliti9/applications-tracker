import Header from "./components/Header";
import StatsSummary from "./components/StatsSummary";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <StatsSummary />
      <main className="flex-1 p-6">
        {/* Application cards will go here starting Day 4 */}
      </main>
      <Footer />
    </div>
  );
}

export default App;