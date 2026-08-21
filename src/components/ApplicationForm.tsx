import { useState, type ChangeEvent, type FormEvent } from "react";
import { type Application, ApplicationStatus } from "../types";
import { STATUS_CONFIG } from "../config/statusConfig";

interface ApplicationFormProps {
  onSubmit: (data: Omit<Application, "id" | "dateUpdated">) => void;
}

const initialFormState = {
  companyName: "",
  position: "",
  applicationUrl: "",
  country: "",
  location: "",
  status: ApplicationStatus.Saved,
  dateApplied: new Date().toISOString().split("T")[0],
  salary: "",
  contactPerson: "",
  notes: "",
};

function ApplicationForm({ onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState(initialFormState);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input name="companyName" value={formData.companyName} onChange={handleChange}
        placeholder="Company name" required
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <input name="position" value={formData.position} onChange={handleChange}
        placeholder="Position / role" required
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <input name="applicationUrl" value={formData.applicationUrl} onChange={handleChange}
        placeholder="Job posting URL (optional)"
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <div className="flex gap-3">
        <input name="country" value={formData.country} onChange={handleChange}
          placeholder="Country"
          className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 flex-1" />
        <input name="location" value={formData.location} onChange={handleChange}
          placeholder="City / Remote"
          className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 flex-1" />
      </div>

      <select name="status" value={formData.status} onChange={handleChange}
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
        {Object.values(ApplicationStatus).map((status) => (
          <option key={status} value={status}>
            {STATUS_CONFIG[status].label}
          </option>
        ))}
      </select>

      <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange}
        required
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <input name="salary" value={formData.salary} onChange={handleChange}
        placeholder="Salary (optional)"
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <input name="contactPerson" value={formData.contactPerson} onChange={handleChange}
        placeholder="Contact person (optional)"
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <textarea name="notes" value={formData.notes} onChange={handleChange}
        placeholder="Notes (optional)" rows={3}
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500" />

      <button type="submit"
        className="bg-gradient-to-r from-blue-500 to-violet-500 rounded-lg px-4 py-2 font-semibold mt-2 hover:opacity-90 transition">
        Add Application
      </button>
    </form>
  );
}

export default ApplicationForm;