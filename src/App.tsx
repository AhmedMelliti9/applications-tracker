import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { type Application, type ApplicationStatus } from "./types";
import { DUMMY_APPLICATIONS } from "./data/dummyApplications";
import Header from "./components/Header";
import StatsSummary from "./components/StatsSummary";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import ConfirmDialog from "./components/ConfirmDialog";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationCard from "./components/ApplicationCard";
import SearchFilterBar from "./components/SearchFilterBar";

function App() {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "applications",
    DUMMY_APPLICATIONS
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [deletingApplication, setDeletingApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  function openAddModal() {
    setEditingApplication(null);
    setIsModalOpen(true);
  }

  function openEditModal(application: Application) {
    setEditingApplication(application);
    setIsModalOpen(true);
  }

  function handleFormSubmit(data: Omit<Application, "id" | "dateUpdated">) {
    const today = new Date().toISOString().split("T")[0];

    if (editingApplication) {
      setApplications(
        applications.map((app) =>
          app.id === editingApplication.id ? { ...app, ...data, dateUpdated: today } : app
        )
      );
    } else {
      const newApplication: Application = { ...data, id: crypto.randomUUID(), dateUpdated: today };
      setApplications([...applications, newApplication]);
    }

    setIsModalOpen(false);
    setEditingApplication(null);
  }

  function handleStatusChange(id: string, status: ApplicationStatus) {
    const today = new Date().toISOString().split("T")[0];
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, status, dateUpdated: today } : app))
    );
  }

  function handleConfirmDelete() {
    if (!deletingApplication) return;
    setApplications(applications.filter((app) => app.id !== deletingApplication.id));
    setDeletingApplication(null);
  }

  const filteredApplications = applications
    .filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || app.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dateApplied).getTime();
      const dateB = new Date(b.dateApplied).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Header />
      <StatsSummary applications={applications} />
      <main className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
          <h2 className="text-xl font-semibold">Your Applications</h2>
          <button
            onClick={openAddModal}
            className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition self-start sm:self-auto"
          >
            + Add Application
          </button>
        </div>

        {applications.length > 0 && (
          <SearchFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
          />
        )}

        {applications.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📋</p>
            <p className="text-gray-400 text-lg mb-1">No applications yet</p>
            <p className="text-gray-500 text-sm">Click "Add Application" to start tracking your job search.</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 text-lg mb-1">No matches found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredApplications.map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                onEdit={openEditModal}
                onDelete={setDeletingApplication}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingApplication ? "Edit Application" : "Add Application"}
      >
        <ApplicationForm
          key={editingApplication?.id ?? "new"}
          onSubmit={handleFormSubmit}
          initialData={editingApplication ?? undefined}
        />
      </Modal>

      <ConfirmDialog
        isOpen={deletingApplication !== null}
        title="Delete Application"
        message={`Are you sure you want to delete your application to ${deletingApplication?.companyName}? This can't be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingApplication(null)}
      />
    </div>
  );
}

export default App;
