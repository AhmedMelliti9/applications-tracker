import useLocalStorage from "./hooks/useLocalStorage";
import { type Application, ApplicationStatus } from "./types";
import { DUMMY_APPLICATIONS } from "./data/dummyApplications";
import Header from "./components/Header";
import StatsSummary from "./components/StatsSummary";
import Footer from "./components/Footer";

function App() {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "applications",
    DUMMY_APPLICATIONS
  );

  function handleAddTestApplication() {
    const newApp: Application = {
      id: crypto.randomUUID(),
      companyName: "Test Company",
      position: "Test Position",
      applicationUrl: "",
      country: "",
      location: "",
      status: ApplicationStatus.Saved,
      dateApplied: new Date().toISOString().split("T")[0],
      dateUpdated: new Date().toISOString().split("T")[0],
      salary: "",
      contactPerson: "",
      notes: "",
    };
    setApplications([...applications, newApp]);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <StatsSummary />
      <main className="flex-1 p-6">
        <p className="text-gray-400 mb-4">
          {applications.length} applications loaded from localStorage
        </p>
        <button
          onClick={handleAddTestApplication}
          className="bg-blue-600 hover:bg-blue-500 transition rounded-lg px-4 py-2"
        >
          + Add Test Application
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default App;