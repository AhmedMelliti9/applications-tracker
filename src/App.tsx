import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { type Application } from "./types";
import { DUMMY_APPLICATIONS } from "./data/dummyApplications";
import Header from "./components/Header";
import StatsSummary from "./components/StatsSummary";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationCard from "./components/ApplicationCard";

function App() {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "applications",
    DUMMY_APPLICATIONS
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddApplication(data: Omit<Application, "id" | "dateUpdated">) {
    const newApplication: Application = {
      ...data,
      id: crypto.randomUUID(),
      dateUpdated: new Date().toISOString().split("T")[0],
    };
    setApplications([...applications, newApplication]);
    setIsModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <StatsSummary />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Applications</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition"
          >
            + Add Application
          </button>
        </div>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No applications yet — click "Add Application" to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} />
            ))}
          </div>
        )}
      </main>
      <Footer />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Application">
        <ApplicationForm onSubmit={handleAddApplication} />
      </Modal>
    </div>
  );
}

export default App;